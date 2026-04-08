(function () {
  function injectBanner() {
    // Avoid duplicates
    if (document.querySelector(".main_container1012")) return;

    // Only inject when we have the main app wrapper
    var app = document.querySelector("#app");
    if (!app) return;

    // Build banner
    var container = document.createElement("div");
    container.className = "main_container1012";
    container.innerHTML = [
      '<div class="inside_container1012">',
      '  <div class="left_side1012">',
      '    <h2 class="helloow1012">Hey {{user.name}}</h2>',
      '    <h4 class="dashboard101224">Your dashboard is a great place to start your day.</h4>',
      "  </div>",
      '  <div class="right_side1012">',
      '    <div class="another_one12347">',
      '      <a href="mailto:support@pykxel.com">Email Pykxel Automation</a>',
      '      <a href="https://pykxel.com" target="_blank" rel="noopener">Pykxel Automation Services</a>',
      "    </div>",
      "  </div>",
      "</div>",
    ].join("\n");

    // Insert near top of the app content.
    // If a better anchor exists, use it; otherwise prepend to #app.
    var anchor =
      document.querySelector(".hl_wrapper--inner") ||
      document.querySelector(".hl_wrapper") ||
      app;

    anchor.insertBefore(container, anchor.firstChild);
  }

  // Run now
  injectBanner();

  // Re-run on SPA navigation (HighLevel is a single-page app)
  // This keeps it present when you navigate.
  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      injectBanner();
    }
  }, 800);
})();
