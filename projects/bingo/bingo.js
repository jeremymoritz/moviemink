function getRandomBingo(min) {
	return Math.floor(Math.random() * 15) + min;
}

function makeBingo() {
	var shortLetters = 'BINGO'.split(""),
		bingoCardTable = document.getElementById("bingoTable"),
		tempTr = document.createElement("tr"),
		usedValues = [],
		minkLogo = document.createElement("img"),
		newButton = document.createElement("button");
		
	bingoTable.innerHTML = "";
	minkLogo.setAttribute('src', 'tiny_no_words.png');
	minkLogo.setAttribute('alt', '.');
	minkLogo.setAttribute("class", "bingoTop");
	newButton.setAttribute('onclick', 'changeBingo();');
	newButton.innerHTML = "Make New Card";
	
	for (var i = 0; i < shortLetters.length; i++) {
		var tempTd = document.createElement("td"),
			tempText = document.createTextNode(shortLetters[i]);
			
		tempTd.appendChild(tempText);
		tempTr.appendChild(tempTd);		
	}
	tempTr.setAttribute("class", "bingoTop");
	bingoCardTable.appendChild(tempTr);
	for (var i = 0; i < shortLetters.length; i++) {
		var tempTr = document.createElement("tr");
		for (var j = 0; j < shortLetters.length; j++){
			var tempTd = document.createElement("td"),
				newNumber = getRandomBingo(j * 15 + 1);
			while(usedValues.indexOf(newNumber) != -1) {
				newNumber = getRandomBingo(j * 15 + 1);
			}
			var tempText = document.createTextNode(newNumber);
			tempTd.appendChild(tempText);
			usedValues.push(newNumber);
			tempTr.appendChild(tempTd);
		}
		bingoCardTable.appendChild(tempTr);		
	}
	bingoCardTable.childNodes[3].replaceChild(minkLogo, bingoCardTable.childNodes[3].childNodes[2]);
	bingoCardTable.parentNode.replaceChild(newButton, bingoCardTable.parentNode.getElementsByTagName('button')[0]);
}

function changeBingo() {
	var bingoCardTable = document.getElementById("bingoTable"),
		usedValues = [];
	for (var i = 1; i < 6; i++) {
		for (var j = 0; j < 5; j++) {
			do {
				var newNumber = getRandomBingo(j * 15 + 1);
			} while (usedValues.indexOf(newNumber) != -1);
			usedValues.push(newNumber);
			bingoCardTable.childNodes[i].childNodes[j].innerHTML = newNumber;
		}
	}
}

/* ***** Original Code, rememeber how far you've come! *******

function getRandomB () {
	return Math.floor(Math.random() * (15)) + 1;
}
function getRandomI () {
	return Math.floor(Math.random() * (15)) + 16;
}
function getRandomN () {
	return Math.floor(Math.random() * (15)) + 31;
}
function getRandomG () {
	return Math.floor(Math.random() * (15)) + 46;
}
function getRandomO () {
	return Math.floor(Math.random() * (15)) + 61;
}
function bingoCard() {
	var b1 = getRandomB (),
		b2 = getRandomB (),
		b3 = getRandomB (),
		b4 = getRandomB (),
		b5 = getRandomB (),
		i1 = getRandomI (),
		i2 = getRandomI (),
		i3 = getRandomI (),
		i4 = getRandomI (),
		i5 = getRandomI (),
		n1 = getRandomN (),
		n2 = getRandomN (),
		n3 = getRandomN (),
		n4 = getRandomN (),
		n5 = getRandomN (),
		g1 = getRandomG (),
		g2 = getRandomG (),
		g3 = getRandomG (),
		g4 = getRandomG (),
		g5 = getRandomG (),
		o1 = getRandomO (),
		o2 = getRandomO (),
		o3 = getRandomO (),
		o4 = getRandomO (),
		o5 = getRandomO ();
		
	if(b1 != b2 && b2 != b3 && b3 != b4 && b4 != b5 && b1 != b3 && b1 != b4 && b1 != b5 && b2 != b4 && b2 != b5 && b3 != b5 && i1 != i2 && i2 != i3 && i3 != i4 && i4 != i5 && i1 != i3 && i1 != i4 && i1 != i5 && i2 != i4 && i2 != i5 && i3 != i5 && g1 != g2 && g2 != g3 && g3 != g4 && g4 != g5 && g1 != g3 && g1 != g4 && g1 != g5 && g2 != g4 && g2 != g5 && g3 != g5 && n1 != n2 && n2 != n3 && n3 != n4 && n4 != n5 && n1 != n3 && n1 != n4 && n1 != n5 && n2 != n4 && n2 != n5 && n3 != n5 && o1 != o2 && o2 != o3 && o3 != o4 && o4 != o5 && o1 != o3 && o1 != o4 && o1 != o5 && o2 != o4 && o2 != o5 && o3 != o5) {
	
		document.getElementById("b1").innerHTML = b1;
		document.getElementById("b2").innerHTML = b2;
		document.getElementById("b3").innerHTML = b3;
		document.getElementById("b4").innerHTML = b4;
		document.getElementById("b5").innerHTML = b5;
		document.getElementById("i1").innerHTML = i1;
		document.getElementById("i2").innerHTML = i2;
		document.getElementById("i3").innerHTML = i3;
		document.getElementById("i4").innerHTML = i4;
		document.getElementById("i5").innerHTML = i5;
		document.getElementById("n1").innerHTML = n1;
		document.getElementById("n2").innerHTML = n2;
		document.getElementById("n3").innerHTML = "<img src='_img/tiny_no_words.png' alt='.'>";
		document.getElementById("n4").innerHTML = n4;
		document.getElementById("n5").innerHTML = n5;
		document.getElementById("g1").innerHTML = g1;
		document.getElementById("g2").innerHTML = g2;
		document.getElementById("g3").innerHTML = g3;
		document.getElementById("g4").innerHTML = g4;
		document.getElementById("g5").innerHTML = g5;
		document.getElementById("o1").innerHTML = o1;
		document.getElementById("o2").innerHTML = o2;
		document.getElementById("o3").innerHTML = o3;
		document.getElementById("o4").innerHTML = o4;
		document.getElementById("o5").innerHTML = o5;
	} else {
		bingoCard();
	}
}
*/