const links = [...document.querySelectorAll(".site-nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    if (link.hash !== location.hash) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: motion, block: "start" });
  });
});

if (sections.length && "IntersectionObserver" in window) {
  const visible = new Map();

  const mark = () => {
    const current = sections.find((section) => visible.get(section));
    links.forEach((link) => {
      const active = current && link.hash === `#${current.id}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      mark();
    },
    { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
