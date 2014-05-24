var nLetters,
	word,
	tempMessage,
	wordList = [],
	trashCan = 0,
	strikes = 0,
	tries = 0,
	timer = 1500,
	correctGuess = 0,
	computerNotUsed = [],
	computerGuessWord = {},
	computerScore = 0,
	computerCorrect = [],
	docName = [],
	notUsed = [],
	Used = [],
	fullList = [],
	guessWordArray = [],
	createOn = false,
	stillGuessing = true,
	createWordArray = [],
	constantArray = [],
	percen = {},
	lettersTable = document.getElementById('lettersTable'),
	strikeList = document.getElementById('strikeList'),
	spacesAI = document.getElementById('spacesAI'),
	alphabet = "abcdefghijklmnopqrstuvwxyz",
	valueAlphabet ="srtnealioudgpcmbhfywvkjxzq", 
	alphaArray = valueAlphabet.split(""),
	pureAlphaArray = alphabet.split(''),
	vowels = "aeiou",
	vowelArray = vowels.split(""),
	ignoreKeys = [16, 37, 38, 39, 40], // shift, or arrows
	specialKeys = [8, 46]; // backspace & delete
	
function enableInput(n) {
	for (var i = 1; i <= n; i++) {
		document.getElementsByName("letter" + i)[0].removeAttribute('disabled');
	}
	for (var i = 8; i > n; i--) {
		document.getElementsByName("letter" + i)[0].setAttribute('disabled', 'disabled');
	}
	nLetters = n;
}

function testThis(word, bool) {
	var wordArray = word.split(""),
		n;
	for (var j = 0; j < wordArray.length; j++) {
		if (bool == 1) {
			n = eval("document.forms.solveForm.letter" + (j + 1) + ".value");
		} else {
			computerGuessWord[j] ? n = computerGuessWord[j] : n = null;
		}
		alphaArray.indexOf(n) == -1 ? n = null : n = n;
		if (n) {
			if (wordArray[j] != n) {
				return false;
			}
		} else {
			if (Used.indexOf(wordArray[j]) == -1) {
				return false;
			}
		}
	}
	return true;
}

function assembleLetters(bool) {
	notUsed = [];
	Used = [];
	if (bool == 1) {
		var n = document.forms.solveForm.notUsed.value ? document.forms.solveForm.notUsed.value : ".",
			newArray = n.split(""),
			y;
			
		for (var j = 1; j <= nLetters; j++) {
			y = eval("document.forms.solveForm.letter" + j + ".value");
			newArray.push(y);
		}
	} else {
		newArray = computerNotUsed;
	}
	for (var i = 0; i < 26; i++) {
		newArray.indexOf(alphaArray[i]) != -1 ? notUsed.push(alphaArray[i]) : Used.push(alphaArray[i]);
	}
}

function testResults() {
	if (!nLetters) {
		alert("You must provide a number of letters");
		return false;
	}
	wordList = [];
	assembleLetters(1);	
	docName = eval("full" + nLetters);
	var n = docName.length;
	for (var i = 0; i < n; i++) {
	  	var check = docName[i];
	  	testThis(check, 1) ? wordList.push(check) : trashCan++;
	}
	document.getElementById("solveTable").innerHTML = "";	
	makeWordList(wordList, "solveTable");
	checkProbability();
}

function createWord () {
	var n = document.forms.createForm.notUsed.value;
	createWordArray = n.split("");
	constantArray = "";
	constantArray += createWordArray;
	notUsed = [];
	Used = [];
	document.getElementById("createTable").innerHTML = "";
	if (createWordArray.length < 4) {
		alert("You must provide at least 4 letters");
		return false;
	}
	for (var l = 8; l >= 4; l--) {
		docName = eval("full" + l);
		wordList = [];
		for (var i = 0; i < docName.length; i++) {
		  	createWordArray = constantArray.split(",");
		  	testCreate(docName[i]) ? wordList.push(docName[i]) : trashCan++;
		}		
		makeWordList(wordList, "createTable");
    }
}

function testCreate(word) {
	var wordArray = word.split("");
	for (var j = 0; j < wordArray.length; j++) {
		if (createWordArray.indexOf(wordArray[j]) == -1) {
			return false;
		} else {
			createWordArray[createWordArray.indexOf(wordArray[j])] = ".";
		}
	}
	return true;
}

function makeWordList(wordArray, varient) {
	var wordTable = document.getElementById(varient);
	
	for (var i = 0; i < wordArray.length; i++) {
		var tempTr = document.createElement("tr"),
			tempTd = document.createElement("td"),
			tempText = document.createTextNode(wordArray[i]);
			
		tempTd.appendChild(tempText);
		tempTr.appendChild(tempTd);		
		wordTable.appendChild(tempTr);
	}
}

