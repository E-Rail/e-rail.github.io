(() => {
  "use strict";

  const status = document.querySelector(".copy-status");

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy") || "";
      const chinese = document.documentElement.lang.startsWith("zh");

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = chinese ? "已复制" : "COPIED";
        if (status) status.textContent = chinese ? "安装命令已复制" : "Install command copied";
      } catch (_) {
        button.textContent = chinese ? "复制失败" : "FAILED";
        if (status) status.textContent = chinese ? "无法复制安装命令" : "Could not copy the install command";
      }

      window.setTimeout(() => {
        button.textContent = chinese ? "复制" : "COPY";
      }, 1600);
    });
  });
})();
