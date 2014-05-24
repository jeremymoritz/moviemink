function sumThreesFives () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num1.value ? document.forms.solve.num1.value : 1000,
	    sum = 0;
	    
	for (var i = 1; i < n; i++) {
		sum += i % 3 ? (i % 5 ? 0 : i) : i;
	}
	console.log("The sum of all the multiples of 3 and 5 below " + n + " is " + sum);
	document.getElementById('answer1').innerHTML = sum;
	console.log("Time Elapsed for problem 1: " + (((new Date()).getTime() - startTime)) + " milliseconds");
}

function fibonacci () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num2.value ? document.forms.solve.num2.value : 4000000,
		sum = 0,
		j = 1,
		k = 0;
		
	while (j <= n) {
		if (j % 2 == 0) {
			sum += j
		} 		
		j += k;
		k = j - k;
	}
	console.log("The sum of all the even numbers in the Fibonacci sequence without exceeding " + n + " is " + sum);
	document.getElementById('answer2').innerHTML = sum;
	console.log("Time Elapsed for problem 2: " + (((new Date()).getTime() - startTime)) + " milliseconds");
}

function findFactors () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num3.value ? document.forms.solve.num3.value : 600851475143,
		num = n,
		factors = [],
		i = 2;
		
	while (i <= n) {
		if (n % i == 0) {
			n = n / i;
			factors.push(i);
		} else {
			i++;	
		}
	}
	console.log("The factors of " + num + " are " + factors);
	document.getElementById('answer3').innerHTML = factors[factors.length - 1];
	console.log("Time Elapsed for problem 3: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function palindromeCheck (check) {
	check += '';
	if (check == check.split('').reverse().join('')) {
		return true;
	}
	return false;
}

