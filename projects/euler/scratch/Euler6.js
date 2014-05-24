function sumSquares (num) {
	var firstSum = 0,
		secondSum = 0;
	for (i = 1; i < num; i++) {
		firstSum += Math.pow(i, 2);
		secondSum += i;
	}
	console.log (Math.pow(secondSum, 2) - firstSum);
}
