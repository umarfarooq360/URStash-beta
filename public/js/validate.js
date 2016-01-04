

$("#validEmail").hide();
$("#validPassword").hide();
$("#validNumber").hide();

//IMPORTANT!
$("#btnsignup").prop('disabled', true); //disable sign up button until all checks are passed for info entered.

//$("#btnlogin").prop('enabled', true);

//check to see if everything is good on sign up form
var check1 = false;
var check2 = false;
var check3 = false;
var check4 = false; //check if user has agreed to terms and conditions of service.

//check to see if everything is good on login form
var logincheck1 = false;
var logincheck2 = false;

//login validation

$("#pleaseuse").hide();
$("#forgotpassword").hide();

$("#emailForm").focus(function(){
}).keyup(function(){
	$("#forgotpassword").hide();
	$("#pleaseuse").fadeIn();

	$(this).css("border-color", "red");

	var val = $(this).val().toLowerCase();
	if(val.indexOf('richmond.edu') > -1){
		$(this).css("border-color", "green");
		logincheck1 = true;
		logincheck();
	}
	else if(val.length == 0){
		$(this).css("border-color", "blue");
	}
	else{
		logincheck1 = false;
	}
});

$("#passForm").focus(function(){
}).keyup(function(){

	$("#pleaseuse").hide();
	$("#forgotpassword").fadeIn();
	$(this).css("border-color", "red");

	var val = $(this).val();
	if(val.length >= 4){
		$(this).css("border-color", "green");
		logincheck2 = true;
		logincheck();
	}
	else if(val.length == 0){
		$(this).css("border-color", "blue");
	}
	else{
		logincheck2 = false;
	}
});

//enable login button if loginchecks pass
function enableLoginButton(){
	if(logincheck1 && logincheck2){
		$("#btnlogin").prop('disabled', false);
	}
}

$("#signup-div").hide();

$("#signupbutton").click(function(){	
	$("#login-div").fadeOut();
	$("#signup-div").fadeIn();
});

$("#loginbutton").click(function(){
	$("#signup-div").fadeOut();
	$("#login-div").fadeIn();
});

//signup validation

$("#yougood").hide();

$("#emailForm2").focus(function(){
	$("#validPassword").hide();
	$("#validNumber").hide();
	$("#validEmail").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val().toLowerCase();

	//make sure that only users with a valid richmond.edu address can sign up 
	//avoid conflicts from people off campus from adding items.

	if(val.indexOf('richmond.edu') > -1){
		$(this).css("border-color", "green");
		check1 = true;
		check();
	}
	else if(val.length == 0){
		$(this).css("border-color", "blue");
	}
	else{
		check1 = false;
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
	else if(val.length == 0){
		$(this).css("border-color", "blue");
	}
	else{
		check2 = false;
	}
});

$("#lastSignUp").focus(function(){
	$("#validEmail").hide();
	$("#validPassword").hide();
	$("#validNumber").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");

	//validate the phone number entered. Must not contain any illegal characters or characters that are not numbers.
	var val = $(this).val();
	var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (phoneRegex.test(val)) {
	   $(this).css("border-color", "green");
	   check3 = true;
	   check();
	} else if(val.length == 0) {
	    $(this).css("border-color", "blue");
	}
});

$('#radio1').click(function() {
   if($('#radio1').is(':checked')) {
   	check4 = true;
   	check();
   }
});


//if all the checks pass then give user a message letting them know!
//enable sign up button if all checks pass.

function check(){

	var firstNameLength = $("#firstSignUp").val().length;
	var lastNameLength = $("#lastName").val().length;

	//if user has checked radio button agreeing to terms and conditions of service
	//pass check4
	

	if(firstNameLength > 2 && lastNameLength > 2){
		if(check1 && check2 && check3 && check4){
			$("#yougood").fadeIn(); //give user message
			$("#btnsignup").prop('disabled', false); //enable sign up button if all checks pass.
		}
		else{
			$("#yougood").fadeOut();
		}
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

