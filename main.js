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
      products = JSON.parse(response.responseText);

      var html = window.productsTemplate({productsArray: products});
      var productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = html;

      var buyButtons = document.getElementsByClassName("buy-button");
      for (var i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener("click", function (e) {
          e.preventDefault();
          postToMiniCart();
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

    var minicartHTML = window.minicartTemplate({cartProducts: responseText});
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

function loadPageContent () {
  getProducts();
  getMinicart();
}







