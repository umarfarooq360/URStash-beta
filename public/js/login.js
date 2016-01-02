
//For book list page, make nav bar fade when user scrolls down.

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        $("#navbarTop").fadeOut();
    }
    else {
        $("#navbarTop").fadeIn();
    }
},false);

/*
	Causes the slides to switch from login to signup and back
	when buttons are clicked
*/

// $('#signupbutton').click(function(){
// 	$.fn.fullpage.moveSlideRight();
// });

// $('#loginbutton').click(function(){
// 	$.fn.fullpage.moveSlideLeft();
// });

