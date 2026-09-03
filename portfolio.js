// GSAP Reveal, Cursor Parallax & Auto Counters for Portfolio Hero
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".portfolio-hero-container") && typeof gsap !== "undefined") {
    // 1. Text & Filters Stagger
    gsap.fromTo(
      ".portfolio-hero-content > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out"
      }
    );

    // 2. 3D Plaque Entry
    gsap.fromTo(
      ".hero-plaque-card",
      { scale: 0.92, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "back.out(1.4)",
        delay: 0.2,
        onComplete: () => {
          // Trigger Auto Counters
          const counters = document.querySelectorAll(".hero-plaque-card .stat-counter");
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
            const countObj = { val: 0 };

            gsap.to(countObj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = countObj.val.toFixed(decimals);
              }
            });
          });
        }
      }
    );

    // 3. Desktop Interactive Card Tilt Parallax
    if (window.matchMedia("(min-width: 769px)").matches) {
      const visualStage = document.getElementById("portfolioHeroStage");
      const plaque = visualStage.querySelector(".hero-plaque-card");
      const floatPill = document.getElementById("heroFloatPill");

      visualStage.addEventListener("mousemove", (e) => {
        const rect = visualStage.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(plaque, {
          rotateY: x * 0.04,
          rotateX: -y * 0.04,
          duration: 0.5,
          ease: "power1.out"
        });

        gsap.to(floatPill, {
          x: x * 0.07,
          y: y * 0.07,
          duration: 0.6,
          ease: "power1.out"
        });
      });

      visualStage.addEventListener("mouseleave", () => {
        gsap.to([plaque, floatPill], {
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

  // 4. Interactive Strategy Horizon Tab Filter Toggle
  const filterBtns = document.querySelectorAll(".filter-pill-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    });
  });
});








// GSAP Stagger Entrance & Mobile Tap Toggle for Morphing Cards
document.addEventListener("DOMContentLoaded", () => {
  const morphCards = document.querySelectorAll(".morph-card");

  // Mobile Tap Toggle (Tap to open, tap again or outside to close)
  if (window.matchMedia("(max-width: 768px)").matches) {
    morphCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const isMorphed = card.classList.contains("is-morphed");
        morphCards.forEach((c) => c.classList.remove("is-morphed"));
        if (!isMorphed) {
          card.classList.add("is-morphed");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".morph-card")) {
        morphCards.forEach((c) => c.classList.remove("is-morphed"));
      }
    });
  }

  // GSAP Scroll Reveal for Grid Entrance
  if (document.querySelector(".morph-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".morph-card",
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".morph-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});







// GSAP ScrollTrigger Sequence for Portfolio Statistics Graph
if (document.querySelector(".analytics-dashboard-grid") && typeof ScrollTrigger !== "undefined") {
  ScrollTrigger.create({
    trigger: ".analytics-dashboard-grid",
    start: "top 78%",
    onEnter: () => {
      // 1. Draw SVG Stroke Curve
      const graphLine = document.querySelector(".graph-stroke-path");
      const graphArea = document.querySelector(".graph-area-path");
      if (graphLine) {
        graphLine.style.strokeDashoffset = "0";
      }
      if (graphArea) {
        graphArea.style.opacity = "1";
      }

      // 2. Animate Horizontal Progress Fill Bars
      document.querySelectorAll(".progress-fill-glow").forEach((fill) => {
        fill.style.transform = "scaleX(1)";
      });

      // 3. Trigger Auto Counters
      document.querySelectorAll(".analytics-dashboard-grid .stat-counter").forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
        const countObj = { val: 0 };

        gsap.to(countObj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = countObj.val.toFixed(decimals);
          }
        });
      });
    },
    once: true
  });
}








// GSAP Stagger Reveal for Portfolio Dossier Cards
if (document.querySelector(".portfolio-matrix-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".asset-dossier-card",
    { y: 45, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".portfolio-matrix-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onComplete: () => {
        // Trigger auto counters within the matrix cards
        document.querySelectorAll(".portfolio-matrix-grid .stat-counter").forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
          const countObj = { val: 0 };

          gsap.to(countObj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = countObj.val.toFixed(decimals);
            }
          });
        });
      }
    }
  );
}







// GSAP ScrollTrigger Sequence for Kinetic Overlapping Cards (Desktop Only)
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(min-width: 769px)").matches && typeof ScrollTrigger !== "undefined") {
    const cards = gsap.utils.toArray(".kinetic-stack-card");

    cards.forEach((card, index) => {
      // Scale down preceding cards slightly as new ones stack on top
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.94 - (cards.length - index) * 0.02,
          opacity: 0.65,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 70%",
            end: "top 25%",
            scrub: true
          }
        });
      }
    });

    // Auto-Counter Trigger for In-View Cards
    ScrollTrigger.batch(".kinetic-stack-card", {
      start: "top 80%",
      onEnter: (batch) => {
        batch.forEach((card) => {
          const counter = card.querySelector(".stat-counter");
          if (!counter || counter.dataset.counted === "true") return;
          counter.dataset.counted = "true";

          const target = parseFloat(counter.getAttribute("data-target"));
          const decimals = parseInt(counter.getAttribute("data-decimals"), 10) || 0;
          const countObj = { val: 0 };

          gsap.to(countObj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = countObj.val.toFixed(decimals);
            }
          });
        });
      },
      once: true
    });
  }
});







// GSAP Reveal for Portfolio Final CTA Capsule
if (document.querySelector(".portfolio-cta-capsule") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".portfolio-cta-capsule",
    { scale: 0.95, opacity: 0, y: 35 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".portfolio-final-cta-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}