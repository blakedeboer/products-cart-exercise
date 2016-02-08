var isLoaded = false;
    products = [];

window.onload = function () {
	isLoaded = true;
  //notifyOnloadEvent();
  loadPageContent();
};

function sendMessage (requestType, url, statusCode, sendObj, callback) {
  //insert repeated code from all the functions below to make code DRY, 
  //upon success message, call the callback and pass it the response or responseText
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

function getProducts () {
  sendMessage('GET', 'http://localhost:3000/products', 200, null, function (response) {
    //TODO check for parsing errors

    if (isLoaded) {
      var responseArray = JSON.parse(response.responseText);

      products = appendPriceInteger(responseArray);

      var html = window.productsTemplate({productsArray: products});
      var productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = html;

      var buyButtons = document.getElementsByClassName("buy-button");
      for (var i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener("click", function (e) {
          e.preventDefault();
          var productObj = getProductObj(this.id);
          postToMiniCart(productObj);
        });
      }

    } else {
      //subscribeToWindowLoad();
    }
  });
}

function postToMiniCart (productObj) {
  var sendObj = JSON.stringify({product: productObj});

  sendMessage('POST', 'http://localhost:3000/cart_order', 201, sendObj, function (response) {
    console.log(response.responseText);
    getMinicart();
  });
}

function getMinicart () {
  sendMessage('GET', 'http://localhost:3000/cart_order', 200, null, function (response) {
    var responseText = JSON.parse(response.responseText);

    var cartTotal = 0;
    for (var i = 0; i < responseText.length; i++) {
      cartTotal += +responseText[i].product.priceInt;
    }

    var minicartHTML = window.minicartTemplate({
      cartTotal: cartTotal,
      productCount: responseText.length,
      cartProducts: responseText
    });
    var minicartContainer = document.getElementById("minicart-container");
    minicartContainer.innerHTML = minicartHTML;

    var cancelButtons = document.getElementsByClassName("cancel-button");
    for (var i = 0; i < cancelButtons.length; i++) {
      cancelButtons[i].addEventListener("click", function (e) {
        e.preventDefault();
        deleteProductFromMinicart(this.id);
      });
    }
  });
}

function deleteProductFromMinicart (deleteId) {
  //need to make a function that does these same basic steps for creating a request
  var url = 'http://localhost:3000/cart_order/' + deleteId.toString();
  sendMessage('DELETE', url, 200, null, function (response) {
    console.log(response.statusText);
    getMinicart();
  });
}

function getProductObj (id) {
  if (typeof id === "string") id = parseInt(id);
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i];
  }
}

function appendPriceInteger (productsArray) {
  for (var i = 0; i < productsArray.length; i++) {
    var price = productsArray[i].price;
    if (price.indexOf("$") === 0) {
      productsArray[i].priceInt = +price.substring(1);  //"$100" -> 100, create new priceInt property as integer and no "$" prefix
    }     
  }
  return productsArray;
}

function loadPageContent () {
  getProducts();
  getMinicart();
}







