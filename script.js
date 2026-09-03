document.addEventListener("DOMContentLoaded", () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === "undefined") {
    console.warn("GSAP is not loaded. Check CDN link order.");
    return;
  }
  
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Reveal (Runs immediately on load/refresh)
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .fromTo(
        ".hero-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        ".hero-slide.active .hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        ".hero-slide.active .hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        ".hero-slide.active .hero-actions .btn",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
      .fromTo(
        ".hero-metrics .metric-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      )
      .fromTo(
        ".carousel-deck",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.8"
      );
  }

  // 2. Marquee Section Scroll Reveal
  const marqueeSection = document.querySelector(".marquee-section");
  if (marqueeSection && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".marquee-tag",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ".marquee-track",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".marquee-wrapper",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  // 3. Four Pillars / Zig-Zag / Metrics / Testimonials (Safely guarded)
  if (document.querySelector(".pillars-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.from(".pillar-card", {
      scrollTrigger: {
        trigger: ".pillars-grid",
        start: "top 80%"
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out"
    });
  }
});

// Refresh trigger coordinates after media and assets are fully painted
window.addEventListener("load", () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});






document.addEventListener("DOMContentLoaded", () => {
  // 1. Determine the active page filename
  let currentPath = window.location.pathname.split("/").pop();
  if (!currentPath || currentPath === "" || currentPath === "/") {
    currentPath = "index.html";
  }

  // 2. Select all navigation links from both Header and Footer
  const headerNavLinks = document.querySelectorAll(".nav-link");
  const footerNavLinks = document.querySelectorAll(".footer-nav-link");
  const allNavLinks = [...headerNavLinks, ...footerNavLinks];

  // 3. Clear existing active classes
  allNavLinks.forEach((link) => link.classList.remove("active"));

  // 4. Match link href to the current file name and apply the active state
  allNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      const cleanHref = href.split("/").pop().split("#")[0];
      if (cleanHref === currentPath) {
        link.classList.add("active");
      }
    }
  });

  // 5. GSAP Header Reveal Animation
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#siteHeader", {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "all"
    });
  }

  // 6. Header Scroll State
  const siteHeader = document.getElementById("siteHeader");
  if (siteHeader) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    });
  }

  // 7. Mobile Menu Functionality
  const menuToggle = document.getElementById("menuToggle");
  const navWrapper = document.getElementById("navWrapper");
  const mobileAction = document.querySelector(".nav-action-mobile");
  let isMenuOpen = false;

  if (menuToggle && navWrapper) {
    const toggleMobileMenu = (state) => {
      isMenuOpen = typeof state === "boolean" ? state : !isMenuOpen;
      menuToggle.setAttribute("aria-expanded", isMenuOpen);
      menuToggle.classList.toggle("active", isMenuOpen);
      navWrapper.classList.toggle("open", isMenuOpen);
      document.body.classList.toggle("no-scroll", isMenuOpen);

      if (window.innerWidth <= 991 && typeof gsap !== "undefined") {
        if (isMenuOpen) {
          gsap.fromTo(
            ".nav-list .nav-item",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" }
          );
          if (mobileAction) {
            gsap.fromTo(
              mobileAction,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, delay: 0.25, ease: "power2.out" }
            );
          }
        } else {
          gsap.set(".nav-list .nav-item, .nav-action-mobile", { clearProps: "all" });
        }
      }
    };

    menuToggle.addEventListener("click", () => toggleMobileMenu());

    headerNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 991 && isMenuOpen) {
          toggleMobileMenu(false);
        }
      });
    });
  }
});









// Synchronized Cyclic Rotation for Hero Slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const cards = document.querySelectorAll(".deck-card");
  const indicators = document.querySelectorAll(".cycle-bar");
  const badgeText = document.getElementById("heroBadgeText");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!slides.length || !cards.length) return;

  const badges = [
    "Institutional Capital",
    "Enterprise Growth",
    "Next-Gen Buyouts"
  ];

  let currentIndex = 0;
  const total = slides.length;
  let autoplayInterval;

  const updateCarousel = (nextIndex) => {
    currentIndex = (nextIndex + total) % total;

    // 1. Update Left Text Slider with GSAP Content Reveal
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add("active");
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            slide.querySelectorAll(".hero-title, .hero-desc, .hero-actions"),
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        }
      } else {
        slide.classList.remove("active");
      }
    });

    // 2. Update Badge Text
    if (badgeText) {
      badgeText.textContent = badges[currentIndex];
    }

    // 3. Update Progress Bars
    indicators.forEach((bar, idx) => {
      bar.classList.toggle("active", idx === currentIndex);
    });

    // 4. Update Right Card Stack Positions (3-Card Circular Shifting)
    cards.forEach((card) => {
      const cardIdx = parseInt(card.getAttribute("data-index"), 10);
      card.classList.remove("pos-front", "pos-mid", "pos-back");

      const relativePos = (cardIdx - currentIndex + total) % total;
      if (relativePos === 0) {
        card.classList.add("pos-front");
      } else if (relativePos === 1) {
        card.classList.add("pos-mid");
      } else {
        card.classList.add("pos-back");
      }
    });
  };

  // Nav Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      resetAutoplay();
      updateCarousel(currentIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      resetAutoplay();
      updateCarousel(currentIndex - 1);
    });
  }

  // Indicator Click Listeners
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const idx = parseInt(indicator.getAttribute("data-index"), 10);
      resetAutoplay();
      updateCarousel(idx);
    });
  });

  // Card Direct Click
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      resetAutoplay();
      updateCarousel(idx);
    });
  });

  // Autoplay Cycle (Every 5.5s)
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5500);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  startAutoplay();
});







