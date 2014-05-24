function googleSearch() {
	$.ajax({
	  url: "test.html",
	  cache: false
	}).done(function( html ) {
	  $("#googleResults").append(html);
	});
	console.log('it works');
}

	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	request.open('GET', 'data.json');
	request.onreadystatechange = function() {
		if ((request.readyState===4) && (request.status===200)) {
			//console.log(request.responseXML.getElementsByTagName('name')[1]);
			var items = JSON.parse(request.response);
			console.log(items);
			// var output = "<ul>";
				// for (var i = 0; i < items.length; i++) {
					// output += "<li>" + items[i].firstChild.nodeValue + "</li>";
				// }
			// output += "</ul>";
			// document.getElementById('googleResults').innerHTML = output;
		}
	}
	request.send();
	
