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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => stamp.classList.add("in-view"), 350);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(stamp);
} else if (stamp) {
  stamp.classList.add("in-view");
}
