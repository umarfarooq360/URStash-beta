

$("#validEmail").hide();
$("#validPassword").hide();
$("#validNumber").hide();
$("#btnsignup").prop('disabled', true);
$("#btnlogin").prop('disabled', true);

//check to see if everything is good on sign up form
var check1 = false;
var check2 = false;
var check3 = false;

//check to see if everything is good on login form
var logincheck1 = false;
var logincheck2 = false;

//login validation

$("#emailForm").focus(function(){
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val().toLowerCase();
	if(val.indexOf("richmond.edu") > -1){
		$(this).css("border-color", "green");
		logincheck1 = true;
		logincheck();
	}
});

$("#passForm").focus(function(){
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val();
	if(val.length >= 6){
		$(this).css("border-color", "green");
		logincheck2 = true;
		logincheck();
	}
});

function logincheck(){
	if(logincheck1 && logincheck2){
		$("#btnlogin").prop('disabled', false);
	}
}

//signup validation


$("#emailForm2").focus(function(){
	$("#validPassword").hide();
	$("#validNumber").hide();
	$("#validEmail").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val().toLowerCase();
	if(val.indexOf("richmond.edu") > -1){
		$(this).css("border-color", "green");
		check1 = true;
		check();
	}
});

$("#passwordForm").focus(function(){
	$("#validEmail").hide();
	$("#validNumber").hide();
	$("#validPassword").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val();
	if(val.length >= 6){
		$(this).css("border-color", "green");
		check2 = true;
		check();
	}
});



$("#lastSignUp").focus(function(){
	$("#validEmail").hide();
	$("#validPassword").hide();
	$("#validNumber").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val();
	var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
if (phoneRegex.test(val)) {
   $(this).css("border-color", "green");
   check3 = true;
   check();
} else {
    // Invalid phone number
}
});

function check(){
	if(check1 && check2 && check3){
		$("#btnsignup").prop('disabled', false);
	}
}


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

