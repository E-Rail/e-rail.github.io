const tabs = [...document.querySelectorAll("[data-tab]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const indicator = document.querySelector(".tab-line");

function moveIndicator(tab) {
  if (!indicator || window.innerWidth <= 620) return;
  indicator.style.width = `${tab.offsetWidth}px`;
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}

function selectTab(name, updateHash = true) {
  const selected = tabs.find((tab) => tab.dataset.tab === name) || tabs[0];

  tabs.forEach((tab) => {
    const active = tab === selected;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.dataset.panel === selected.dataset.tab;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });

  moveIndicator(selected);
  if (updateHash) history.replaceState(null, "", `#${selected.dataset.tab}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    selectTab(tabs[nextIndex].dataset.tab);
  });
});

window.addEventListener("resize", () => {
  const active = document.querySelector(".tab.active");
  if (active) moveIndicator(active);
});

const initialTab = location.hash.replace("#", "");
selectTab(["intro", "projects", "videos"].includes(initialTab) ? initialTab : "intro", false);
