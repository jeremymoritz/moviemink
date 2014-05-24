function findTriangleDivisible () {
	var currentTriangle = 0,
		increaseTriangle = 1,
		factorCount = 0;
	while (factorCount < 500) {
		factorCount = 0;
		currentTriangle += increaseTriangle;
		for (var i = 1; i < currentTriangle; i++) {
			currentTriangle % 6 == 0 ? currentTriangle += 0 : i += currentTriangle;
			currentTriangle % i == 0 ? factorCount += 1 : factorCount += 0; 
		}
		console.log(factorCount);
		increaseTriangle++;
	}
	console.log(currentTriangle);
}

function findQuickTriangleDivisible () {
	var currentTriangle = 0,
		increaseTriangle = 1;
	while (currentTriangle < 76588873) {
		console.log(currentTriangle);
		currentTriangle += increaseTriangle;
		increaseTriangle++;
	}
	console.log(increaseTriangle);
}