function findPalindrome (){
	var startTime = (new Date()).getTime(),
		allPalindromes = [], // reset allPalindromes if someone tries another time
		power = document.forms.solve.num4.value ? document.forms.solve.num4.value : 3,
		num = Math.pow(10, power) - 1;
	
	outerLoop:
	for (var i = num; i >= 1; i--) {
		innerLoop:
		for (var j = num; j >= i; j--) {
			if ((i * j) < allPalindromes[allPalindromes.length - 1]) {
				continue outerLoop;
			}
			if (palindromeCheck(i * j)) {
				allPalindromes.sort (function(a, b) {return a - b});
				allPalindromes.indexOf(i * j) < 0 ? allPalindromes.push(i * j) : power = 2 // pointless assignment because 'continue innerLoop' doesn't work the way i expected 
			}
		}
	}
	allPalindromes.sort (function(a, b) {return a - b});
	console.log("The highest palindromic number is " + allPalindromes[allPalindromes.length - 1])
	document.getElementById('answer4').innerHTML = allPalindromes[allPalindromes.length - 1];
	console.log("Time Elapsed for problem 4: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function lowestDivisible() {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num5.value ? document.forms.solve.num5.value : 2000000000,
		answer = 0;
	
	outerLoop:
	for(var i = 20000000; i <= n; i++) {
		innerLoop:
		for(var j = 11; j <= 20; j++) {
			if(i % j > 0) {
				continue outerLoop;
			}
		}
		console.log("The smallest number that is even divisible by all the numbers from 1 to 20 is " + i);
		answer = i;
		break;
	}
	document.getElementById("answer5").innerHTML = answer;
	console.log("Time Elapsed for problem 5: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function sumSquares () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num6.value ? document.forms.solve.num6.value : 100,
		firstSum = 0,
		secondSum = 0;
		
	for (var i = 1; i <= n; i++) {
		firstSum += Math.pow(i, 2);
		secondSum += i;
	}
	console.log("The sum of squares of the first " + n + " numbers is " + Math.pow(secondSum, 2) + " and the square of the sum is " + firstSum + ".")
	document.getElementById("answer6").innerHTML = Math.pow(secondSum, 2) - firstSum;
	console.log("Time Elapsed for problem 6: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function findPrime () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num7.value ? document.forms.solve.num7.value : 10001,
		i = 2,
		primes = [2];
		
	outerLoop:
	while (primes.length < n) {
		innerLoop:
		i++;
		for (j = 0; j < primes.length; j++) {
			if (i % primes[j] == 0) {
				continue outerLoop;
			}
			if (Math.sqrt(i) < primes[j]) {
				break;
			}
		}
		primes.push(i);
	}
	console.log("The " + n + " prime is " + primes[primes.length - 1]);
	document.getElementById("answer7").innerHTML = primes[primes.length - 1];
	console.log("Time Elapsed for problem 7: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function largestProduct () {
	var startTime = (new Date()).getTime(),
		largestProduct = 0,
		answerArray = [],
		n = document.forms.solve.num8.value ? document.forms.solve.num8.value : "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

	nArray = n.split('');

	for (var i = 0; i < nArray.length; i++) {
		var tempProduct = 1;
		for (var j = 0; j < 5; j++){
			tempProduct *= nArray[i+j];
		}
		if (tempProduct > largestProduct) {
			largestProduct = tempProduct;
			answerArray.push("The 5 numbers are " + nArray[i] + ", " + nArray[i + 1] + ", " + nArray[i + 2] + ", " + nArray[i + 3] + ", & " + nArray[i + 4] + ".");
		} 
	}
	console.log(answerArray[answerArray.length - 1])
	document.getElementById("answer8").innerHTML = largestProduct;
	console.log("Time Elapsed for problem 8: " + (((new Date()).getTime() - startTime)) + " milliseconds");
}

function checkPythagorean (a, b, c) {
	if (a * a + b * b == c * c) {
		return true;
	}
	return false
}

function findPythTriplet () {
	var startTime = (new Date()).getTime(),
		num = document.forms.solve.num9.value ? document.forms.solve.num9.value : 1000, 
		a = 1;
	outerLoop:
	for (var c = num / 2; c > 1; c--) {
		innerLoop:
		for (var b = num - c - 1; b > a; b--) {
			var a = num - c - b;
			if (checkPythagorean (a, b, c)) {
				console.log("The three numbers are " + a + " & " + b + " & " + c);
				break outerLoop;
			} 
		}
	}
	document.getElementById("answer9").innerHTML = a * b * c;
	console.log("Time Elapsed for problem 9: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function sumPrimes () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num10.value ? document.forms.solve.num10.value : 2000000,
		i = 2,
		sum = 2,
		primes = [2];
		
	outerLoop:
	while (i < n) {
		innerLoop:
		i++;
		for (j = 0; j < primes.length; j++) {
			if (i % primes[j] == 0) {
				continue outerLoop;
			}
			if (Math.sqrt(i) < primes[j]) {
				break;
			}
		}
		primes.push(i);
		sum += i;
	}
	console.log("The highest prime used was " + primes[primes.length - 1]);
	document.getElementById("answer10").innerHTML = sum;
	console.log("Time Elapsed for problem 10: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

var initialGrid = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08,49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00,81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65,52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91,22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80,24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50,32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70,67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21,24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72,21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95,78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92,16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57,86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58,19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40,04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66,88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69,04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36,20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16,20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54,01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48";

function greatestProductFromGrid () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num11.value ? document.forms.solve.num11.value : 4,
		tempAcrossProduct = 1,
		tempDownProduct = 1,
		tempDiagRightProduct = 1,
		tempDiagLeftProduct = 1,
		allProducts = [];
		initialArray = initialGrid.split(','),
		bigArray = [];

	for (var t = 0; t < initialArray.length; t++) {   // create the bigArray from the initialGrid
		bigArray.push(initialArray[t].split(' '));
	};
		
	for (var i = 0; i < initialArray.length; i++) {
		for (var j = 0; j < bigArray.length; j++) {
			var	tempAcrossProduct = 1,
				tempDownProduct = 1,
				tempDiagRightProduct = 1,
				tempDiagLeftProduct = 1;
				
			for (var k = 0; k < n; k++) {
				(j + k) < bigArray.length ? tempAcrossProduct *= bigArray[i][j + k] : tempAcrossProduct *= 1;
				(i + k) < initialArray.length ? tempDownProduct *= bigArray[i + k][j] : tempDownProduct *= 1;
				(i + k) < initialArray.length && (j + k) < initialArray.length ? tempDiagRightProduct *= bigArray[i + k][j + k] : tempDiagRightProduct *= 1;
				(i + k) < initialArray.length && (j - k) >= 0 ? tempDiagLeftProduct *= bigArray[i + k][j - k] : tempDiagLeftProduct *= 1;
			}
			allProducts.push(tempAcrossProduct);
			allProducts.push(tempDownProduct);
			allProducts.push(tempDiagRightProduct);
			allProducts.push(tempDiagLeftProduct);
		}
	}
	allProducts.sort (function(a, b) {return a - b});
	console.log("The greatest product of " + n + " adjacent numbers is " + allProducts[allProducts.length - 1]);
	document.getElementById("answer11").innerHTML = allProducts[allProducts.length - 1];
	console.log("Time Elapsed for problem 11: " + (((new Date()).getTime() - startTime) / 1000) + " seconds");
}

function findTriangleDivisible () {
	var startTime = (new Date()).getTime(),
		n = document.forms.solve.num12.value ? document.forms.solve.num12.value : 500,
		currentTriangle = 0,
		increaseTriangle = 1,
		factorCount = -1,
		headStart = (n > 36 ? 30 : 1);
	n > 319 ? headStart = 1260 : headStart += 0;
	while (factorCount < n) {
		currentTriangle += increaseTriangle;
		factorCount = 0;
		for (var i = 0; i < currentTriangle; i++) {
			currentTriangle % headStart == 0 ? currentTriangle += 0 : i += currentTriangle; //if the number is not divisible by 2, 3, & 5; don't bother checking any further
			currentTriangle % i == 0 ? factorCount += 1 : factorCount += 0; 
		}
		increaseTriangle++;
	}
	console.log("The first number with more than " + n + " factors is " + currentTriangle + " and it has " + (factorCount + 1) + " factors.");
	document.getElementById("answer12").innerHTML = currentTriangle;
	var endTime = ((new Date()).getTime() - startTime),
		endSecond = endTime % 60000,
		endMinute = (endTime - endSecond) / 60000;
	console.log("Time Elapsed for problem 12: " + endMinute + " minutes and " + endSecond / 1000 + " seconds");
}

function newCollatz (currentNumber) {
	var newNumber = currentNumber % 2 != 0 ? (3 * currentNumber) + 1 : currentNumber / 2;
	return newNumber  
}

function collatzLength (startingNumber) {
	var chainLength = 0,
		currentNumber = startingNumber;
	while (currentNumber > 1) {
		currentNumber = newCollatz(currentNumber);
		chainLength++;
	}
	return [startingNumber, chainLength];
}

function findLongestCollatz () {
	var startTime = (new Date()).getTime(),
		startingNumber = document.forms.solve.num14.value ? document.forms.solve.num14.value - 1 : 999999,
		longestCollatz = [1, 1];
	for (i = startingNumber; i > 1; i--) {
		var currentCollatz = collatzLength(i);
		currentCollatz[1] > longestCollatz[1] ? longestCollatz = currentCollatz : longestCollatz = longestCollatz;
	}
	console.log("The longest Collatz chain of any number below " + (startingNumber + 1) + " has " + longestCollatz[1] + " terms, and it starts with " + longestCollatz[0]);
	document.getElementById("answer14").innerHTML = longestCollatz[0];
	console.log("Time Elapsed for problem 14: " + (((new Date()).getTime() - startTime) / 1000) + " seconds.");
}

function powerDigitSum () {
	var startTime = (new Date()).getTime(),
		twoPower = document.forms.solve.num16.value ? document.forms.solve.num16.value : 1000
		twoPowerThousand = twoPower < 70 ? Math.pow(2, twoPower) : "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376",
		bigArray = [],
		tempSum = 0;
	twoPowerThousand += '';
	bigArray = twoPowerThousand.split('');
	for (var i = 0; i < bigArray.length; i++) {
		tempSum += parseFloat(bigArray[i]);
	}
	console.log("The sum of all the digits in 2 to the 1000 power is 1366");
	document.getElementById("answer16").innerHTML = tempSum;
	console.log("Time Elapsed for problem 16: " + (((new Date()).getTime() - startTime) / 1000) + " seconds.");
}

function hundredFactorialSum () {
	var startTime = (new Date()).getTime(),
		hundredFactorial = '93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000',
		factorial = document.forms.solve.num20.value ? document.forms.solve.num20.value : hundredFactorial,
		bigArray = factorial.split('');
	for (var j = 0; j < bigArray.length; j++) {
		tempSum += parseFloat(bigArray[j])
	}
}
