// GSAP Intro Reveal & Auto-Counter Trigger for Contact Intro
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".intro-header-block") && typeof gsap !== "undefined") {
    // 1. Stagger Entry
    gsap.fromTo(
      ".intro-header-block > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: () => {
          // 2. Metric auto-counters
          document.querySelectorAll(".intro-metrics-strip .stat-counter").forEach((counter) => {
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

    // 3. Path Cards Entry
    gsap.fromTo(
      ".path-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "power2.out",
        delay: 0.3
      }
    );
  }
});






// GSAP Intro Reveal Sequence for Contact Hero
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".contact-hero-split") && typeof gsap !== "undefined") {
    // 1. Left Editorial Elements Reveal
    gsap.fromTo(
      ".contact-hero-left > *",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out"
      }
    );

    // 2. Right Encrypted Submission Card Reveal
    gsap.fromTo(
      ".contact-mandate-card",
      { scale: 0.95, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.25
      }
    );
  }
});




document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. CUSTOM SELECT DROPDOWN LOGIC
     ------------------------------------------------------------------------ */
  const customDropdowns = document.querySelectorAll(".custom-dropdown");

  customDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    const label = dropdown.querySelector(".dropdown-selected-text");
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const items = dropdown.querySelectorAll(".dropdown-item");

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      customDropdowns.forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });
      dropdown.classList.toggle("open");
    });

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        label.innerHTML = item.innerHTML;
        if (hiddenInput) {
          hiddenInput.value = item.getAttribute("data-value");
        }
        dropdown.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", () => {
    customDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  });

  /* ------------------------------------------------------------------------
     2. FORM VALIDATION, INPUT CLEARING & ERROR.HTML REDIRECT
     ------------------------------------------------------------------------ */
  const mandateForm = document.getElementById("mandateForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() === "" || nameRegex.test(nameInput.value.trim())) {
        nameInput.classList.remove("input-error");
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      if (emailInput.value.trim() === "" || emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.remove("input-error");
      }
    });
  }

  if (mandateForm) {
    mandateForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      let isValid = true;

      // Validate Name
      if (!nameVal || !nameRegex.test(nameVal)) {
        nameInput.classList.add("input-error");
        isValid = false;
      } else {
        nameInput.classList.remove("input-error");
      }

      // Validate Email
      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add("input-error");
        isValid = false;
      } else {
        emailInput.classList.remove("input-error");
      }

      // Action on success
      if (isValid) {
        // Clear all inputs automatically
        nameInput.value = "";
        emailInput.value = "";
        if (messageInput) messageInput.value = "";

        // Reset Dropdowns to default states
        const inquiryDropdown = document.getElementById("dropdownInquiry");
        if (inquiryDropdown) {
          const firstInquiry = inquiryDropdown.querySelectorAll(".dropdown-item")[0];
          inquiryDropdown.querySelector(".dropdown-selected-text").innerHTML = firstInquiry.innerHTML;
          inquiryDropdown.querySelector('input[type="hidden"]').value = firstInquiry.getAttribute("data-value");
          inquiryDropdown.querySelectorAll(".dropdown-item").forEach((it, idx) => {
            it.classList.toggle("active", idx === 0);
          });
        }

        const ebitdaDropdown = document.getElementById("dropdownEbitda");
        if (ebitdaDropdown) {
          const defaultEbitda = ebitdaDropdown.querySelectorAll(".dropdown-item")[1];
          ebitdaDropdown.querySelector(".dropdown-selected-text").innerHTML = defaultEbitda.innerHTML;
          ebitdaDropdown.querySelector('input[type="hidden"]').value = defaultEbitda.getAttribute("data-value");
          ebitdaDropdown.querySelectorAll(".dropdown-item").forEach((it, idx) => {
            it.classList.toggle("active", idx === 1);
          });
        }

        // Redirect to existing error.html page
        window.location.href = "error.html";
      }
    });
  }
});







// Dynamic Local Time Display for Global Desks & GSAP Stagger
document.addEventListener("DOMContentLoaded", () => {
  // 1. Live Local Time Synchronizer
  function updateOfficeClocks() {
    document.querySelectorAll(".presence-card .time-zone").forEach((el) => {
      const tz = el.getAttribute("data-tz");
      if (!tz) return;

      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }).format(now);

        const shortTz = tz.split("/")[1].replace("_", " ");
        el.textContent = `${shortTz} • ${timeString}`;
      } catch (err) {
        // Fallback gracefully
      }
    });
  }

  updateOfficeClocks();
  setInterval(updateOfficeClocks, 30000);

  // 2. GSAP Scroll Trigger Entry
  if (document.querySelector(".presence-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".presence-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".presence-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});








// GSAP ScrollTrigger Sequence for Masonry Cards
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".faq-masonry-grid") && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".masonry-card",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-masonry-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});








// GSAP Reveal Animation for Contact Final CTA
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".contact-cta-capsule") && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(
      ".contact-cta-capsule",
      { scale: 0.95, opacity: 0, y: 35 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-final-cta-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
});