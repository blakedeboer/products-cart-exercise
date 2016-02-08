'use strict';

(function () {
  /******* HTTP SERVICES ********/

  function sendMessage (requestType, url, statusCode, sendObj, callback) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (httpRequest.status !== statusCode) {
          return;
      }
      callback(httpRequest);
    };

    httpRequest.open(requestType, url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');

    httpRequest.send(sendObj);
  }

  function getRequest (path, responseCallback) {
    sendMessage('GET', 'http://localhost:3000/' + path, 200, null, responseCallback);
  }

  function postRequest (path, sendObj, responseCallback) {
    sendMessage('POST', 'http://localhost:3000/' + path, 201, sendObj, responseCallback);
  }

  function deleteRequest (path, responseCallback) {
    sendMessage('DELETE', 'http://localhost:3000/' + path, 200, null, responseCallback);
  }


  /**** PRODUCT AND MINICART ACTIONS *******/

  function getProducts () {
    getRequest('products', onGetProducts);
  }

  function getMinicart () {
    getRequest('cart_order', onGetMinicart);
  }

  function postMiniCart (productObj) {
    //stringify product object before sending to server
    var sendObj = JSON.stringify({
      product: productObj
    });
    postRequest('cart_order', sendObj, onMinicartUpdate);
  }

  function deleteMinicartProduct (deleteId) {
    deleteRequest('cart_order/' + deleteId, onMinicartUpdate);
  }


  /******* HTTP RESPONSE HANDLERS ******/

  function onMinicartUpdate (response) {
    //if minicart is updated, immediately ask for the new minicart from server
    //upon response to the GET request, the minicart template will be reloaded
    getMinicart();
  }

  //upon response from server, prep the products array and then load template
  function onGetProducts (response) {
    //TODO check for parsing errors
    var responseArray = JSON.parse(response.responseText);

    //update products array with additional price properties appended
    var products = appendAdditionalPriceProperties(responseArray);

    loadProductsTemplate(products);
  }

  //upon response from server, prep the minicar object and then load the template
  function onGetMinicart (response) {
    var responseText = JSON.parse(response.responseText),
        cartTotal = 0;

    //calculate new minicart total
    for (var i = 0; i < responseText.length; i++) {
      cartTotal += +responseText[i].product.intPrice;
    } 

    cartTotal = formatTotalPrice(cartTotal); // ex: "1000" -> "$1,000", for display purpose

    loadMinicartTemplate({
      cartTotal: cartTotal,
      productCount: responseText.length,
      cartProducts: responseText
    });
  }


  /**** TEMPLATE LOADING ********/

  function loadProductsTemplate (products) {
    //load Jade template
    var productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = window.productsTemplate({productsArray: products});

    //when a user buys a product, a post request is sent to the minicart with that product
    function onBuy (event) {
      event.preventDefault();
      var productObj = getProductObj(this.id, products);
      postMiniCart(productObj);
    }

    //set handler for buy button
    var buyButtons = document.getElementsByClassName("buy-button");
    for (var i = 0; i < buyButtons.length; i++) {
      buyButtons[i].addEventListener("click", onBuy);
    }
  }

  function loadMinicartTemplate (minicartObj) {
    //load Jade template
    var minicartContainer = document.getElementById("minicart-container");
    minicartContainer.innerHTML = window.minicartTemplate(minicartObj);

    //when a user clicks cancel, a DELETE request is sent to the server for that product
    function onCancel (event) {
      event.preventDefault();
      deleteMinicartProduct(this.id);
    }
    //set handlers for cancel button
    var cancelButtons = document.getElementsByClassName("cancel-button");
    for (var i = 0; i < cancelButtons.length; i++) {
      cancelButtons[i].addEventListener("click", onCancel);
    }
  }


  /****** HELPER FUNCTIONS ***********/

  function getProductObj (id, productsArray) {
    if (typeof id === "string") id = parseInt(id);
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id) return productsArray[i];
    }
  }

  function numberWithCommas (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatTotalPrice (price) {
    return "$" + numberWithCommas(price);
  }

  function appendAdditionalPriceProperties (productsArray) {
    for (var i = 0; i < productsArray.length; i++) {
      var price = productsArray[i].price;

      //append intPrice property which will be used for calculating the total cost of minicart
      if (!productsArray[i].intPrice) {
          if (price.indexOf("$") === 0) {
            productsArray[i].intPrice = +price.substring(1);  //"$100" -> 100, create new intPrice property as integer and no "$" prefix
          }    
      }
      
      //append viewPrice property which includes commas in the string
      if (!productsArray[i].viewPrice) {
        productsArray[i].viewPrice = numberWithCommas(price); //"$1000" -> "$1,000"
      }

    }
    return productsArray;
  }



  /***** APPLICATION START *********/

  function getProductsAndMinicart () {
    //triggers GET request for products, on response, the products template will load
    //while loading the template, the buy buttons will have click handlers added to process a user buying a product
    //if a user buys a product, a post request will be sent to the minicart with the product, and the minicart will be udpated via GET request
    getProducts(); 

    //triggers GET request for the minicart, on response, the minicart template will load
    //while loading the template, any cancel buttons will have click handlers added to process deleting a product from the minicart
    //upon successful deletion of the product the minicart will be update via at GET request
    getMinicart(); 
  }

  //we wait until the window load event to ensure the divs that contain the templates will exist
  //[note] we could also immediately make the GET requests for products and minicart and set up a subscription to the load
    //event however for this scale of an app, the server responds almost instantly so it is not worth the extra code
  window.onload = function () {
    getProductsAndMinicart();
  };
})();







