    var i = 0;
    $("div.overout").mouseover(function(){
      $("p:first",this).text("mouse over");
      $("p:last",this).text(++i);
    }).mouseout(function(){
      $("p:first",this).text("mouse out");
    });
 
    var n = 0;
    $("div.enterleave").mouseenter(function(){
      $("p:first",this).text("mouse enter");
      $("p:last",this).text(++n);
    }).mouseleave(function(){
      $("p:first",this).text("mouse leave");
    });
    
$('.nav-home, .nav-about').on({
    mouseenter: function() {
        var cls = $(this).attr('class').split('-')[1];
        var id = '#dropdown-' + cls;
        $('.dropdown-menu').hide();
        $(id).show();
    },
    mouseout: function() {
        $('.dropdown-menu').hide();
    }
});


$(document).ready(function(){
	
	$("ul.topnav li span").mouseenter(function() { //When trigger is clicked...
		
		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

		$(this).parent().hover(function() {
		}, function(){	
			$(this).parent().find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() { 
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});

});