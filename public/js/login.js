
//For book list page, make nav bar fade when user scrolls down.

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        $("#navbarTop").fadeOut();
    }
    else {
        $("#navbarTop").fadeIn();
    }
},false);

typeout('.typeout', ['If someone is interested in buying your item, we will send you an email. ', 'You can meet up and complete the transaction yourself.', 'No credit card needed. No strings attached'], {
  callback: function(el) {
    el.innerHTML += ".";
  }
});




