(function () {
  /* ── Favicon injection ── */
  function injectFavicon() {
    var url =
      "https://assets.cdn.filesafe.space/9GRYiLySPdVirhcEsaNl/media/69ce4798e030604aec393b61.png";
    var links = document.querySelectorAll("link[rel~='icon']");
    links.forEach(function (el) {
      el.href = url;
    });
    if (!links.length) {
      var link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = url;
      document.head.appendChild(link);
    }
  }

  if (document.head) {
    injectFavicon();
  } else {
    document.addEventListener("DOMContentLoaded", injectFavicon);
  }

  function isSubaccount() {
    return !!document.querySelector("#location-dashboard") || !!document.querySelector("#location_dashboard-main-content");
  }

  function getUserName() {
    try { if (window?.user?.name) return window.user.name; } catch (e) {}
    try { if (window?.__INITIAL_STATE__?.user?.name) return window.__INITIAL_STATE__.user.name; } catch (e) {}
    try { if (window?.__INITIAL_STATE__?.auth?.user?.name) return window.__INITIAL_STATE__.auth.user.name; } catch (e) {}
    try {
      const u = localStorage.getItem("user");
      if (u) {
        const j = JSON.parse(u);
        if (j?.name) return j.name;
        if (j?.firstName) return [j.firstName, j.lastName].filter(Boolean).join(" ");
      }
    } catch (e) {}
    try {
      const u = localStorage.getItem("authUser");
      if (u) {
        const j = JSON.parse(u);
        if (j?.name) return j.name;
        if (j?.firstName) return [j.firstName, j.lastName].filter(Boolean).join(" ");
      }
    } catch (e) {}
    try {
      const u = localStorage.getItem("hl_user");
      if (u) {
        const j = JSON.parse(u);
        if (j?.name) return j.name;
      }
    } catch (e) {}
    try {
      const nameEl = document.querySelector(
        ".hl_header--user-name, .hl_header--username, [data-testid='user-name'], [data-testid='user-menu'] span"
      );
      if (nameEl?.textContent?.trim()) return nameEl.textContent.trim();
    } catch (e) {}
    return null;
  }

  function injectBanner() {
    if (document.querySelector(".main_container1012")) return;
    if (location.pathname.includes("/login")) return;
    if (!isSubaccount()) return;

    var name = getUserName();
    var greeting = name ? "Hey " + name : "Hey there";

    var container = document.createElement("div");
    container.className = "main_container1012";
    container.innerHTML = [
      '<div class="inside_container1012">',
      '  <div class="left_side1012">',
      '    <h2 class="helloow1012">' + greeting + '</h2>',
      '    <h4 class="dashboard101224">Your dashboard is a great place to start your day.</h4>',
      "  </div>",
      '  <div class="right_side1012">',
      '    <div class="another_one12347">',
      '      <a class="pykxel-email" href="mailto:help@pykxel.com">Customer Support</a>',
      '      <a href="https://pykxel.com" target="_blank" rel="noopener">Pykxel Automation Services</a>',
      "    </div>",
      "  </div>",
      "</div>",
    ].join("\n");

    var anchor =
      document.querySelector("#location-dashboard_container--banner") ||
      document.querySelector("#location_dashboard-main-content") ||
      document.querySelector("#dashboard-wrapper") ||
      document.querySelector("#location-dashboard");

    if (!anchor) return;

    anchor.insertBefore(container, anchor.firstChild);

    var emailBtn = container.querySelector(".pykxel-email");
    if (emailBtn) {
      emailBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "mailto:help@pykxel.com";
      });
    }
  }

  injectBanner();

  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      var existing = document.querySelector(".main_container1012");
      if (existing) existing.remove();
      injectBanner();
    }
  }, 800);
})();
