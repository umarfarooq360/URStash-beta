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
	return $password.val().length > 4;
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

$signUp.hide();

//things to correct here: 1) Slidetoggle makes forms disappear when clicked again
						//2) Animation effects, implement some cool shit here with animate function

$signupbutton.on('click', function(){
	$login.hide();
	$signUp.slideToggle().css("top", "100%");
});

$loginbutton.on('click', function(){
	$signUp.hide();
	$login.slideToggle().css("top", "100%");
});

enableSubmit();



