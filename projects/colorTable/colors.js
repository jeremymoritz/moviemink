var thisRow = 1,
	thisCustomRow = 0,
	colorArray = ['Red', 'Yellow', 'Green', 'Blue', 'Brown'];

function addRow() {
	var newButton = document.createElement("button"),
		newTd1 = document.createElement("td"),
		newTd2 = document.createElement("td"),
		newTr = document.createElement("tr");
	
	newTd1.innerHTML = "Row " + thisRow;
	newButton.innerHTML = "Remove!";
	newButton.setAttribute('onclick', 'removeRow(' + thisRow + '); return false');
	newTr.setAttribute('id', 'row' + thisRow);
	newTd2.appendChild(newButton);
	newTr.appendChild(newTd1);
	newTr.appendChild(newTd2);
	document.getElementById('colorBody').appendChild(newTr);
	thisRow++;
}

function removeRow(num) {
	var trash = document.getElementById('row' + num);
	document.getElementById('colorBody').removeChild(trash);
}

function addCustomRow() {
	var newButton = document.createElement("button"),
		newTd1 = document.createElement("td"),
		newTd2 = document.createElement("td"),
		newTr = document.createElement("tr");
	
	newTd1.innerHTML = colorArray[thisCustomRow % 5] + " " + (thisCustomRow + 1);
	newButton.innerHTML = "Remove!";
	newButton.setAttribute('onclick', 'removeCustomRow(' + thisCustomRow + '); return false');
	newTr.setAttribute('id', 'customRow' + thisCustomRow);
	newTr.setAttribute('class', 'custom' + thisCustomRow % 5);
	newTd2.appendChild(newButton);
	newTr.appendChild(newTd1);
	newTr.appendChild(newTd2);
	document.getElementById('customBody').appendChild(newTr);
	thisCustomRow++;
}

function removeCustomRow(num) {
	var trash = document.getElementById('customRow' + num);
	document.getElementById('customBody').removeChild(trash);
}