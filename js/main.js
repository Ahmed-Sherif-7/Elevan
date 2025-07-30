document.addEventListener("DOMContentLoaded", () => {
  // Get references to the burger icon, mobile menu, and close button
  const burgerIcon = document.querySelector(".burger-menu-icon");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const closeBtn = document.querySelector(".mobile-menu-content .close-btn");
  const mobileLinks = document.querySelectorAll(
    ".mobile-menu-content .mobile-links a"
  );

  // Function to open the mobile menu
  function openMobileMenu() {
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  }

  // Function to close the mobile menu
  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Event listener for clicking the burger icon
  if (burgerIcon) {
    burgerIcon.addEventListener("click", openMobileMenu);
  }

  // Event listener for clicking the close button
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileMenu);
  }

  // Event listeners for clicking on mobile menu links (to close the menu after navigation)
  mobileLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Prevent default anchor behavior if you want to handle scrolling smoothly via JS
      // event.preventDefault();
      closeMobileMenu();
      // Optional: Smooth scroll to section
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Optional: Close menu if user clicks outside the content area (on the overlay itself)
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (event) => {
      if (event.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Optional: Add active class to navigation links based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const desktopLinks = document.querySelectorAll("header nav .links ul a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        pageYOffset >= sectionTop - 100 &&
        pageYOffset < sectionTop + sectionHeight - 100
      ) {
        current = section.getAttribute("id");
      }
    });

    desktopLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    mobileLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
