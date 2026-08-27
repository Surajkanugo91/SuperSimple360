document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Stamp the "Simplified" mark down once the receipt scrolls into view.
const stamp = document.querySelector(".stamp");
if (stamp && "IntersectionObserver" in window) {
  const stampObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => stamp.classList.add("in-view"), 350);
          stampObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  stampObserver.observe(stamp);
} else if (stamp) {
  stamp.classList.add("in-view");
}

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navlinks");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  });
});

// Close the mobile menu on Escape, and return focus to the toggle button.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks?.classList.contains("open")) {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    menuButton?.focus();
  }
});

// Scroll-reveal. Content is only hidden by CSS once the <html> element has
// the "js" class (set synchronously in <head>), so if JavaScript never runs,
// every section stays visible instead of permanently disappearing.
const reveals = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
  reveals.forEach((item) => revealObserver.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("in-view"));
}

// Floating WhatsApp button: stays out of the way of the hero (where the same
// action already lives in the nav and hero CTA) and fades in once the person
// has scrolled past it, so it never overlaps the receipt, chip or signal strip.
const waFloat = document.getElementById("waFloat");
const hero = document.getElementById("top");
if (waFloat && hero && "IntersectionObserver" in window) {
  const waObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        waFloat.classList.toggle("show", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  waObserver.observe(hero);
} else if (waFloat) {
  waFloat.classList.add("show");
}

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});
