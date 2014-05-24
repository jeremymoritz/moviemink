$('li').hover(function () {
	$(this).animate({ width: '+=50' }, 500);
}, function() {	
	$(this).animate({ width: '-=50' }, 500);
});

$('li').click(function () {
	var colorCheck = $(this).css('color');
	console.log(colorCheck); 
	if (colorCheck == 'rgb(153, 51, 255)') {
		$(this).css('color', '#3f9');
	} else {
		$(this).css('color', '#93f');
	}
});