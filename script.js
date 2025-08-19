document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  menuToggle.addEventListener('click', function() {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
      // Open menu animation (slides up from bottom)
      gsap.to(mobileMenu, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Close menu animation (slides down to bottom)
      gsap.to(mobileMenu, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  });

  // Close menu when clicking on a link
  const menuItems = mobileMenu.querySelectorAll('li');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      gsap.to(mobileMenu, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          menuOpen = false;
        }
      });
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (menuOpen && !mobileMenu.contains(event.target) && event.target !== menuToggle) {
      gsap.to(mobileMenu, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          menuOpen = false;
        }
      });
    }
  });
});



