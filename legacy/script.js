function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

///Test
document.addEventListener('DOMContentLoaded', function() {
  // Disable right-click
//  document.addEventListener('contextmenu', function(event) {
    //  event.preventDefault(); // Prevent default right-click behavior
 // });
  // Typed.js initialization
  var typed = new Typed(".section__text__p2", {
    strings: [
        "Fullstack Developer", 
        "Web Developer", 
        "Java Enthusiast", 
        "SpringBoot Specialist",
        "Problem Solver"
    ],
    typeSpeed: 150,
    backSpeed: 150,
    backDelay: 1500,
    loop: true
});  
});

// Check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Animate project cards when they come into view
document.addEventListener('scroll', function() {
  const projectCards = document.querySelectorAll('#projects .details-container');
  projectCards.forEach(card => {
    if (isInViewport(card)) {
      card.classList.add('visible');
    }
  });
});
