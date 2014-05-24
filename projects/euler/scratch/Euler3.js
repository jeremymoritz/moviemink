function problem3 () {
	var n = document.forms['solve']['num3'].value ? document.forms['solve']['num3'].value : 600851475143,
		factors = [];
	for (var i = 2; i <= n; i++) {
		if (n % i == 0) {
			n = n / i;
			factors.push(i);
			i = 1;
		}
	}
	factors.sort;
	console.log(factors);
	document.getElementById('answer3').innerHTML = factors[factors.length - 1];
}

//more functions that didn't work
function checkPrime(x){
	for (var i = 2; i < x; i++) {
		if (x % i == 0){
			return false;
		}
	}
	return true;
}

function problem3 (num) {
	var factors = [],
		max = 1;
	dance:
	for (var i = 2; max <= num; i++) {
		if (num % i == 0) {
			for (var j = 0; j < factors.length; j++){
				if(i % factors[j] == 0){
					max = max * i / factors[j];
					continue dance;
				}
			}
			factors.push(i);
			max = max * i;
		}
	}
	console.log(factors);
}

// The problem with this function is that it only works on numbers with purely unique factors. When more than one factor is the same, such as 8, it doesn't work properly. So, it did give the right answer, coincidentally.
function problem (num) {
	primes = [];
	max = 1;
	for (var i = 1; max <= num; i++) {
		if (num % i == 0) {
			primes.push(i);
			max = max * i
		}
	}
	console.log(primes);
}
