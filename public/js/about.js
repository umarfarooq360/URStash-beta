window.addEventListener("scroll", function() {
    if (window.scrollY > 70) {
        $("#navbarTop").fadeOut();
    }
    else {
        $("#navbarTop").fadeIn();
    }
},false);