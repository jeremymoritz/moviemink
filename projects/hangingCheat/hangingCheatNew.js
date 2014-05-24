var nLetters,
	word,
	tempMessage,
	regExp,
	getData,
	varientVariable,
	playWord,
	playCorrect,
	playTries,
	startPoint = 0,
	endPoint = 0,
	wordList = [],
	wordObjectArray = [],
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
	playWordArray = [],
	stillGuessing = true,
	commonList = false,
	createWordArray = [],
	constantArray = [],
	percen = {},
	lettersPlayTable = document.getElementById('lettersPlayTable'),
	lettersTable = document.getElementById('lettersTable'), 
	strikePlayList = document.getElementById('strikePlayList'),
	strikeList = document.getElementById('strikeList'),
	spacesPlayAI = document.getElementById('spacesPlayAI'),
	spacesAI = document.getElementById('spacesAI'),
	alphabet = "abcdefghijklmnopqrstuvwxyz",
	valueAlphabet ={s:1, r:1, t:1, n:1, e:1, a:1, i:1, o:1, u:2, l:2, d:2, g:3, h:3, y:3, p:4, c:4, m:4, b:4, f:4, w:4, v:5, k:5, x:8, z:10, j:10, q:10}, 
	alphaArray = alphabet.split(""),
	valueAlphaArray = alphabet.split(''),
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
			n = n.toLowerCase();
		} else {
			computerGuessWord[j] ? n = computerGuessWord[j] : n = null;
		}
		alphaArray.indexOf(n) == -1 ? n = null : n = n;
		if (n) {
			if (wordArray[j] != n) {
				return false;
			}
		} else {			if (Used.indexOf(wordArray[j]) == -1) {
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
		var n = document.forms.solveForm.notUsed.value ? document.forms.solveForm.notUsed.value.toLowerCase() : ".",
			newArray = n.split(""),
			y;
			
		for (var j = 1; j <= nLetters; j++) {
			y = eval("document.forms.solveForm.letter" + j + ".value");
			y = y.toLowerCase();
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
	var startTime = (new Date()).getTime();
	if (!nLetters) {
		alert("You must provide a number of letters");
		return false;
	}
	getData = "";
	getData += "nLetters=" + nLetters;
	getData += document.forms.solveForm.full.checked ? "&common=1" : "";
	wordList = [];
	assembleLetters(1);
    var tempCode = "[";
    for (var i = 0; i < Used.length; i++) {
     	tempCode += Used[i];
    }
    tempCode += "]";
    regExp = "^";
    for (var j = 1; j <= nLetters; j++) {
			var y = eval("document.forms.solveForm.letter" + j + ".value");
			regExp += y ? y : tempCode;
	}
	getData += "&regExp=" + regExp + "$";
	$.ajax({
		url: "words.php",
		cache: false,
		data: getData
	}).done(function( html ) {
		html = html.substring(0, html.length - 1);
		wordList = html.split(",");
		document.getElementById("solveTable").innerHTML = "";	
		makeWordList(wordList, "solveTable");
		checkProbability(true);
		console.log("Total time elapsed for results: " + (((new Date()).getTime() - startTime)) + " milliseconds");
	});
}

function assignValue(word, spot, type) {
	var wordValue = 0,
		wordSplit = word.split("");
	for (var i = 0; i < wordSplit.length; i++) {
		wordValue += eval("valueAlphabet." + wordSplit[i]);
	}
	if (word.length >= spot) {
		if (type == "dl" || type == "tl") {
			spot--;
			wordValue += type == "dl" ? eval("valueAlphabet." + wordSplit[spot]) : eval("valueAlphabet." + wordSplit[spot]) * 2;
		} else {
			wordValue = wordValue * type;
		}
	}
	return wordValue;
}

function makeWordValueList(wordArray, varient) {
	var wordTable = document.getElementById(varient),
		bonusLocation = $('input[name="bonusLocation"]:checked').val() ? $('input[name="bonusLocation"]:checked').val() : 1,
		bonusType = $('input[name="bonusType"]:checked').val() ? $('input[name="bonusType"]:checked').val() : 1,
		tempObj = {},
		tempVal = 0;
	endPoint = wordArray.length > 20 ? 20 : wordArray.length;
	wordObjectArray = [];
	varientVariable = varient;
	for (var j = 0; j < wordArray.length; j++) {
		tempVal = assignValue(wordArray[j], bonusLocation, bonusType);
		tempObj = {word:wordArray[j],value:tempVal};  
		wordObjectArray.push(tempObj);
	}
	wordObjectArray.sort(function(a,b) {
		return b.value - a.value; 
	});
	for (var i = 0; i < endPoint; i++) {
		var tempTr = document.createElement("tr"),
			tempTd = document.createElement("td"),
			tempTd2 = document.createElement("td"),
			tempText = document.createTextNode(wordObjectArray[i].word.toUpperCase()),
			tempValue = document.createTextNode(wordObjectArray[i].value);
			
		tempTd.appendChild(tempText);
		tempTd2.appendChild(tempValue);
		tempTr.appendChild(tempTd);		
		tempTr.appendChild(tempTd2);
		wordTable.appendChild(tempTr);
	}
	if (endPoint == 20) {
		$("#showMore").show();
	} else {
		$("#showMore").hide();
	}
}

function createWord () {
	var n = document.forms.createForm.notUsed.value.toLowerCase();
	createWordArray = n.split("");
	constantArray = "";
	constantArray += createWordArray;
	notUsed = [];
	Used = [];
	if (createWordArray.length < 4) {
		alert("You must provide at least 4 letters");
		return false;
	}
	wordList = [];
	getData = "";
    var tempCode = "[";
    for (var i = 0; i < createWordArray.length; i++) {
     	tempCode += createWordArray[i];
    }
    tempCode += "]";
    regExp = "^";
    for (var j = 0; j < 4; j++) {
			regExp += tempCode;
	}
	getData += "regExp=" + regExp;
	getData += document.forms.createForm.full.checked ? "&common=1" : "";
	$.ajax({
		url: "words.php",
		cache: false,
		data: getData
	}).done(function( html ) {
		wordList = [];
		html = html.substring(0, html.length - 1);
		var tempWordList = html.split(",");
		for (var k = 0; k < tempWordList.length; k++) {
	  		createWordArray = constantArray.split(",");
			testCreate(tempWordList[k]);
		};
		wordList.sort(function(a, b){
		  return b.length - a.length; 
		});
		document.getElementById("createTable").innerHTML = "";
		document.forms.createForm.wordValues.checked ? makeWordValueList(wordList, "createTable") : makeWordList(wordList, "createTable");
	});
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
	wordList.push(word);
}

function makeWordList(wordArray, varient) {
	var wordTable = document.getElementById(varient);
	endPoint = wordArray.length > 20 ? 20 : wordArray.length;
	varientVariable = varient;
	for (var i = 0; i < endPoint; i++) {
		var tempTr = document.createElement("tr"),
			tempTd = document.createElement("td"),
			tempText = document.createTextNode(wordArray[i].toUpperCase());	
		tempTd.appendChild(tempText);
		tempTr.appendChild(tempTd);		
		wordTable.appendChild(tempTr);
	}
	if (endPoint == 20) {
		$("#showMore").show();
	} else {
		$("#showMore").hide();
	}
}

function showMore() {
	var wordTable = document.getElementById(varientVariable);
	startPoint = endPoint;
	if (wordList.length > (endPoint + 20)) {
		endPoint = (endPoint + 20);
	} else {
		endPoint = wordList.length;
		$('#showMore').hide();
	}
		
	for (var i = startPoint; i < endPoint; i++) {
		var tempTr = document.createElement("tr"),
			tempTd = document.createElement("td"),
			tempTd2 = document.createElement("td");
		if(varientVariable == "createTable" && document.forms.createForm.wordValues.checked) {
			var tempText = document.createTextNode(wordObjectArray[i].word.toUpperCase()),
				tempVal = (wordObjectArray[i].value);
			tempVal = document.createTextNode(tempVal);
			tempTd.appendChild(tempText);
			tempTd2.appendChild(tempVal);
			tempTr.appendChild(tempTd);
			tempTr.appendChild(tempTd2);
		} else {
			var tempText = document.createTextNode(wordList[i].toUpperCase());
			tempTd.appendChild(tempText);
			tempTr.appendChild(tempTd);
		}		
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

function checkProbability(bool) {
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
			tempLetter = letterList[0][0],
			quotation = bool ? "I think you should choose the letter \"" : "Computer guesses \"";
		   quotation += tempLetter.toUpperCase();
		   quotation += "\" because it has a ";
		   quotation += percent;
		   quotation += "% chance of being in the next word!";
		   $('#percentage').show();
		   document.getElementById('percentage').innerHTML = quotation;
		   document.getElementById('nextGuessAI').innerHTML = quotation;
		return letterList[0][0];
	}
}

function guessLetter (letter, guessWordArray) {
	var capLetter = letter.toUpperCase();
	console.log("Computer guesses \"" + letter + "\"");
	var tempRequest = "iphone td:contains('" + capLetter + "')";
	if (guessWordArray.indexOf(letter) == -1) {
		strikes--;
		tries++;
		var tempLi = "li:nth-child(" + tries + ")";
		console.log("Misses with \"" + letter + "\" and is down to only " + strikes + " strikes left");
		$(tempRequest).addClass('red');
		$(tempLi).addClass('strike');
	} else {
		console.log("That is correct!");
		$(tempRequest).addClass('green');
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
	strikes = (12 - nLetters);
	tries = 0;
	wordList = [];
	computerNotUsed = [];
	computerGuessWord = {};
	computerScore = 0;
	getData = "";
	for (var i = guessWordArray.length; i > -1; i--) {
		if (vowelArray.indexOf(guessWordArray[i]) != -1) {
			if(!firstGuess) { 
				firstGuess = guessWordArray[i];
			}
		}
	}
    if (!firstGuess) {
        firstGuess = "y";
        computerNotUsed.push("a", "e", "i", "o", "u");
    }  
	guessLetter(firstGuess, guessWordArray);
	assembleLetters(0); 
	var tempCode = "["; 
    for (var i = 0; i < Used.length; i++) {
     	tempCode += Used[i];
    }
    tempCode += "]"
	getData += "regExp=";
	regExp = "^";
	for (var k = 0; k < guessWordArray.length; k++) {
		regExp += (guessWordArray[k] == firstGuess) ? firstGuess : tempCode;
	}
	getData += regExp + "$";
	if(document.forms.testForm.full.checked) {
		getData += "&common=1"
		commonList = true;
	} else {
		commonList = false;
	}
	getData += "&nLetters=" + nLetters;
	$.ajax({
		url: 'words.php',
		cache: false,
		data: getData
	}).done(function( html ) {
		html = html.substring(0, html.length - 1);
		wordList = html.split(",");
		document.getElementById("testTable").innerHTML = "";
		makeWordList(wordList, "testTable");	
		setTimeout(myRecursiveFunction, timer);
	});
}

function myRecursiveFunction () {
	if (strikes > 0 && correctGuess != guessWordArray.length) {
		if (wordList.length < 1) {
			tempMessage = 'What are you trying to pull?! "' + word + '"' + " isn't even a "; 
			tempMessage += commonList ? "common word!" : "word!";			
			alert (tempMessage);
			return "Just give another word";
			}
		guessLetter(checkProbability(false), guessWordArray)
	}
	if (strikes == 0) {
		var tempWord = guessWordArray.join("");
		if (wordList.indexOf(tempWord) == -1) {
			tempMessage = 'What are you trying to pull?! "' + word + '"' + " isn't even a "; 
			tempMessage += commonList ? "common word!" : "word!";			
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

var ignoreKeysAI = [8, 9, 46, 16, 37, 38, 39, 40];	//	as long as the key being pressed is not backspace (8), tab (9), delete (46), shift (16), or any arrow keys (37-40)...

$("#wordValuesClick").click(function() {
	$("#wordValuesInput").slideToggle('300');
});

$("#formContainer").on("keyup", "input[type='text']", function(e) {
		var key = e.keyCode;
		if($.inArray(key, ignoreKeysAI) === -1) {
		this.value = this.value.toUpperCase().replace(/[^A-Za-z]/g, '');
	}
});

$("#mainLetters").on("keyup", "input[type='text']", function(e) {
		var key = e.keyCode;
		if($.inArray(key, ignoreKeysAI) === -1) {
		this.value = this.value.toUpperCase().replace(/[^A-Za-z]/g, '');
		$(this).next().focus();
		if(wordList.length > 0) {
			ruleOutPossibilities(1, "solveTable");
			checkProbability(true);
		} else {
			testResults();
		}
	}
});

$(".ruledOut").keyup(function(e) {
	if($.inArray(e.keyCode, ignoreKeys) === -1) {
			if(wordList.length == 0) {
				testResults();
			} else {
				ruleOutPossibilities(1, "solveTable");
				checkProbability(true);
			}
	}
});

$(document).ready(function() {
	$("#showMore").hide();
    $('#testButton').click(function() {
        $('.compAI').slideDown('fast').show();
    	$('#testForm').show();
    	$('#solveForm').hide();
    	$('#createForm').hide();
		$('#showMore').hide();
		$('#playForm').hide();
    	//$('#audio')[0].play();
    });
    $('#solveButton').click(function() {
        $('.compAI').hide();
    	$('#solveForm').show();
    	$('#createForm').hide();
    	$('#testForm').hide();
    	$('.compAI').hide();
		$('#showMore').hide();
		$('#playForm').hide();
    });
    $('#createButton').click(function() {
        $('.compAI').hide();
    	$('#createForm').show();
    	$('#solveForm').hide();
    	$('#testForm').hide();
    	$('.compAI').hide();
		$('#showMore').hide();
		$('#playForm').hide();
    });
    $('#playButton').click(function() {
        $('.compAI').hide();
    	$('#createForm').hide();
    	$('#solveForm').hide();
    	$('#testForm').hide();
    	$('.compAI').hide();
		$('#showMore').hide();
		$('#playForm').show();
    });
    $('#lettersPlayTable td').click(function() {
    	var letterValue = $(this).context.innerHTML;
    	guessPlayLetter(letterValue, playWordArray);
    });
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
	$('#spacesAI').removeClass();
	$('#spacesAI').addClass(tempClass);
	strikeList.innerHTML = "";
	spacesAI.innerHTML = "";
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
}

function startTest() {
	guessWordArray = [];
	word = document.forms.testForm.testAI.value;
	guessWordArray = makeAdjustments(word);
	nLetters = guessWordArray.length;
	if (nLetters > 8) {
		tempMessage = "What do you think you're doing to me giving me " + '"' + word + '"' + "? You can't give a word that is more than 8 letters long!";
		alert (tempMessage);
		return "Give me another word";
	} else if (nLetters < 4) {
		tempMessage = 'What is this tiny "' + word + '" word about? You have to give a word of at least 4 letters.';
		alert (tempMessage);
		return "Try another word";
	}	
	restartCompAI(guessWordArray);
	computerAI(word, guessWordArray);
}

function guessPlayLetter (letter, playWordArray) {
	if (playWordArray.length == 0) {
		return false;
	}
	var lowLetter = letter.toLowerCase();
	var capLetter = letter.toUpperCase();
	console.log("Player guesses \"" + capLetter + "\"");
	var tempRequest = "iphone td:contains('" + capLetter + "')";
	if (playWordArray.indexOf(lowLetter) == -1) {
		playStrikes--;
		playTries++;
		var tempLi = "li:nth-child(" + playTries + ")";
		console.log("Misses with \"" + letter + "\" and is down to only " + strikes + " strikes left");
		$(tempRequest).addClass('red');
		$(tempLi).addClass('strike');
		if (playStrikes == 0) {
			alert ('Too bad, you missed it');
		}
	} else {
		console.log("That is correct!");
		$(tempRequest).addClass('green');
		for (var i = 0; i < playWordArray.length; i++) {
			if (playWordArray[i] == lowLetter) {
				spacesPlayAI.getElementsByTagName('smallspace')[i].innerHTML = capLetter;
				playCorrect++;
			}
		}
		if (playCorrect == playWordArray.length) {
			tempMessage = 'Congratulations! You guessed "' + playWord;
			if (playStrikes > 0 ) {
				tempMessage += '" with ' + playStrikes + ' strikes left over!';
			} else {
				playStrikes = (playStrikes * -1) + 1;
				tempMessage += '" with only ' + playStrikes + ' extra guess';
				tempMessage += playStrikes > 1 ? 'es.' : '.';
			}
			alert(tempMessage);
		}
	}
}

function restartPlayAI (lengthArray) {
	var n = lengthArray.length,
		tempUl = document.createElement("ul");
	playStrikes = (12 - n);
	playTries = 0;
	playCorrect = 0;
	strikePlayList.innerHTML = "";
	spacesPlayAI.innerHTML = "";
	$("ul li").removeClass();
	$("td").removeClass();
	for(var i = 0; i < playStrikes; i++) {
		var tempLi = document.createElement("li");
		tempUl.appendChild(tempLi);
	}
	strikePlayList.appendChild(tempUl);
	for(var i = 0; i < n; i++) {
		var tempEl = document.createElement("smallspace");
		tempEl.innerHTML = "?";
		spacesPlayAI.appendChild(tempEl);
	}
}

function playComputer() {	
	var maxLimit = document.forms.playForm.full.checked ? 24151 : 79291;
	var randomWordIndex = Math.floor(Math.random()*maxLimit);
	var common = maxLimit > 25000 ? 0 : 1;
	var firstGuess = "";
	getData = "limit=" + randomWordIndex + "&";
	getData += "common=" + common;
	playWordArray = [];
	$.ajax({
		url: "playWord.php",
		cache: false,
		data: getData
	}).done(function( html ) {
		playWord = html.substring(0, html.length - 1);
		playWordArray = playWord.split("");
		for (var i = playWordArray.length; i > -1; i--) {
			if (vowelArray.indexOf(playWordArray[i]) != -1) {
				if(!firstGuess) { 
					firstGuess = playWordArray[i];
				}
			}
		}
		nLetters = playWordArray.length;		
		var tempClass = "spaces" + nLetters;
		$('#spacesPlayAI').removeClass();
		$('#spacesPlayAI').addClass(tempClass);
		setTimeout(function() {			
			restartPlayAI(playWordArray);
		    if (firstGuess) {
				guessPlayLetter(firstGuess, playWordArray);
		    }
		} , 25);
	});
}
