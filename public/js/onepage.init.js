//Initialize the one page scroll
$(document).ready(function() {
	$('#hideThis').hide(); //hides the two inputs

	//Adds functionality to the seach popup search
    $('.booksbutton').click( function(){
        $("#radio-book").prop("checked", true)
        $('form#formSearch').submit();
    });

    $('.otherbutton').click( function(){
        $("#radio-electronics").prop("checked", true)
        $('form#formSearch').submit();
    });

    $('#fullpage').fullpage({
    	scrollBar: true,
    	autoScrolling:false
	});
});