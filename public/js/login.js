
//For book list page, make nav bar fade when user scrolls down.

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        $("#navbarTop").fadeOut();
    }
    else {
        $("#navbarTop").fadeIn();
    }
},false);

typeout('.typeout', ['If someone wants to buy your listed item, we will send you an email. ', 'Meet up and complete the transaction yourself.', 'No credit card needed. No strings attached'], {
  callback: function(el) {
    el.innerHTML += ".";
  }
});




