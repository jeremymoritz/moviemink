function problem2 (num) {
	var sum = 0,
		j = 1;
		k = 0;
	while (k <= num && j <= num) {
		j += k;
		k += j;
		if (j % 2 == 0) {
			sum += j
		} else {
			if (k % 2 == 0) {
				sum += k
			}
		}
	}
	return sum;
}