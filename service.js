// GSAP Intro Reveal & Auto Counter for Service Hero
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".service-hero-content") && typeof gsap !== "undefined") {
    gsap.fromTo(
      ".service-hero-content > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: () => {
          // Trigger numbers ticker
          const counters = document.querySelectorAll(".service-stat-item .stat-counter");
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const countObj = { val: 0 };
            gsap.to(countObj, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = Math.round(countObj.val);
              }
            });
          });
        }
      }
    );
  }
});







// GSAP Scroll Reveal for Skeuomorphic Plaque Cards & Gauge Fill
if (document.querySelector(".craft-solutions-grid") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".craft-plaque-card",
    { y: 45, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.16,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".craft-solutions-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onComplete: () => {
        gsap.utils.toArray(".gauge-fill-bar").forEach((bar) => {
          const targetWidth = bar.style.width;
          gsap.fromTo(bar, { width: "0%" }, { width: targetWidth, duration: 1.2, ease: "power2.out" });
        });
      }
    }
  );
}







// Mobile Tap Expansion & GSAP Scroll Trigger for Accordion Deck
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".pe-accordion-panel");

  if (window.matchMedia("(max-width: 768px)").matches) {
    panels.forEach((panel) => {
      panel.addEventListener("click", () => {
        const isAlreadyExpanded = panel.classList.contains("mobile-expanded");
        panels.forEach((p) => p.classList.remove("mobile-expanded"));
        if (!isAlreadyExpanded) {
          panel.classList.add("mobile-expanded");
        }
      });
    });
  }

  // GSAP Scroll Reveal
  if (document.querySelector(".pe-accordion-wrapper") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".pe-accordion-panel",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pe-accordion-wrapper",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});







// GSAP ScrollTrigger Sequence for Pipeline Dash-Offset Animation
if (document.querySelector(".pipeline-canvas-wrapper") && typeof ScrollTrigger !== "undefined") {
  const path = document.querySelector(".animated-offset-path");
  const stations = document.querySelectorAll(".pipeline-station");

  // Animate path stroke from start to finish on scroll
  gsap.fromTo(
    path,
    { strokeDashoffset: 1200 },
    {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".pipeline-canvas-wrapper",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    }
  );

  // Stagger node reveals
  gsap.fromTo(
    stations,
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".pipeline-canvas-wrapper",
        start: "top 78%",
        toggleActions: "play none none none"
      },
      onComplete: () => {
        // Run circular reticle reveal
        document.querySelectorAll(".ring-animated").forEach((ring) => {
          gsap.to(ring, { strokeDashoffset: 60, duration: 1.2, ease: "power2.out" });
        });
      }
    }
  );
}






// GSAP Scroll Reveal for Final CTA Elements
if (document.querySelector(".cta-box-wrapper") && typeof ScrollTrigger !== "undefined") {
  gsap.fromTo(
    ".cta-box-wrapper > *",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".service-final-cta-section",
        start: "top 78%",
        toggleActions: "play none none none"
      }
    }
  );
}