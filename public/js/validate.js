 
// var $username = $("#emailForm");
// var $password = $("#passForm");
// var $usernameWarning = $("#emailError");
// var $passwordWarning = $("#passwordError");

// $usernameWarning.hide();
// $passwordWarning.hide();

// function isUsernameValid(){
// 	return $username.val().length > 4;
// }

// function isPasswordValid(){
// 	return $password.val().length > 6;
// }

// function userNameEvent(){
// 	if(isUsernameValid()){
// 		$usernameWarning.hide();
// 	}
// 	else{
// 		$usernameWarning.show();
// 	}
// }

// function passwordEvent(){
// 	if(isPasswordValid()){
// 		return $passwordWarning.hide();
// 	}
// 	else{
// 		return $passwordWarning.show();
// 	}

// }

// function canSubmit(){
// 	return isUsernameValid() && isPasswordValid();
// }

// function enableSubmit(){
// 	$("btnlogin").prop("disabled", !canSubmit());
// }

// $password.focus(passwordEvent).keyup(passwordEvent).keyup(userNameEvent).keyup(enableSubmit);
// $username.focus(userNameEvent).keyup(userNameEvent).keyup(passwordEvent).keyup(enableSubmit);

// var $signUp = $("#signup");
// var $login = $("#login")
// var $signupbutton = $("#signupbutton");
// var $loginbutton = $("#loginbutton");
// var $emailPrompt = $("#emailPrompt");
// var $passwordPrompt = $("#passwordPrompt");
// var $numberPrompt = $("#numberPrompt");
// var $emailForm = $("#emailForm");
// var $passwordForm = $("#passwordForm");
// var $numberForm = $("#lastSignUp");

//Dont hide this anymore
//$signUp.hide();

$("#validEmail").hide();
$("#validPassword").hide();
$("#validNumber").hide();

$("#emailForm2").focus(function(){
	$("#validPassword").hide();
	$("#validNumber").hide();
	$("#validEmail").fadeIn("slow");
}).keyup(function(){
	$(this).css("border-color", "red");
	var val = $(this).val();
	if(val.includes('richmond.edu')){
		$(this).css("border-color", "green");
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
} else {
    // Invalid phone number
}
});



// $numberForm.focus(function(){
// 	$numberPrompt.show();
// 	$numberPrompt.siblings("div").hide();
// });

// $passwordForm.focus(function(){
// 	$passwordPrompt.show();
// 	$passwordPrompt.siblings("div").hide();
// });






