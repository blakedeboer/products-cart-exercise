var isLoaded = false;

window.onload = function () {
	isLoaded = true;
  //notifyOnloadEvent();
};

var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function (value) {
	if (httpRequest.readyState !== XMLHttpRequest.DONE) {
      return;
  }
  if (httpRequest.status !== 200) {
      return;
  }

  console.log(httpRequest.responseText);

  //TODO check for parsing errors
  var response = JSON.parse(httpRequest.responseText);

  if (isLoaded) {
      locals = {
        products: response
      };

      var html = window.jadeTemplate(locals);
      var productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = html;
      console.log("HTML added");

      var buyButtons = document.getElementsByClassName("buy-button");
      for (var i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener("click", function (e) {
          e.preventDefault();
          console.log("click");
        });
      }
  
  } else {
  	//subsribeToWindowLoad();
  }
}

httpRequest.open('GET', 'http://localhost:3000/products', true);

httpRequest.send();

