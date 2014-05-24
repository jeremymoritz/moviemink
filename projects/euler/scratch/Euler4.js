var allPalindromes = [];

function palindromeCheck (check) {
	if (allPalindromes.indexOf(check) > -1) {
		return false;
	}
	check += '';
	if (check == check.split('').reverse().join('')) {
		return true;
	}
	return false;
}

function findPalindrome (power){
	var num = Math.pow(10, power),
		allPalindromes = [];
	outerLoop:
	for (i = 10; i < num; i++) {
		for (j = num; j <= 1; j--) {
			if ((i * j) < allPalindromes[allPalindromes.length - 1]) {
				continue outerLoop
			}  
			if (palindromeCheck(i * j)) {
				allPalindromes.push(i * j);
				allPalindromes.sort (function(a, b) {return a - b});
			}
		}
	}
}



// better, but only works up to 4 digit numbers. Needed more optimizing

function palindromeCheck (check) {
	if (allPalindromes.indexOf(check) > -1) {
		return false;
	}
	check += '';
	if (check == check.split('').reverse().join('')) {
		return true;
	}
	return false;
}


var allPalindromes = [];

function findPalindrome (power){
	var num = Math.pow(10, power);
	for (i = 10; i < num; i++) {
		for (j = 1; j <= i; j++) {
			if (palindromeCheck(i * j)) {
				allPalindromes.push(i * j);
			}
		}
	}
	allPalindromes.sort (function(a, b) {return a - b})
}



// This one works, but I learned the value of turning them into a string!

function palindrome (bigNumber) {
	var	xTenThousand = bigNumber % 100000,
		hundredThousand = bigNumber - xTenThousand,
		hundredThousandDigit = hundredThousand / 100000,
		xThousand = xTenThousand % 10000,
		tenThousand = xTenThousand - xThousand,
		tenThousandDigit = tenThousand / 10000,
		xHundred = xThousand % 1000,
		thousand = xThousand - xHundred,
		thousandDigit = thousand / 1000,
		xTen = xHundred % 100,
		hundred = xHundred - xTen,
		hundredDigit = hundred / 100,
		xOne = xTen % 10,
		ten = xTen - xOne,
		tenDigit = ten / 10,
		oneDigit = xOne;
	if (hundredThousandDigit == oneDigit && tenThousandDigit == tenDigit && thousandDigit == hundredDigit) {
		return true;
	}
	return false
}

function multiplier () {
	var palindromes = [];
	for (var i = 316; i < 1000; i++) {
		for (var j = 316; j <= i; j++) {
			if (palindrome(i * j)) {
				console.log(i * j);
				palindromes.push(i * j);
			}
		}
	}
	palindromes.sort;
	console.log(palindromes[palindromes.length - 1]);
}


/*
var bigNum = 983295;
var HundredThousand = (bigNum - (bigNum % 100000)) / 100000;
var tenThousand = ((bigNum - (HundredThousand * 100000)) - (bigNum % 10000)) / 10000;
var Thousand = 
 
/*
983,295
983,295 - (983,295 % 100,000) = 900,000
(983,295 - (983,295 % 100,000)) / 100,000 = 9
983,295 - 90,000 = 83,295
83,295 - (83,295 % 10,000) = 80,000
(83,295 - (83,295 % 10,000)) / 10,000 = 8


(x - (x % 10000)) equals a number divisable by 10000
*/