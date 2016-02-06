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
  	for (var i = 0; i < response.length; i++) {
  		var div = document.createElement("div");
  		div.textContent = response[i].name;
  		document.body.insertBefore(div, text);
  	}
  } else {
  	//subsribeToWindowLoad();
  }
}

httpRequest.open('GET', 'http://localhost:3000/products', true);

httpRequest.send();

