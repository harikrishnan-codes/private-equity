// Blog Hero Reveal Animations & Filter Interactions
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".blog-hero-container") && typeof gsap !== "undefined") {
    // 1. Text Elements Stagger Entry
    gsap.fromTo(
      ".blog-hero-header > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out"
      }
    );

    // 2. Featured Article Card Entry
    gsap.fromTo(
      ".blog-featured-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power3.out",
        delay: 0.35
      }
    );
  }

  // Category Tab Pill Toggles
  const catPills = document.querySelectorAll(".cat-pill");
  catPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      catPills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");
    });
  });
});







// Interactive 3D Coverflow Deck Navigation
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".coverflow-card"));
  const dots = document.querySelectorAll(".c-dot");
  const prevBtn = document.getElementById("coverflowPrev");
  const nextBtn = document.getElementById("coverflowNext");

  if (!cards.length) return;

  let currentIndex = 2; // Initial middle active card

  function updateCoverflow(index) {
    currentIndex = (index + cards.length) % cards.length;

    cards.forEach((card, i) => {
      // Clear legacy state classes
      card.className = "coverflow-card";

      const diff = i - currentIndex;

      if (diff === 0) {
        card.classList.add("active");
      } else if (diff === -1 || diff === cards.length - 1) {
        card.classList.add("prev-1");
      } else if (diff === 1 || diff === -(cards.length - 1)) {
        card.classList.add("next-1");
      } else if (diff === -2 || diff === cards.length - 2) {
        card.classList.add("prev-2");
      } else if (diff === 2 || diff === -(cards.length - 2)) {
        card.classList.add("next-2");
      } else {
        card.classList.add("hidden-card");
      }
    });

    // Sync indicator dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // Click on cards to focus
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => updateCoverflow(idx));
  });

  // Button Controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => updateCoverflow(currentIndex - 1));
    nextBtn.addEventListener("click", () => updateCoverflow(currentIndex + 1));
  }

  // Dot Controls
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => updateCoverflow(idx));
  });

  // Initial layout calculation
  updateCoverflow(currentIndex);
});








// GSAP Reveal Animation for Split-Screen Showcase
if (document.querySelector(".split-showcase-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".split-media-pane",
    { x: -40, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".split-showcase-section",
        start: "top 78%",
        toggleActions: "play none none none"
      }
    }
  );

  gsap.fromTo(
    ".split-content-inner > *",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".split-showcase-section",
        start: "top 78%",
        toggleActions: "play none none none"
      }
    }
  );
}







// Native Interactive 3D Cursor Tilt & Parallax Physics (Desktop Only)
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(min-width: 769px)").matches) {
    const tiltStages = document.querySelectorAll("[data-tilt]");

    tiltStages.forEach((stage) => {
      const chassis = stage.querySelector(".tilt-card-chassis");
      const glare = stage.querySelector(".card-glare-overlay");

      stage.addEventListener("mousemove", (e) => {
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -11;
        const rotateY = ((x - centerX) / centerX) * 11;

        chassis.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`;
        }
      });

      stage.addEventListener("mouseleave", () => {
        chassis.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        chassis.style.transform = "rotateX(0deg) rotateY(0deg)";
        setTimeout(() => {
          chassis.style.transition = "";
        }, 600);
      });

      stage.addEventListener("mouseenter", () => {
        chassis.style.transition = "";
      });
    });
  }

  // GSAP ScrollTrigger Stagger Entry
  if (document.querySelector(".tilt-cards-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".tilt-card-stage",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tilt-cards-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});








// Filter Interactions & Scroll Reveal for Resource Library
document.addEventListener("DOMContentLoaded", () => {
  const libPills = document.querySelectorAll(".lib-pill");
  const dossierCards = document.querySelectorAll(".lib-dossier-card");

  libPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      libPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.getAttribute("data-filter");

      dossierCards.forEach((card) => {
        const cat = card.getAttribute("data-cat");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // GSAP Stagger Reveal
  if (document.querySelector(".library-matrix-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".lib-dossier-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".library-matrix-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});








// GSAP Reveal Animation for Final Blog CTA Section
if (document.querySelector(".blog-cta-card") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".blog-cta-card > *",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-final-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}




document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ctaSubscribeForm");
  const emailInput = document.getElementById("ctaEmailInput");
  const errorMsg = document.getElementById("ctaValidationMsg");

  if (!form || !emailInput) return;

  // Standard institutional email validation pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const rawValue = emailInput.value.trim();

    // 1. Validation check
    if (!rawValue || !emailRegex.test(rawValue)) {
      emailInput.classList.add("input-error");
      if (errorMsg) {
        errorMsg.textContent = "Please enter a valid institutional email address.";
        errorMsg.classList.add("error-active");
      }
      emailInput.focus();
      return;
    }

    // 2. Clear validation styles
    emailInput.classList.remove("input-error");
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.classList.remove("error-active");
    }

    // 3. Clear the input value automatically
    emailInput.value = "";
    emailInput.blur();

    // 4. Redirect to the existing error.html page
    window.location.href = "error.html";
  });

  // Clear error highlight dynamically as user types
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("input-error")) {
      emailInput.classList.remove("input-error");
      if (errorMsg) {
        errorMsg.textContent = "";
        errorMsg.classList.remove("error-active");
      }
    }
  });
});