var newNumber = '11'; // must define it outside of function to use it in multiple
var numbersArray = [];
var newNumberArray = [];
var i = 0;

function addToNextArray (number, tempArray, p) {
	var k = 0;
	while (p <= tempArray.length){
		if (tempArray[p] == number) {
			k++;
			p++;	
		} else {
			k += ''
			return k + number;
		}
	}
}

function createNext (prevNum) {
	var numbersArray = prevNum.split(''),
		newNumberArray = [], // reset newNumberArray
		i = 0; // reset i
		
	while (i < numbersArray.length) {
		newNumberArray.push(addToNextArray (numbersArray[i], numbersArray, i));
		var q = newNumberArray[newNumberArray.length - 1];
		q = q.split('');
		i += parseInt(q[0]);
	}
	newNumber = newNumberArray.join('');
	return newNumber;
}

function countingNumbers(newNumber) {
	newNumberArray = newNumber.split('');
	newNumberArray.sort(function(a, b) {return a - b});
	var An = newNumberArray.indexOf("2") > 0 ? newNumberArray.indexOf("2") : newNumberArray.length;
	var Bn = newNumberArray.indexOf("3") > 0 ? newNumberArray.indexOf("3") - An : newNumberArray.length - An;
	var Cn = newNumberArray.indexOf("4") > 0 ? newNumberArray.indexOf("4") - An - Bn : newNumberArray.length - An - Bn;
	var t = '"' + An + "," + Bn + "," + Cn + '"';
	return t;
}

function findNthChild () {
	var startTime = (new Date()).getTime();
	var newNumber = '11'; // must define it outside of function to use it in multiple
	var numbersArray = [];
	var newNumberArray = [];
	var i = 0;
	var nth = document.forms.solve.num8.value ? document.forms.solve.num8.value - 1 : 4
	console.log("1");
	for (var j = 0; j < nth; j++) {
		//console.log(newNumber);
		var startTime = (new Date()).getTime();
		console.log("At n = " + (j + 2) + ", answer is " + countingNumbers(newNumber));
		console.log("Time Elapsed for n = " + (j + 2) + " is " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
		newNumber = createNext (newNumber);
	}	
}



/* / This was my first attempt, I abandonded it early 

function determineNumber (n) {
	number = parseInt(n);
	if (number == 1) { 
		determine1s(number);
	}
	 if (number > 5) {
		if (number > 7) {
			number > 8 ? determine9s(number) : determine8s();
		} else {
			number > 6 ? determine7s() : determine6s();
		}
	} else {
		if (number > 3) {
			number > 4 ? determine5s() : determine4s();
		} else {
			number > 2 ? determine3s() : determine2s();
		}
	}
}

function determine1s (number) {
	var j = 0;
	while (i <= numbersArray.length){
		if (numbersArray[i] == number) {
			j++;
			i++;	
		} else {
			j += ''
			newNumber.push(j + number);
			break;
		}
	}
	return i;
}



function determine2s () {
	if (numbersArray[i] == numbersArray[i - 1]) {
			
		}
}

function determine3s () {
	if (numbersArray[i] == numbersArray[i - 1]) {
			
		}
}
*/