// GSAP Scroll Reveal for Chamfer Flip Cards
if (document.querySelector(".solutions-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".flip-card-wrapper",
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".solutions-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}







// GSAP Scroll Reveal for Zig-Zag Stream Elements
if (document.querySelector(".zigzag-stream") && typeof ScrollTrigger !== "undefined") {
  gsap.utils.toArray(".zigzag-entry").forEach((entry) => {
    const metaPane = entry.querySelector(".zigzag-meta-pane");
    const interactivePane = entry.querySelector(".zigzag-interactive-pane");

    gsap.fromTo(
      metaPane.children,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: entry,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      interactivePane,
      { scale: 0.93, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: entry,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const flipStages = document.querySelectorAll(".flip-stage");

  flipStages.forEach((stage) => {
    stage.addEventListener("click", (e) => {
       if (e.target.closest("a, button")) {
        return;
      }
       stage.classList.toggle("flipped");
    });
  });
});






// Interactive Mouse Tilt Angle Calculation for 3D Aurora Cards
if (window.matchMedia("(min-width: 769px)").matches) {
  const cardWrappers = document.querySelectorAll(".aurora-card-wrap");

  cardWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector(".aurora-card");

    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -10px, 20px)`;
    });

    wrapper.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}







// Testimonials Auto-Cycler with GSAP Smooth Text Transition
document.addEventListener("DOMContentLoaded", () => {
  const quoteSlides = document.querySelectorAll(".quote-slide");
  const progressBars = document.querySelectorAll(".testimonial-progress-track .progress-bar");

  if (!quoteSlides.length) return;

  let currentQuoteIndex = 0;
  const totalQuotes = quoteSlides.length;
  let quoteTimer;

  const showQuoteSlide = (targetIndex) => {
    currentQuoteIndex = (targetIndex + totalQuotes) % totalQuotes;

    quoteSlides.forEach((slide, idx) => {
      if (idx === currentQuoteIndex) {
        slide.classList.add("active");
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            slide.querySelectorAll(".quote-heading, .quote-narrative, .quote-author-card"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        }
      } else {
        slide.classList.remove("active");
      }
    });

    progressBars.forEach((bar, idx) => {
      bar.classList.toggle("active", idx === currentQuoteIndex);
    });
  };

  const startQuoteAutoCycle = () => {
    quoteTimer = setInterval(() => {
      showQuoteSlide(currentQuoteIndex + 1);
    }, 6000);
  };

  const resetQuoteAutoCycle = () => {
    clearInterval(quoteTimer);
    startQuoteAutoCycle();
  };

  progressBars.forEach((bar) => {
    bar.addEventListener("click", () => {
      const idx = parseInt(bar.getAttribute("data-index"), 10);
      resetQuoteAutoCycle();
      showQuoteSlide(idx);
    });
  });

  startQuoteAutoCycle();
});







// Interactive Split-Pane FAQ Hover Switch with GSAP Fade & Slide Animation
document.addEventListener("DOMContentLoaded", () => {
  const questionItems = document.querySelectorAll(".faq-question-item");
  const answerPanels = document.querySelectorAll(".faq-answer-panel");

  if (!questionItems.length || !answerPanels.length) return;

  questionItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const targetIndex = item.getAttribute("data-index");

      // 1. Update Active Class on Questions
      questionItems.forEach((q) => q.classList.remove("active"));
      item.classList.add("active");

      // 2. Animate and Swap Matching Answer Panel
      answerPanels.forEach((panel) => {
        if (panel.getAttribute("data-index") === targetIndex) {
          panel.classList.add("active");

          if (typeof gsap !== "undefined") {
            gsap.fromTo(
              panel.children,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
            );
          }
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
});








// GSAP Scroll Reveal for Final CTA Section
if (document.querySelector(".final-cta-card") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".final-cta-card .cta-content-column > *",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );

  gsap.fromTo(
    ".final-cta-card .cta-meta-column",
    { scale: 0.94, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}