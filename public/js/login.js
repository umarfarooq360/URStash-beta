/*
	Causes the slides to switch from login to signup and back
	when buttons are clicked
*/
$('#signupbutton').click(function(){
	$.fn.fullpage.moveSlideRight();
});

$('#loginbutton').click(function(){
	$.fn.fullpage.moveSlideLeft();
});

