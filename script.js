// Add this before your animation code
gsap.registerPlugin(ScrollTrigger);
function navbarAnimations() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const close = document.getElementById("close");
  let menuOpen = false;

  gsap.set(mobileMenu, { y: "100%" }); // start hidden

  menuToggle.addEventListener("click", () => {
    if (!menuOpen) {
      gsap.to(mobileMenu, {
        y: 0,
        duration: 0.6,
        ease: "power4.out",
      });
      menuOpen = true;
    } else {
      gsap.to(mobileMenu, {
        y: "100%",
        duration: 0.6,
        ease: "power4.in",
      });
      menuOpen = false;
    }
  });
  close.addEventListener("click", () => {
    gsap.to(mobileMenu, {
      y: "100%",
      duration: 0.6,
      ease: "power4.in",
    });
    menuOpen = false;
  });
}
const section3Slider = [
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
  {
    img: "./images/s3/s3I1.png",
  },
  {
    img: "./images/s3/s3I2.png",
  },
];
function addSlidingImgs() {
  const sliderContainer = document.querySelector(".slider");

  section3Slider.forEach((imgSrc) => {
    const div = document.createElement("div");
    div.classList.add("sliderCard");

    const img = document.createElement("img");
    img.classList.add("sliderImage");
    img.src = imgSrc.img;

    div.appendChild(img);
    sliderContainer.appendChild(div);
  });
}

function heroSectionAnimations() {
  // Wait for the DOM to fully load
  document.addEventListener("DOMContentLoaded", function () {
    // Create a GSAP timeline
    const heroTl = gsap.timeline();

    // Animate the background position for a subtle parallax effect
    heroTl.fromTo(
      ".s1",
      {
        backgroundPosition: "0% 40%",
      },
      {
        backgroundPosition: "0% 20%",
        duration: 2,
        ease: "power2.out",
      }
    );

    // Animate the form section (if visible on desktop)
    if (window.innerWidth >= 768) {
      // md breakpoint
      heroTl.from(
        ".form",
        {
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=1.5"
      );

      // Stagger animation for form elements
      heroTl.from(
        ".form input, .form textarea, .form .hb, .form label",
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Special animation for the QR code image
      heroTl.from(
        ".form .img",
        {
          rotationY: -180,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.5)",
        },
        "-=1"
      );
    }

    // Animate the text panel with a typewriter effect
    const textElement = document.querySelector(".rght p");
    const originalText = textElement.textContent;

    // Clear the text for the typewriter effect
    textElement.textContent = "";

    // Create the typewriter effect
    heroTl.to(
      ".rght",
      {
        opacity: 1,
        duration: 0.5,
        onStart: function () {
          // Split text into words for a more natural typing effect
          const words = originalText.split(" ");
          let currentWord = 0;
          let currentChar = 0;
          let typing = "";

          const typeInterval = setInterval(() => {
            if (currentWord < words.length) {
              if (currentChar < words[currentWord].length) {
                typing += words[currentWord].charAt(currentChar);
                currentChar++;
                textElement.textContent = typing + " █";
              } else {
                typing += " ";
                currentChar = 0;
                currentWord++;
                textElement.textContent = typing + " █";
              }
            } else {
              clearInterval(typeInterval);
              textElement.textContent = originalText; // Remove cursor when done
            }
          }, 80);
        },
      },
      "-=0.5"
    );

    // Add a continuous subtle animation to the form to attract attention
    if (window.innerWidth >= 768) {
      heroTl.to(".form", {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Add scroll-triggered animations if user scrolls
    gsap.to(".s1", {
      scrollTrigger: {
        trigger: ".s1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      backgroundPosition: "0% 30%",
      ease: "none",
    });
  });
}
heroSectionAnimations();

function dekstopNavAnimations() {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Store the navbar element
    const navbar = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".links li");
    const ctaButton = document.querySelector(".cta button");
    const logo = document.querySelector(".logo img");

    // Initial animation when page loads
    function initNavbarAnimation() {
      // Create a timeline for the navbar animation
      const navTl = gsap.timeline();

      // Animate the logo - subtle fade and scale
      navTl.from(logo, {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
      });

      // Animate navigation links with staggered effect
      navTl.from(
        navLinks,
        {
          duration: 0.6,
          y: -20,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Animate the CTA button with a pop effect
      navTl.from(
        ctaButton,
        {
          duration: 0.7,
          scale: 0,
          rotation: 5,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.3"
      );
    }

    // Scroll-triggered animations
    function setupScrollAnimations() {
      // Hide navbar on scroll down, show on scroll up
      let lastScrollY = window.scrollY;

      ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
          if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
              // Scrolling down - hide navbar
              gsap.to(navbar, {
                y: -100,
                duration: 0.5,
                ease: "power2.inOut",
              });
            } else {
              // Scrolling up - show navbar
              gsap.to(navbar, {
                y: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
            }
            lastScrollY = window.scrollY;

            // Add shadow when scrolled
            navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          } else {
            // Remove shadow when at top
            navbar.style.boxShadow = "none";
          }
        },
      });

      // Link hover animations
      navLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -2,
            duration: 0.2,
            ease: "power1.out",
          });

          // Create a subtle shine effect
          gsap.to(link, {
            keyframes: [
              { color: "#d97706", duration: 0.2 }, // amber-600
              { color: "#000000", duration: 0.3 },
            ],
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      });

      // CTA button hover animation
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          keyframes: [
            { scale: 1.05, duration: 0.2 },
            { scale: 1, duration: 0.1 },
          ],
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
        });
      });

      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
        });
      });
    }

    // Active link indicator animation
    function setupActiveLinkIndicator() {
      // Create a floating indicator element
      const indicator = document.createElement("div");
      indicator.style.position = "absolute";
      indicator.style.width = "6px";
      indicator.style.height = "6px";
      indicator.style.backgroundColor = "#d97706"; // amber-600
      indicator.style.borderRadius = "50%";
      indicator.style.bottom = "-10px";
      indicator.style.opacity = "0";
      document.querySelector(".links ul").style.position = "relative";
      document.querySelector(".links ul").appendChild(indicator);

      navLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          const linkRect = link.getBoundingClientRect();
          const containerRect = document
            .querySelector(".links ul")
            .getBoundingClientRect();

          gsap.to(indicator, {
            left: linkRect.left - containerRect.left + linkRect.width / 2 - 3,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(indicator, {
            opacity: 0,
            duration: 0.2,
          });
        });
      });
    }

    // Initialize all animations
    initNavbarAnimation();
    // setupScrollAnimations();
    setupActiveLinkIndicator();

    // Mobile menu toggle animation (if needed)
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close");

    if (menuToggle && mobileMenu && closeMenu) {
      menuToggle.addEventListener("click", () => {
        gsap.to(mobileMenu, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      closeMenu.addEventListener("click", () => {
        gsap.to(mobileMenu, {
          y: "100%",
          duration: 0.4,
          ease: "power2.in",
        });
      });
    }
  });
}
dekstopNavAnimations();