function ruleOutPossibilities(bool, varient) {
	// 'wordList' is all the current results
	var n = wordList.length
		tempWordList = [];
	assembleLetters(bool);
	for (var i = 0; i < n; i++) {
	  	testThis(wordList[i], bool) ? tempWordList.push(wordList[i]) : trashCan++;
	}		
	document.getElementById(varient).innerHTML = "";
	wordList = tempWordList;
	makeWordList(wordList, varient);
}

function checkProbability() {
	var tempArray = [],
		noDubbs = [];
	percen = {};
	for (var i = 0; i < wordList.length; i++) {
		tempArray = wordList[i].split("");
		noDubbs = [];
		for (var j = 0; j < tempArray.length; j++) {
			if (Used.indexOf(tempArray[j]) != -1) { 
				noDubbs.indexOf(tempArray[j]) == -1 ? trashCan++ : percen[tempArray[j]]--;
				percen[tempArray[j]] ? percen[tempArray[j]]++ : percen[tempArray[j]] = 1;
				noDubbs.push(tempArray[j]);
			}
		}
	}
	var letterList = [];
	for (var key in percen) {
    	letterList.push([key, percen[key]]);
		letterList.sort(function(a, b) {return b[1] - a[1]});
	}
	if(letterList[0][0]) {
		var percent = Math.round(letterList[0][1] / wordList.length * 100),
			quotation = "I think you should choose the letter \"";
		   quotation += letterList[0][0];
		   quotation += "\" because it has a ";
		   quotation += percent;
		   quotation += "% chance of being in the next word!";
		   document.getElementById('percentage').innerHTML = quotation;
		   document.getElementById('nextGuessAI').innerHTML = quotation;
		return letterList[0][0];
	}
}

function guessLetter (letter, guessWordArray) {
	var capLetter = letter.toUpperCase();
	console.log("Computer guesses \"" + letter + "\"");
	var tempRequest = "td:contains('" + capLetter + "')";
	if (guessWordArray.indexOf(letter) == -1) {
		strikes--;
		tries++;
		var tempLi = "li:nth-child(" + tries + ")";
		console.log("Misses with \"" + letter + "\" and is down to only " + strikes + " strikes left");
		$(tempRequest).addClass('red');
		//lettersTable.getElementsByTagName('td').contains(letter)[0].addClass('red');
		$(tempLi).addClass('strike');
		//strikeList.getElementsByTagName('smallstrike')[tries].addClass('strike');
	} else {
		console.log("That is correct!");
		$(tempRequest).addClass('green');
		//lettersTable.getElementsByTagName('td').contains(letter)[0].addClass('green');
		for (var i = 0; i < guessWordArray.length; i++) {
			if (guessWordArray[i] == letter) {
				computerGuessWord[i] = letter;
				correctGuess++
				spacesAI.getElementsByTagName('smallspace')[i].innerHTML = capLetter;
			}
		}
	}
	computerNotUsed.push(letter);
	assembleLetters(2);
	var tempWordList = [];
	for (var i = 0; i < wordList.length; i++) {
	  	testThis(wordList[i], 2) ? tempWordList.push(wordList[i]) : trashCan++;
	}	
	wordList = tempWordList;
}	

function computerAI (word, guessWordArray) {
	var firstGuess = "";
	correctGuess = 0;
	nLetters = guessWordArray.length;
	strikes = (12 - nLetters);
	tries = 0;
	wordList = [];
	computerNotUsed = [];
	computerGuessWord = {};
	computerScore = 0;
	if (nLetters > 8) {
		tempMessage = "What do you think you're doing to me giving me " + '"' + word + '"' + "? You can't give a word that is more than 8 letters long!";
		alert (tempMessage);
		return "Give me another word";
	} else if (nLetters < 4) {
		tempMessage = 'What is this tiny "' + word + '" word about? You have to give a word of at least 4 letters.';
		alert (tempMessage);
		return "Try another word";
	}
	docName = eval("full" + nLetters);
	var n = docName.length;
	for (var i = 0; i < n; i++) {
	  	wordList.push(docName[i]);
	}	
	
	for (var i = guessWordArray.length; i > -1; i--) {
		if (vowelArray.indexOf(guessWordArray[i]) != -1) {
			!firstGuess ? firstGuess = guessWordArray[i] : trashCan++;
		}
	}
    if (!firstGuess) {
        firstGuess = "y";
        computerNotUsed.push("a", "e", "i", "o", "u");
    }
	guessLetter(firstGuess, guessWordArray);
	document.getElementById("testTable").innerHTML = "";
	makeWordList(wordList, "testTable");	
	setTimeout(myRecursiveFunction, timer);
}

