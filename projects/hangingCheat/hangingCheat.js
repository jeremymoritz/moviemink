var nLetters,
	word,
	listChoice,
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
	toyboxFull = false,
	createWordArray = [],
	constantArray = [],
	percen = {},
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
	listChoice = document.forms.solveForm.full.checked ? "Common" : "";
	wordList = [];
	assembleLetters(1);	
	docName = eval("full" + listChoice + nLetters);
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
	listChoice = document.forms.createForm.full.checked ? "Common" : ""; 
	for (var l = 8; l >= 4; l--) {
		docName = eval("full" + listChoice + l);
		wordList = [];
		for (var i = 0; i < docName.length; i++) {
		  	createWordArray = constantArray.split(",");
		  	testCreate(docName[i]) ? wordList.push(docName[i]) : trashCan++;
		}		
		makeWordList(wordList, "createTable");
		computerMissed(wordList);
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
		if ((percent > 85) && (listChoice == "Common")) {
			removeCommon();
		}
		return letterList[0][0];
	}
}

function guessLetter (letter, guessWordArray) {
	console.log("Computer guesses \"" + letter + "\"");
	if (guessWordArray.indexOf(letter) == -1) {
		strikes--;
		tries++;
		console.log("Misses with \"" + letter + "\" and is down to only " + strikes + " strikes left");
		var tempId = letter;
		tempId += "Letter";
		var tempSrc = "_img/letters/";
		tempSrc += letter;
		tempSrc += "_red.png";
		var tempStrike = "_img/strikes/";
		tempStrike += tries;
		tempStrike += "_strikes.png";
		var tempTemp = 'strikesAI';
		document.getElementById(tempTemp).setAttribute('src', tempStrike);
		document.getElementById(tempId).setAttribute('src', tempSrc);
	} else {
		console.log("That is correct!");
		var tempId = letter;
		tempId += "Letter";
		var tempSrc = "_img/letters/";
		tempSrc += letter;
		tempSrc += "_green.png";
		document.getElementById(tempId).setAttribute('src', tempSrc);
		for (var i = 0; i < guessWordArray.length; i++) {
			if (guessWordArray[i] == letter) {
				computerGuessWord[i] = letter;
				correctGuess++
				tempSrc = "_img/letters/";
				tempSrc += letter;
				tempSrc += ".png";
				tempId = 'correctGuess';
				tempId += i;
				document.getElementById(tempId).setAttribute('src', tempSrc);
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

function computerAI (word, guessWordArray, common) {
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
		var tempMessage = "What do you think you're doing to me giving me ";
		tempMessage += '"';
		tempMessage += word;
		tempMessage += '"';
		tempMessage += "? You can't give a word that is more than 8 letters long!";
		alert (tempMessage);
		return "Give me another word";
	} else if (nLetters < 4) {
		var tempMessage = 'What is this tiny "';
		tempMessage += word;
		tempMessage += '" word about? You have to give a word of at least 4 letters.';
		alert (tempMessage);
		return "Try another word";
	}
	listChoice = (!common ? "" : "Common");
	docName = eval("full" + listChoice + nLetters);
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

function removeCommon() {
	listChoice = '';
	docName = eval("full" + nLetters);
	for (var i = 0; i < docName.length; i++){
		if (wordList.indexOf(docName[i]) == -1) {
			wordList.push(docName[i]);
		}
	}
	ruleOutPossibilities(2, "testTable");
	
}

function myRecursiveFunction () {
	if (strikes > 0 && correctGuess != guessWordArray.length) {
		if (wordList.length < 1) {
			var tempMessage = 'What are you trying to pull?! "';
			tempMessage += word;
			tempMessage += '"';
			tempMessage += " isn't even a word!";			
			alert (tempMessage);
			return "Just give another word";
			}
		guessLetter(checkProbability(), guessWordArray)
	}
	if (strikes == 0) {
		if (wordList.indexOf(word) == -1) {
			var tempMessage = 'What are you trying to pull?! "';
			tempMessage += word;
			tempMessage += '"';
			tempMessage += " isn't even a word!";			
			alert (tempMessage);
			return "Just give another word";
		}
		var tempMessage = 'After missing "';
		tempMessage += word;
		tempMessage += '" computer feels quite defeated.';
		alert (tempMessage);
		return;
	} else if (correctGuess == guessWordArray.length) {
		var tempMessage = 'Computer guessed "';
		tempMessage += word;
		tempMessage += '" with ';
		tempMessage += strikes;
		tempMessage += ' strikes left over!';
		alert (tempMessage);
		computerCorrect.push(word);
		return;
	}
	document.getElementById("testTable").innerHTML = "";
	makeWordList(wordList, "testTable");	
	setTimeout(myRecursiveFunction, timer);
}

$("#mainLetters").keyup(function(e) {
	if($.inArray(e.keyCode, ignoreKeys) === -1) {
		//	do javascript stuff here for mainLetters
		testResults();
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
			// if($.inArray(e.keyCode, specialKeys) >= 0) {
				// testResults();
			// } else {
				ruleOutPossibilities(1, "solveTable");
				checkProbability();
			//}
		}
	}
});

function computerMissed(wordArray) {
	var quotation = "The computer missed the following words: ";
	for (var i = 0; i < wordArray.length; i++) {
		if (computerMisses.indexOf(wordArray[i]) != -1) {
			quotation += wordArray[i];
			quotation += ", ";
		}
	}
    document.getElementById('computerMiss').innerHTML = quotation;
}

function allComputerWords(common) {
	listChoice = (!common ? "" : "Common");
	for (var i = 4; i <= 8; i++) {
		docName = eval("full" + listChoice + nLetters);
		for (var j = 0; j < docName.length; j++) {
			computerAI(docName[j]);
		}
	}
}

$(document).ready(function() {
    if (!toyboxFull) {
	    for (var i = 0; i < alphaArray.length; i++) {
	    	var toybox = document.getElementById('toybox'),
	    		tempImg1 = document.createElement('img'),
	    		tempImg2 = document.createElement('img'),
	    		tempImg3 = document.createElement('img'),
	    		tempSrc = '_img/letters/';
	    	
	    	tempSrc += alphaArray[i];
	    	
	    	var tempSrcRed = tempSrc,
	    		tempSrcGreen = tempSrc;
	    	
	    	tempSrc += '.png';
	    	tempSrcRed += '_red.png'; 
	    	tempSrcGreen += '_green.png';
	    	tempImg1.setAttribute('src', tempSrc);
	    	toybox.appendChild(tempImg1);
	    	tempImg2.setAttribute('src', tempSrcRed);
	    	toybox.appendChild(tempImg2);
	    	tempImg3.setAttribute('src', tempSrcGreen);
	    	toybox.appendChild(tempImg3);
	    	if (i <= 8) {
	    		tempSrc = '_img/strikes/';
	    		tempSrc += i;
	    		tempSrcRed = tempSrc;
	    		tempSrcGreen = tempSrc;
	    		tempSrc += '_start.png';
	    		tempSrcRed += '_strikes.png';
	    		tempSrcGreen += '_empty.png';
		    	tempImg1.setAttribute('src', tempSrc);
		    	toybox.appendChild(tempImg1);
		    	tempImg2.setAttribute('src', tempSrcRed);
		    	toybox.appendChild(tempImg2);
		    	tempImg3.setAttribute('src', tempSrcGreen);
		    	toybox.appendChild(tempImg3);	    		
	    	}
	    }
	    toyboxFull = true;  	
    }
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
	var tempWordArray = word.split("");
	for (var i = 0; i < tempWordArray.length; i++){
		if (alphaArray.indexOf(tempWordArray[i]) != -1) {
			guessWordArray.push(tempWordArray[i]);
		}
	}
	return guessWordArray;
}

function startTest() {	
	var lettersTable = document.getElementById("lettersTable");
	guessWordArray = [];
	word = document.forms.testForm.testAI.value;
	guessWordArray = makeAdjustments(word);
	lettersTable.innerHTML = '';
	
	var tempSrc = "_img/strikes/",
		tempStart = tempSrc;
	tempSrc += guessWordArray.length;
	tempStart += guessWordArray.length;
	tempSrc += "_empty.png";
	tempStart += "_start.png";
	document.getElementById('startAI').setAttribute('src', tempStart);
	document.getElementById('emptyAI').setAttribute('src', tempSrc);
	document.getElementById('correctGuess7').setAttribute('src','_img/letters/undefined.png');
	document.getElementById('strikesAI').setAttribute('src','_img/strikes/0_strikes.png');
	
	for (var i = 0; i < 4; i++) { 
		var tempTr = document.createElement('tr');
		for (var j = 0; j < 7; j++) {
			var tempTd = document.createElement("td"),
				tempId = pureAlphaArray[i * 7 + j],
				tempImg = document.createElement("img"),
				tempIdSpace = "correctGuess";
			tempImg.setAttribute('src','_img/letters/undefined.png');
			tempId += "Letter";
			tempIdSpace += j;
			tempImg.setAttribute('id', tempId);
			document.getElementById(tempIdSpace).setAttribute('src','_img/letters/undefined.png');
			tempTd.appendChild(tempImg);
			tempTr.appendChild(tempTd);
		}
		lettersTable.appendChild(tempTr);		
	}
	computerAI(word, guessWordArray);
}
