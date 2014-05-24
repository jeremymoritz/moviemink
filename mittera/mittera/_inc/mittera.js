function specialEggs() {
	var textArea = document.createElement('textarea'),
		tempUl = document.createElement('ul'),
		tempLi1 = document.createElement('li'),
		tempLi2 = document.createElement('li'),
		tempImg = document.createElement('img');
	textArea.setAttribute('name','specialEggs');
	textArea.setAttribute('rows','4');
	textArea.setAttribute('placeholder','How would you like them prepared?');
	textArea.setAttribute('maxlength','200');
	tempLi1.appendChild(textArea);
	tempImg.setAttribute('src','_img/SpecialOrder.png');
	tempImg.setAttribute('id','specialEggs');
	tempLi2.appendChild(tempImg);
	tempUl.setAttribute('class','subOption');
	tempUl.appendChild(tempLi1).appendChild(tempLi2);
	
	$('#SpecialOrder').addClass('moreOptions');
	$('#SpecialOrder').parent().append(tempUl);		// add the new textArea to the DOM
}

//	Initialize JQuery on window load
$(function() {
    specialEggs();		// create extra textarea for special egg orders
    
    $('img').fadeTo(750, 0.33);		// fade imgs 
    
	$('#filledForm').ajaxForm(function() { 		// from a plug-in I use for submitting forms via ajax
    	$("#filledForm").html("<h3>Thank you for your continued support of Mittera!</h3><h4>A confirmation email has been sent to you.</h4>"); 
    });
    
    $("input").change(function() { 
	    $('img').each(function() {
	    	if ($(this).parent().parent().children().prop('checked')) {
	    		$(this).fadeTo('fast', 1);
	    	} else {
	    		$(this).fadeTo(750, 0.15);
	    	}
	    });
		$('.moreOptions').each(function() {
	    	var nextUl = $(this).nextAll("ul");
	    	var nextImg = $(this).nextAll("label").children("img");
	    	if($(this).is(':checked')) { 
	    		nextImg.hide();
	    		nextUl.slideDown('slow'); 
	    	} else {
	    		var quickCheck = nextUl.find('input[type=radio]:checked');
	    		if (quickCheck.length > 0) {
	    			nextImg.hide();
	    			return true;
	    		}
	    		nextUl.slideUp('slow', function() {	    		
	    			nextImg.fadeIn('slow');
	    		});
	    		nextUl.find('input[type=checkbox]:checked').removeAttr('checked');		// if someone doesn't want the selection, remove the varieties
	    	}    	
	    });
    	$('.subOption').each(function() {
    		var quickCheck = $(this).find('input[type=radio]:checked');
    		if (quickCheck.length > 0) {
    			return true;
    		}
	    	if (!$(this).parent().children().prop('checked')) {
	    		$(this).slideUp('slow', function() {
	    			$(this).parent().find('img').fadeIn('fast');
	    		});
	    	}
    	}); 
    	$('#specialEggs').stop(true,false).fadeTo('fast', 1);
    });
    
    $('img').hover(function() {
    	$(this).stop(true,false).fadeTo("fast", 1);
    } , function() { 
    	if (!$(this).parent().parent().children().prop('checked')) {
    		$(this).fadeTo(750, 0.15);
    	}
    });
});

function formValidate() {
	var formVal = document.getElementById('filledForm');
	if (formVal.name.value == "" || formVal.email.value == "") {
		alert("You must provide a name and email address")
		return false;
	}
	return true;
}