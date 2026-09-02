document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Page Load GSAP Reveal Animation
  if (document.querySelector(".about-hero-content") && typeof gsap !== "undefined") {
    gsap.fromTo(
      ".about-hero-content > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: runAutoCounters
      }
    );
  } else {
    runAutoCounters();
  }

  // 2. Global Universal Auto Count Animation Runner
  function runAutoCounters() {
    const counters = document.querySelectorAll(".stat-counter, .metric-counter");
    if (!counters.length) return;

    counters.forEach((counter) => {
      const targetStr = counter.getAttribute("data-target") || counter.textContent.trim();
      const targetValue = parseFloat(targetStr);
      const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || (targetStr.includes(".") ? 1 : 0);

      if (isNaN(targetValue)) return;

      const countObj = { val: 0 };

      if (typeof gsap !== "undefined") {
        gsap.to(countObj, {
          val: targetValue,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = countObj.val.toFixed(decimals);
          }
        });
      } else {
        // Fallback Native JS Counter
        let startTimestamp = null;
        const duration = 1800;

        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Ease-out cubic calculation
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeOutProgress * targetValue;
          counter.textContent = currentVal.toFixed(decimals);

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            counter.textContent = targetValue.toFixed(decimals);
          }
        };

        window.requestAnimationFrame(step);
      }
    });
  }
});







// GSAP Reveal with Mouse Parallax & Auto Counters for About Heritage Section
document.addEventListener("DOMContentLoaded", () => {
  const heritageGrid = document.querySelector(".heritage-split-grid");

  if (heritageGrid && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // 1. Text Column Scroll Reveal
    gsap.fromTo(
      ".heritage-content-pane > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heritage-split-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Visual Pane Scale & Reveal
    gsap.fromTo(
      ".deck-main-card",
      { scale: 0.92, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".visual-deck-stage",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // 3. Floating Pill Entrance
    gsap.fromTo(
      "#holoPill",
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".visual-deck-stage",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // 4. Desktop Cursor Parallax Effect
    if (window.matchMedia("(min-width: 769px)").matches) {
      const visualStage = document.getElementById("visualDeckStage");
      const deckCard = document.querySelector(".deck-main-card");
      const pill = document.getElementById("holoPill");

      visualStage.addEventListener("mousemove", (e) => {
        const rect = visualStage.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(deckCard, {
          rotateY: x * 0.04,
          rotateX: -y * 0.04,
          duration: 0.5,
          ease: "power1.out"
        });

        gsap.to(pill, {
          x: x * 0.08,
          y: y * 0.08,
          duration: 0.6,
          ease: "power1.out"
        });
      });

      visualStage.addEventListener("mouseleave", () => {
        gsap.to([deckCard, pill], {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }
  }
});







// GSAP Scroll Reveal for Chamfered Photo Cards
if (document.querySelector(".team-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".team-card",
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}







// Synchronized Auto-Cycle for Background Images and Left Content
document.addEventListener("DOMContentLoaded", () => {
  const contentSlides = document.querySelectorAll(".expertise-content-slide");
  const bgSlides = document.querySelectorAll(".expertise-bg-slide");
  const indicatorDots = document.querySelectorAll(".expertise-slide-indicators .dot");

  if (!contentSlides.length || !bgSlides.length) return;

  let currentExpertiseIndex = 0;
  const totalSlides = contentSlides.length;
  let expertiseCycleTimer;

  function switchExpertiseSlide(nextIndex) {
    currentExpertiseIndex = (nextIndex + totalSlides) % totalSlides;

    // 1. Swap Content Panels
    contentSlides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentExpertiseIndex);
    });

    // 2. Swap Background Media
    bgSlides.forEach((bg, idx) => {
      bg.classList.toggle("active", idx === currentExpertiseIndex);
    });

    // 3. Update Indicator Dots
    indicatorDots.forEach((dot, idx) => {
      dot.classList.toggle("pill-active", idx === currentExpertiseIndex);
    });
  }

  function startExpertiseTimer() {
    expertiseCycleTimer = setInterval(() => {
      switchExpertiseSlide(currentExpertiseIndex + 1);
    }, 6000);
  }

  function resetExpertiseTimer() {
    clearInterval(expertiseCycleTimer);
    startExpertiseTimer();
  }

  // Interactive Dot Click Navigation
  indicatorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      resetExpertiseTimer();
      switchExpertiseSlide(idx);
    });
  });

  startExpertiseTimer();
});







// GSAP Scroll Reveal for Hiring Pillars and Openings Rows
if (document.querySelector(".hiring-pillars-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".hiring-pillar-card",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hiring-pillars-grid",
        start: "top 82%",
        toggleActions: "play none none none"
      }
    }
  );

  gsap.fromTo(
    ".opening-row-card",
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".openings-stack",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
}







// GSAP Scroll Reveal for Final Mint CTA Section
if (document.querySelector(".final-mint-card") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".final-mint-card .cta-left-pane > *",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".final-mint-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );

  gsap.fromTo(
    ".final-mint-card .fiduciary-guarantee-tile",
    { scale: 0.94, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".final-mint-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}