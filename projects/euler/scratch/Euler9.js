function checkPythagorean (a, b, c) {
	if (a * a + b * b == c * c) {
		return true;
	}
	return false
}

function findPythTriplet (num) {
	var k = 1;
	for (var i = num / 2; i > 1; i--) {
		for (var j = num - i - 1; j > k; j--) {
			var k = num - i - j;
			if (checkPythagorean (k, j, i)) {
				console.log(k * j * i);
			} 
		}
	}
}