function hiddenFormAnimation() {
  // Register ScrollTrigger plugin

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Only apply animations for mobile devices
    if (window.innerWidth < 768) {
      // Set initial state for all form elements
      gsap.set(".form", { opacity: 0, y: 50 });
      gsap.set(".form .img", { opacity: 0, scale: 0.8 });
      gsap.set(".form .mb-4 p", { opacity: 0, y: -20 });
      gsap.set(".form input, .form textarea", { opacity: 0, y: 20 });
      gsap.set(".form label", { opacity: 0, x: -20 });
      gsap.set(".form button", { opacity: 0, scale: 0.9 });

      // Create the main animation timeline
      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".form",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          markers: false, // Set to true for debugging
        },
      });

      // Animate the form container
      formTl.to(".form", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate the QR code image with a subtle bounce
      formTl.to(
        ".form .img",
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Animate the heading
      formTl.to(
        ".form .mb-4 p",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Stagger animation for form inputs
      formTl.to(
        ".form input, .form textarea",
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Animate the checkbox and label
      formTl.to(
        ".form label",
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Animate the submit button with emphasis
      formTl.to(
        ".form button",
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.75)",
        },
        "-=0.2"
      );

      // Add interactive animations on focus
      const formInputs = document.querySelectorAll(
        ".form input, .form textarea"
      );

      formInputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        });
      });

      // Add button hover animation
      const submitButton = document.querySelector(".form button");

      submitButton.addEventListener("mouseenter", () => {
        gsap.to(submitButton, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      submitButton.addEventListener("mouseleave", () => {
        gsap.to(submitButton, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      // Add a continuous subtle floating animation to the form
      gsap.to(".form", {
        y: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }
  });
}
hiddenFormAnimation();

function section2Animations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Section 2 scroll animations
    const section2 = document.querySelector(".s2");
    const heading = document.querySelector(".s2 .tp h1");
    const paragraph = document.querySelector(".s2 .tp p");
    const button = document.querySelector(".s2 .tp button");
    const videoContainer = document.querySelector(".s2 .btm");
    const video = document.querySelector(".s2 .btm video");
    const playButton = document.getElementById("playVideoBTN");

    // Set initial states for animation
    gsap.set([heading, paragraph, button], {
      opacity: 0,
      y: 50,
    });

    gsap.set(videoContainer, {
      opacity: 0,
      scale: 0.9,
    });

    // Create timeline with scroll trigger for section 2
    const section2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".s2",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false, // Set to true for debugging
      },
    });

    // Animate heading
    section2Tl.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate paragraph
    section2Tl.to(
      paragraph,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animate button
    section2Tl.to(
      button,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    // Animate video container
    section2Tl.to(
      videoContainer,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Add continuous subtle animation to video container
    section2Tl.to(
      videoContainer,
      {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
      "-=0.5"
    );

    // Add hover effect to video container
    videoContainer.addEventListener("mouseenter", () => {
      gsap.to(videoContainer, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    videoContainer.addEventListener("mouseleave", () => {
      gsap.to(videoContainer, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Add hover effect to button
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    // Video play functionality
    let isVideoExpanded = false;
    let originalPosition = {};

    // Store original position and size
    function storeOriginalPosition() {
      const rect = videoContainer.getBoundingClientRect();
      originalPosition = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    }

    // Play button click event
    playButton.addEventListener("click", function (e) {
      e.stopPropagation();

      if (!isVideoExpanded) {
        // Store original position
        storeOriginalPosition();

        // Expand video to full screen
        gsap.to(videoContainer, {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 100,
          borderRadius: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: function () {
            isVideoExpanded = true;
            video.play();
            playButton.style.display = "none";
          },
        });
      }
    });

    // Click anywhere to close expanded video
    document.addEventListener("click", function (e) {
      if (isVideoExpanded && !videoContainer.contains(e.target)) {
        // Return video to original position
        gsap.to(videoContainer, {
          position: "relative",
          top: 0,
          left: 0,
          width: originalPosition.width + "px",
          height: originalPosition.height + "px",
          zIndex: "auto",
          borderRadius: "48px",
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: function () {
            isVideoExpanded = false;
            video.pause();
            video.currentTime = 0;
            playButton.style.display = "block";
          },
        });
      }
    });

    // Also close with Escape key
    window.addEventListener("click", function (e) {
      if (e && isVideoExpanded) {
        // Return video to original position
        gsap.to(videoContainer, {
          position: "relative",
          top: 0,
          left: 0,
          width: originalPosition.width + "px",
          height: originalPosition.height + "px",
          zIndex: "auto",
          borderRadius: "48px",
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: function () {
            isVideoExpanded = false;
            video.pause();
            video.currentTime = 0;
            playButton.style.display = "block";
          },
        });
      }
    });

    // Handle window resize to update original position
    window.addEventListener("resize", function () {
      if (!isVideoExpanded) {
        storeOriginalPosition();
      }
    });

    // Initialize
    storeOriginalPosition();
  });
}
section2Animations();
// alert(section3Slider.length)
function section3Animations() {
  const slider = document.querySelectorAll(".sliderCard");
  const totalSlides = section3Slider.length;

  gsap.to(slider, {
    x: `-${(totalSlides - 1) * 100}%`,
    scrollTrigger: {
      trigger: ".s3",
      scroller: "body",
      start: "-10%",
      end: `+=${totalSlides * 10}%`,
      pin: true,
      scrub: 3,
    },
  });
}

function section3TxtAnimations() {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Section 3 animations
    const section3 = document.querySelector(".s3");
    const leftTextDiv = document.querySelector(".s3 > div > div:first-child");
    const heading = document.querySelector(".s3 .playfair-font");
    const paragraph = document.querySelector(".s3 p");
    const button = document.querySelector(".s3 button");

    // Set initial states for animation
    gsap.set([heading, paragraph, button], {
      opacity: 0,
      y: 50,
    });

    gsap.set(leftTextDiv, {
      x: -100,
      opacity: 0,
    });

    // Create timeline with scroll trigger for section 3
    const section3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".s3",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false, // Set to true for debugging
      },
    });

    // Animate the entire left text div sliding in from left
    section3Tl.to(leftTextDiv, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    // Animate heading with a slight delay
    section3Tl.to(
      heading,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
      },
      "-=0.8"
    );

    // Animate paragraph with word-by-word reveal effect
    const text = paragraph.textContent;
    paragraph.textContent = "";

    section3Tl.to(
      paragraph,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onStart: function () {
          // Split text into words
          const words = text.split(" ");
          let currentWord = 0;

          // Function to add words one by one
          function addWord() {
            if (currentWord < words.length) {
              paragraph.textContent += words[currentWord] + " ";
              currentWord++;
              setTimeout(addWord, 40); // Adjust speed here
            }
          }

          // Start adding words
          addWord();
        },
      },
      "-=0.5"
    );

    // Animate button with emphasis
    section3Tl.to(
      button,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scale: 1.1,
        ease: "elastic.out(1, 0.75)",
        onComplete: function () {
          // Return to normal scale after animation
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      },
      "-=0.3"
    );

    // Add continuous subtle animation to the button
    section3Tl.to(
      button,
      {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
      "+=0.5"
    );

    // Add hover effect to button
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    // Add a subtle background color animation on scroll
    ScrollTrigger.create({
      trigger: ".s3",
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => {
        gsap.to(".s3", {
          backgroundColor: "#3a3a3a",
          duration: 1,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(".s3", {
          backgroundColor: "#2F2F2F",
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  });
}
section3TxtAnimations();

document.addEventListener("DOMContentLoaded", function () {
  navbarAnimations();
  addSlidingImgs();
  section3Animations();
});

function section4Animations() {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Section animations
    const section = document.querySelector(".s4");
    const leftCards = document.querySelectorAll(".cards");
    const centerImage = document.querySelector("img");
    const rightContent = document.querySelectorAll(".cards, .listCard");

    // Set initial states for animation
    gsap.set(leftCards, {
      opacity: 0,
      x: -50,
    });

    gsap.set(centerImage, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.set(rightContent, {
      opacity: 0,
      x: 50,
    });

    // Create timeline with scroll trigger for the section
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".s4",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    // Animate left cards with stagger effect
    sectionTl.to(leftCards, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate center image
    sectionTl.to(
      centerImage,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Animate right content with stagger
    sectionTl.to(
      rightContent,
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Add continuous subtle animations
    sectionTl.to(
      leftCards,
      {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "sine.inOut",
      },
      "+=0.5"
    );

    // Magnifying glass cursor effect
    const magnifierCursor = document.createElement("div");
    magnifierCursor.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        border: 2px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(4px);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    `;
    magnifierCursor.innerHTML = "🔍";
    document.body.appendChild(magnifierCursor);

    // Track mouse movement
    document.addEventListener("mousemove", function (e) {
      gsap.to(magnifierCursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    });

    // Text elements to apply magnifier effect
    const textElements = document.querySelectorAll(
      ".s4 h2, .s4 p, .s4 h1, .s4 button"
    );

    textElements.forEach((element) => {
      // Show magnifier when hovering over text
      element.addEventListener("mouseenter", function (e) {
        gsap.to(magnifierCursor, {
          opacity: 1,
          duration: 0.3,
        });

        // Scale up text on hover
        gsap.to(element, {
          scale: 1.05,
          color: "#000",
          fontWeight: "600",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Hide magnifier when leaving text
      element.addEventListener("mouseleave", function (e) {
        gsap.to(magnifierCursor, {
          opacity: 0,
          duration: 0.3,
        });

        // Return text to normal state
        gsap.to(element, {
          scale: 1,
          color: "",
          fontWeight: "",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Additional effect on click
      element.addEventListener("click", function (e) {
        gsap.to(element, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          duration: 0.2,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", function () {
        gsap.to(button, {
          scale: 1,
          boxShadow: "none",
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });

    // Add subtle animation to the center image on hover
    centerImage.addEventListener("mouseenter", function () {
      gsap.to(centerImage, {
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    centerImage.addEventListener("mouseleave", function () {
      gsap.to(centerImage, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}
section4Animations();

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Section 5 animations
  const section5 = document.querySelector(".s5");
  const leftContent = document.querySelector(".s5 > div > div:first-child");
  const heading = document.querySelector(".s5 h1");
  const paragraph = document.querySelector(".s5 p");
  const listItems = document.querySelectorAll(".s5 .listCard1");
  const rightImage = document.querySelector(".s5 img");

  // Reset styles to ensure proper animation
  gsap.set(section5, { opacity: 1 });

  // Set initial states for animation
  gsap.set([heading, paragraph], {
    opacity: 0,
    y: 80,
  });

  gsap.set(listItems, {
    opacity: 0,
    x: -100,
    rotation: -5,
  });

  gsap.set(rightImage, {
    opacity: 0,
    scale: 1.2,
    x: 100,
  });

  // Create a master timeline for section 5
  const section5Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".s5",
      start: "top 85%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      markers: false,
    },
  });

  // Animate the heading with a dramatic effect
  section5Tl.to(heading, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.8)",
    onStart: () => {
      // Split text into characters for a typing effect
      const text = heading.textContent;
      heading.textContent = "";

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          heading.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);
    },
  });

  // Animate the paragraph with a word-by-word reveal
  section5Tl.to(
    paragraph,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      onStart: () => {
        const text = paragraph.textContent;
        paragraph.textContent = "";

        const words = text.split(" ");
        let currentWord = 0;

        function addWord() {
          if (currentWord < words.length) {
            paragraph.textContent += words[currentWord] + " ";
            currentWord++;
            setTimeout(addWord, 60);
          }
        }

        addWord();
      },
    },
    "-=0.7"
  );

  // Animate list items with a staggered effect
  // Animate list items with a staggered effect
  section5Tl.to(
    listItems,
    {
      opacity: 1,
      x: 0,
      rotation: 0,
      stagger: 0.3,
      duration: 0.9,
      ease: "back.out(1.7)",
      onStart: () => {
        // Add animation to the icons for each list item
        listItems.forEach((item, index) => {
          const iconContainer = item.querySelector("div");
          const icon = item.querySelector("img");

          // Set initial state for icons
          gsap.set(iconContainer, {
            rotation: -180,
            scale: 0,
          });

          gsap.set(icon, {
            rotation: 180,
            scale: 0,
          });

          // Animate icons with a delay based on their index
          // This ensures each icon animates with its parent list item
          gsap.to(iconContainer, {
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.8)",
            delay: index * 0.3 + 0.2, // Stagger the icons with their list items
          });

          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.3 + 0.2, // Stagger the icons with their list items
          });
        });
      },
    },
    "-=0.5"
  );
  // Animate the right image with a parallax effect
  section5Tl.to(
    rightImage,
    {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.out",
      onStart: () => {
        // Add a continuous floating effect to the image
        gsap.to(rightImage, {
          y: 20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    },
    "-=0.7"
  );

  // Add a background color animation to the section
  section5Tl.to(
    section5,
    {
      backgroundColor: "rgba(248, 244, 244, 0.5)",
      duration: 2,
      ease: "power1.out",
    },
    "-=1.5"
  );

  // Add interactive hover effects to list items
  listItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        y: -10,
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
        color: "#2c5282",
        fontWeight: "500",
      });

      const iconContainer = item.querySelector("div");
      gsap.to(iconContainer, {
        backgroundColor: "#2c5282",
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = item.querySelector("img");
      gsap.to(icon, {
        filter: "invert(1) brightness(2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        color: "#000000",
        fontWeight: "400",
      });

      const iconContainer = item.querySelector("div");
      gsap.to(iconContainer, {
        backgroundColor: "#F8F4F4",
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = item.querySelector("img");
      gsap.to(icon, {
        filter: "invert(0) brightness(1)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Add a scroll-triggered parallax effect to the background
  ScrollTrigger.create({
    trigger: ".s5",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const speed = 0.5;
      const movement = -(self.progress * speed * 100);
      gsap.to(leftContent, {
        y: movement,
        duration: 0.1,
      });
    },
  });

  // Add a pulse animation to the section when in view
  ScrollTrigger.create({
    trigger: ".s5",
    start: "top 80%",
    end: "top 50%",
    onEnter: () => {
      gsap.to(section5, {
        scale: 1.005,
        duration: 0.8,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    },
  });
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Section 6 animations
  const section6 = document.querySelector(".s6");
  const headingContainer = document.querySelector(
    ".s6 > div > div:first-child"
  );
  const heading = document.querySelector(".s6 h1");
  const subheading = document.querySelector(".s6 > div > div:first-child p");
  const cards = document.querySelectorAll(".s6Card1");

  // Set initial states for animation
  gsap.set([heading, subheading], {
    opacity: 0,
    y: 50,
  });

  gsap.set(cards, {
    opacity: 0,
    y: 100,
  });

  // Create a master timeline for section 6
  const section6Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".s6",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      markers: false,
    },
  });

  // Animate the heading with a dramatic effect
  section6Tl.to(heading, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.8)",
    onStart: () => {
      // Split text into characters for a typing effect
      const text = heading.textContent;
      heading.textContent = "";

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          heading.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 70);
    },
  });

  // Animate the subheading with a word-by-word reveal
  section6Tl.to(
    subheading,
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      onStart: () => {
        const text = subheading.textContent;
        subheading.textContent = "";

        const words = text.split(" ");
        let currentWord = 0;

        function addWord() {
          if (currentWord < words.length) {
            subheading.textContent += words[currentWord] + " ";
            currentWord++;
            setTimeout(addWord, 80);
          }
        }

        addWord();
      },
    },
    "-=0.8"
  );

  // Animate cards with a staggered effect
  cards.forEach((card, index) => {
    const image = card.querySelector(".imgS");
    const content = card.querySelector(".w-full.lg\\:w-\\[50\\%\\].p-4");
    const button = card.querySelector(".imgS button");
    const readMoreBtn = card.querySelector(".w-full.max-w-\\[455px\\] button");

    // Set initial states for card elements
    gsap.set(image, {
      opacity: 0,
      scale: 0.8,
      x: index % 2 === 0 ? -100 : 100,
    });

    gsap.set(content, {
      opacity: 0,
      x: index % 2 === 0 ? 100 : -100,
    });

    gsap.set(button, {
      opacity: 0,
      scale: 0,
    });

    gsap.set(readMoreBtn, {
      opacity: 0,
      y: 30,
    });

    // Animate card with delay based on index
    section6Tl.to(
      card,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      `+=${index * 0.2}`
    );

    // Animate image with parallax effect
    section6Tl.to(
      image,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      `-=${0.9 - index * 0.1}`
    );

    // Animate content
    section6Tl.to(
      content,
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      `-=${1 - index * 0.1}`
    );

    // Animate explore button with bounce effect
    section6Tl.to(
      button,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      },
      `-=${0.8 - index * 0.1}`
    );

    // Animate read more button
    section6Tl.to(
      readMoreBtn,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      },
      `-=${0.7 - index * 0.1}`
    );
  });

  // Add continuous subtle animations
  section6Tl.to(
    cards,
    {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut",
    },
    "+=0.5"
  );

  // Add hover effects to cards
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });

      const image = card.querySelector(".imgS img");
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      const image = card.querySelector(".imgS img");
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  });

  // Add hover effects to buttons
  const exploreButtons = document.querySelectorAll(".imgS button");
  const readMoreButtons = document.querySelectorAll(
    ".w-full.max-w-\\[455px\\] button"
  );

  exploreButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  readMoreButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        backgroundColor: "#ffffff",
        color: "#000000",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        backgroundColor: "transparent",
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Add a scroll-triggered background animation
  ScrollTrigger.create({
    trigger: ".s6",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const movement = self.progress * 20;
      gsap.to(section6, {
        backgroundPosition: `50% ${movement}%`,
        duration: 0.1,
      });
    },
  });
});



// Form Filling Logic 
const forms = document.querySelectorAll('form');
const loader = document.getElementById('loader');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

forms.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentForm = e.target;

    const formData = new FormData(currentForm);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const checkbox = currentForm.querySelector('#check');
    // if (!checkbox || !checkbox.checked) {
    //   showPopup("Please accept the Terms & Conditions.");
    //   return;
    // }

    showLoader(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyMzyLttOEepL6xxd1UzMPfxQAeHxKCryPSUxo26_Dc2-f0ed2RGpCwl8RKezWEVaU4/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
      });

      currentForm.reset();
      showPopup("✅ Message sent successfully!");
    } catch (error) {
      console.error('Error!', error.message);
      showPopup("❌ There was an error sending the message.");
    } finally {
      showLoader(false);
    }
  });
});

function showLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('hidden');
}

popupClose.addEventListener('click', () => {
  popup.classList.add('hidden');
});





const formModal = document.getElementById('form-modal');
const closeModalBtn = document.getElementById('close-modal');

// Function to open modal
function openFormModal() {
  formModal.classList.remove('hidden');
}

// Function to close modal
function closeFormModal() {
  formModal.classList.add('hidden');
}

// Close modal on button click
closeModalBtn.addEventListener('click', closeFormModal);

// Optional: close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeFormModal();
  }
});

// Automatically open the form modal 3 seconds after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    openFormModal();
  }, 3000); // 3000 ms = 3 seconds
});