// ====================== SCROLL TO TOP ============================
let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ====================== NAV TOGGLE (MOBILE) ============================
const mobile_nav_btn = document.querySelector(".mobile-nav-btn");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");

const toggleNavbar = () => {
  navList.classList.toggle("active-nav");
};
const closeNavbarOnClickOutside = (event) => {
  if (
    !navList.contains(event.target) &&
    !mobile_nav_btn.contains(event.target)
  ) {
    navList.classList.remove("active-nav");
  }
};
const deactivateNavbarOnResize = () => {
  navList.classList.remove("active-nav");
};
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active-nav");
  });
});
mobile_nav_btn.addEventListener("click", toggleNavbar);
document.addEventListener("click", closeNavbarOnClickOutside);
window.addEventListener("resize", deactivateNavbarOnResize);
window.addEventListener("load", () => {
  navList.classList.remove("active-nav");
});

// ====================== NAV ACTIVE LINK ============================
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var currentScroll = window.pageYOffset;
    var navLinks = document.querySelectorAll(".navbar .nav-list a");

    navLinks.forEach(function (link) {
      var sectionId = link.getAttribute("href").substring(1);
      var section = document.getElementById(sectionId);
      var sectionMiddle = section.offsetTop + section.offsetHeight / 2;

      if (
        sectionMiddle >= currentScroll &&
        section.offsetTop <= currentScroll + window.innerHeight / 2
      ) {
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});

// ====================== REVEAL ON SCROLL (Fade Up) ============================
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
