function findPrime (num) {
	var i = 2,
		primes = [2];
	outerLoop:
	while (primes.length < num) {
		innerLoop:
		for (j = 2; j < i; j++) {
			if (i % j > 0) {
				continue outerLoop;
			}
			primes.push(i);
		}
	}
	console.log(primes[primes.length - 1])
}
