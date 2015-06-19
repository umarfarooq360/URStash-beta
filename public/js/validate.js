$(document).ready(function() {
    $('#fullpage').fullpage({
    	anchors: ['search', 'about','team'],
    });
});

 
var $username = $("#emailForm");
var $password = $("#passForm");
var $usernameWarning = $("#emailError");
var $passwordWarning = $("#passwordError");

$usernameWarning.hide();
$passwordWarning.hide();

function isUsernameValid(){
	return $username.val().length > 4;
}

function isPasswordValid(){
	return $password.val().length > 6;
}

function userNameEvent(){
	if(isUsernameValid()){
		$usernameWarning.hide();
	}
	else{
		$usernameWarning.show();
	}
}

function passwordEvent(){
	if(isPasswordValid()){
		return $passwordWarning.hide();
	}
	else{
		return $passwordWarning.show();
	}

}

function canSubmit(){
	return isUsernameValid() && isPasswordValid();
}

function enableSubmit(){
	$("btnlogin").prop("disabled", !canSubmit());
}

$password.focus(passwordEvent).keyup(passwordEvent).keyup(userNameEvent).keyup(enableSubmit);
$username.focus(userNameEvent).keyup(userNameEvent).keyup(passwordEvent).keyup(enableSubmit);

var $signUp = $("#signup");
var $login = $("#login")
var $signupbutton = $("#signupbutton");
var $loginbutton = $("#loginbutton");
var $emailPrompt = $("#emailPrompt");
var $passwordPrompt = $("#passwordPrompt");
var $numberPrompt = $("#numberPrompt");
var $emailForm = $("#emailForm");
var $passwordForm = $("#passwordForm");
var $numberForm = $("#lastSignUp");

//Dont hide this anymore
//$signUp.hide();

$emailForm.focus(function(){
	$emailPrompt.show();
	$emailPrompt.siblings("div").hide();
});

$numberForm.focus(function(){
	$numberPrompt.show();
	$numberPrompt.siblings("div").hide();
});

$passwordForm.focus(function(){
	$passwordPrompt.show();
	$passwordPrompt.siblings("div").hide();
});

//things to correct here: 1) Slidetoggle makes forms disappear when clicked again
						//2) Animation effects, implement some cool shit here with animate function

//Changed to use slides of fullPage scroll 
$signupbutton.on('click', function(){
	$.fn.fullpage.moveSlideRight();
});

$loginbutton.on('click', function(){
	$.fn.fullpage.moveSlideRight();
});

enableSubmit();




