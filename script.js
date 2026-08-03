const tabs = [...document.querySelectorAll("[data-tab]")];
const panels = [...document.querySelectorAll("[data-panel]")];

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

const initialTab = location.hash.replace("#", "");
selectTab(["intro", "projects", "videos"].includes(initialTab) ? initialTab : "intro", false);
