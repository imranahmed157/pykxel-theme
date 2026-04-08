(function () {
  function getUserName() {
    try {
      if (window?.user?.name) return window.user.name;
    } catch (e) {}
    try {
      if (window?.__INITIAL_STATE__?.user?.name) return window.__INITIAL_STATE__.user.name;
    } catch (e) {}
    try {
      if (window?.__INITIAL_STATE__?.auth?.user?.name) return window.__INITIAL_STATE__.auth.user.name;
    } catch (e) {}
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
    return null;
  }

  function injectBanner() {
    if (document.querySelector(".main_container1012")) return;

    var app = document.querySelector("#app");
    if (!app) return;

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
      '      <a href="mailto:help@pykxel.com">Email Pykxel Automation</a>',
      '      <a href="https://pykxel.com" target="_blank" rel="noopener">Pykxel Automation Services</a>',
      "    </div>",
      "  </div>",
      "</div>",
    ].join("\n");

    var anchor =
      document.querySelector(".hl_wrapper--inner .hl_wrapper--content") ||
      document.querySelector(".hl_wrapper--inner .container-fluid") ||
      document.querySelector(".hl_wrapper--inner") ||
      app;

    anchor.insertBefore(container, anchor.firstChild);
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