function myRecursiveFunction () {
	if (strikes > 0 && correctGuess != guessWordArray.length) {
		if (wordList.length < 1) {
			tempMessage = 'What are you trying to pull?! "' + word + '"' + " isn't even a word!";			
			alert (tempMessage);
			return "Just give another word";
			}
		guessLetter(checkProbability(), guessWordArray)
	}
	if (strikes == 0) {
		var tempWord = guessWordArray.join("");
		if (wordList.indexOf(tempWord) == -1) {
			tempMessage = 'What are you trying to pull?! "' + word + '"' + " isn't even a word!";			
			alert (tempMessage);
			return "Just give another word";
		}
		tempMessage = 'After missing "' + word + '" computer feels quite defeated.';
		alert (tempMessage);
		return;
	} else if (correctGuess == guessWordArray.length) {
		tempMessage = 'Computer guessed "' + word + '" with ' + strikes + ' strikes left over!';
		alert (tempMessage);
		return;
	}
	document.getElementById("testTable").innerHTML = "";
	makeWordList(wordList, "testTable");	
	setTimeout(myRecursiveFunction, timer);
}

$("#rulingOut").keyup(function(e) {
	if($.inArray(e.keyCode, ignoreKeys) === -1) {
		//	do javascript stuff here for mainLetters
		testResults();
	}
});

var ignoreKeysAI = [8, 9, 46, 16, 37, 38, 39, 40];	//	as long as the key being pressed is not backspace (8), tab (9), delete (46), shift (16), or any arrow keys (37-40)...

$("#testForm").on("keyup", "input[type='text']", function(e) {
		var key = e.keyCode;
		if($.inArray(key, ignoreKeysAI) === -1) {
		this.value = this.value.toUpperCase().replace(/[^A-Za-z]/g, '');
	}
});

$(".ruledOut").keyup(function(e) {
	if($.inArray(e.keyCode, ignoreKeys) === -1) {
		//	do javascript stuff here for ruledOut
		if(createOn) {
			var n = document.forms.createForm.notUsed.value ? document.forms.createForm.notUsed.value : ".";
			createWordArray = n.split("");
			if (createWordArray.length > 3) {
				createWord();
			}
		} else {
			if($.inArray(e.keyCode, specialKeys) === -1) {
				testResults();
			} else {
				ruleOutPossibilities(1, "solveTable");
				checkProbability();
			}
		}
	}
});

function allComputerWords() {
	for (var i = 4; i <= 8; i++) {
		docName = eval("full" + nLetters);
		for (var j = 0; j < docName.length; j++) {
			computerAI(docName[j]);
		}
	}
}

$(document).ready(function() {
    $('#testButton').click(function() {
        createOn = false;
        $('.compAI').slideDown('fast').show();
    	$('#testForm').show();
    	$('#solveForm').hide();
    	$('#createForm').hide();
    	//$('#audio')[0].play();
    });
    $('#solveButton').click(function() {
        createOn = false;
        $('.compAI').hide();
    	$('#solveForm').show();
    	$('#createForm').hide();
    	$('#testForm').hide();
    	$('.compAI').hide();
    })
    $('#createButton').click(function() {
        createOn = true;
        $('.compAI').hide();
    	$('#createForm').show();
    	$('#solveForm').hide();
    	$('#testForm').hide();
    	$('.compAI').hide();
    })
});

function makeAdjustments (word) {
	var tempWordArray = word.toLowerCase().split("");
	for (var i = 0; i < tempWordArray.length; i++){
		
		if (alphaArray.indexOf(tempWordArray[i]) != -1) {
			guessWordArray.push(tempWordArray[i]);
		}
	}
	return guessWordArray;
}

function restartCompAI (lengthArray) {
	var n = lengthArray.length,
		tempClass = "spaces" + n,
		tempUl = document.createElement("ul");
	strikes = (12 - n);
	$("#spacesAI").removeClass();
	strikeList.innerHTML = "";
	document.getElementById("spacesAI").innerHTML = "";
	$("ul li").removeClass();
	$("td").removeClass();
	for(var i = 0; i < strikes; i++) {
		var tempLi = document.createElement("li");
		tempUl.appendChild(tempLi);
	}
	strikeList.appendChild(tempUl);
	for(var i = 0; i < n; i++) {
		var tempEl = document.createElement("smallspace");
		tempEl.innerHTML = "?";
		spacesAI.appendChild(tempEl);
	}
	$("#spacesAI").addClass(tempClass);
}

function startTest() {
	guessWordArray = [];
	word = document.forms.testForm.testAI.value;
	guessWordArray = makeAdjustments(word);
	restartCompAI(guessWordArray);
	computerAI(word, guessWordArray);
}
