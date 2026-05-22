
/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL REVEAL (PERFORMANCE OPTIMIZED)
========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // run once only
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================
     SMOOTH SCROLL NAVIGATION
========================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================
     ACTIVE NAV LINK TRACKING
========================= */

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 120) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);


  /* =========================
     NAV SHADOW ON SCROLL
========================= */

  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
    } else {
      nav.style.boxShadow = "none";
    }
  });


  /* =========================
     PROGRESS BAR
========================= */

  const progressBar = document.getElementById("progress-bar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  });


  /* =========================
     HERO BUTTON MICRO INTERACTION
========================= */

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "0.3s ease";
    });

    btn.addEventListener("click", () => {
      btn.style.transform = "scale(0.96)";

      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 120);
    });
  });


  /* =========================
     OPTIONAL: EMAIL CLICK FEEDBACK
     (improves conversion psychology)
========================= */

  const contactLink = document.querySelector("#contact");

  if (contactLink) {
    contactLink.addEventListener("click", () => {
      console.log("User intent: contact initiated");
    });
  }


  /* =========================
     PAGE LOAD SCROLL FIX
========================= */

  window.addEventListener("load", () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  });

  window.addEventListener("load", () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  });
  /* =========================
     TERMS CHECKBOX BUTTON CONTROL
  ========================= */

 const checkbox = document.getElementById("agreeTerms");
const button = document.getElementById("buyBtn");


if (checkbox && button) {
   const paymentLink = button.getAttribute("data-link");

  button.classList.add("disabled-btn");

  button.addEventListener("click", (e) => {
    if (!checkbox.checked) {
      e.preventDefault();
      return;
    }

    window.open(paymentLink, "_blank");
  });

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      button.classList.remove("disabled-btn");
    } else {
      button.classList.add("disabled-btn");
      }
    });
  }

  /* =========================
     SERVICE WORKER
  ========================= */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("posticano/sw.js")
        .then(() => console.log("SW registered"))
        .catch(err => console.log("SW failed", err));
    });
  }

});
