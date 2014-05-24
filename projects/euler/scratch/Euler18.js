var initialString = "75,95 64,17 47 82,18 35 87 10,20 04 82 47 65,19 01 23 75 03 34,88 02 77 73 07 63 67,99 65 04 28 06 16 70 92,41 41 26 56 83 40 80 70 33,41 48 72 33 47 32 37 16 94 29,53 71 44 65 25 43 91 52 97 51 14,70 11 33 28 77 73 17 78 39 68 17 57,91 71 52 38 17 14 91 43 58 50 27 29 48,63 66 04 68 89 53 67 30 73 16 69 87 40 31,04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";

var initialArray = initialString.split(','),
	bigArray = [],
	objectArray = [];

for (var t = 0; t < initialArray.length; t++) { // create all the gridRows turning them into Arrays
	bigArray.push(initialArray[t].split(' '));
};



function oldGreatestPathSum () {
	
	for (var triRow = 0; triRow < initialArray.length; triRow++) {
		
		for (var rowPos = 0; rowPos < bigArray[triRow].length; rowPos++) {
				
			for (var i = 0; i < bigArray[triRow].length; i++) {
				var tempObject1 = {};
				tempObject1.row = (triRow + 1);
				tempObject1.position = i;
				tempObject1.value = 0;
				tempObject1.daddy = bigArray[triRow][rowPos];
				objectArray.push(tempObject1);
				var tempObject2 = {};
				tempObject2.row = (triRow + 1);
				tempObject2.position = (i + 1);
				tempObject2.value = 0;
				tempObject2.daddy = bigArray[triRow][rowPos];
				objectArray.push(tempObject2);
			};
			objectArray[rowPos].value = bigArray[rowPos][objectArray[rowPos].position] + bigArray[triRow][objectArray[rowPos].row]
		}
		allProducts.sort (function(a, b) {return a - b});
		console.log(allProducts[allProducts.length - 1]);
	}
}


function creatingObjects () {
	for (var i = 0; i < 16384; i++) {
		var tempObject = {};
		tempObject.position = 0;
		tempObject.value = 0;
		objectArray.push(tempObject)
		newObjectbigArray[i][i]
	}
}
