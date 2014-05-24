function newCollatz (currentNumber) {
	var newNumber = currentNumber % 2 != 0 ? (3 * currentNumber) + 1 : currentNumber / 2;
	return newNumber  
}

function chainLength (startingNumber) {
	var chainLength = 0,
		currentNumber = startingNumber;
	while (currentNumber > 1) {
		currentNumber = newCollatz(currentNumber);
		chainLength++;
	}
	return [startingNumber, chainLength];
}

function findLongestCollatz (startingNumber) {
	var longestCollatz = [1, 1];
	for (i = startingNumber; i > 1; i--) {
		var currentCollatz = chainLength(i);
		currentCollatz[1] > longestCollatz[1] ? longestCollatz = currentCollatz : longestCollatz = longestCollatz;
	}
	console.log(longestCollatz);
}

findLongestCollatz(999999);
