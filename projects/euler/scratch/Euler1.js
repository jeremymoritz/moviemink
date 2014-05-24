function problem1 (num) {
	var sum = 0;
	for (var i = 1; i < num; i++) {
		sum += i % 3 ? (i % 5 ? 0 : i) : i;
	}
	return sum;
}

/* ********* First working draft **********
var t = [];
var v = 0;
for (var i = 1; i < 1000; i++) {
  if ( i % 3 == 0 || i % 5 == 0) {
    t.push(i);
  }
}
for (var key in t) {
  v = v + t[key];
}
t
v
*/