/*!
 * Pykxel Theme – initiator.js
 * Replaces banner.js. Safe for production in GoHighLevel environments.
 * Version: 1.0.0
 */
(function () {
  "use strict";

  /* ── 1. Guard: run only once ─────────────────────────────────────── */
  if (window.__pykxelInitiatorLoaded) return;
  window.__pykxelInitiatorLoaded = true;

  /* ── 2. jQuery – load pinned version only when missing ───────────── */
  if (typeof window.jQuery === "undefined") {
    var jqScript = document.createElement("script");
    jqScript.type = "text/javascript";
    jqScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jqScript);
  }

  /* ── 3. personaliser – keep compatible if already set ────────────── */
  if (typeof window.personaliser === "undefined") {
    window.personaliser = null;
  }

  /* ── 4. Helpers ──────────────────────────────────────────────────── */

  /** Return true when we are inside a sub-account page. */
  function isSubaccount() {
    return (
      !!document.querySelector("#location-dashboard") ||
      !!document.querySelector("#location_dashboard-main-content") ||
      /^\/location\//.test(window.location.pathname)
    );
  }

  /** Best-effort attempt to read the logged-in user's display name. */
  function getUserName() {
    try { if (window && window.user && window.user.name) return window.user.name; } catch (e) {}
    try { if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.user && window.__INITIAL_STATE__.user.name) return window.__INITIAL_STATE__.user.name; } catch (e) {}
    try { if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.auth && window.__INITIAL_STATE__.auth.user && window.__INITIAL_STATE__.auth.user.name) return window.__INITIAL_STATE__.auth.user.name; } catch (e) {}
    var keys = ["user", "authUser", "hl_user"];
    for (var i = 0; i < keys.length; i++) {
      try {
        var raw = localStorage.getItem(keys[i]);
        if (raw) {
          var obj = JSON.parse(raw);
          if (obj && obj.name) return obj.name;
          if (obj && obj.firstName) return [obj.firstName, obj.lastName].filter(Boolean).join(" ");
        }
      } catch (e) {}
    }
    try {
      var el = document.querySelector(
        ".hl_header--user-name, .hl_header--username, [data-testid='user-name'], [data-testid='user-menu'] span"
      );
      if (el && el.textContent && el.textContent.trim()) return el.textContent.trim();
    } catch (e) {}
    return null;
  }

  /**
   * Safely inject a <script> tag only once (guarded by data attribute).
   * @param {string} src  - URL of the script to inject.
   * @param {string} key  - Unique key stored as data-pykxel-<key> on the element.
   */
  function injectScript(src, key) {
    if (document.querySelector('script[data-pykxel-ext="' + key + '"]')) return;
    var s = document.createElement("script");
    s.src = src;
    s.defer = true;
    s.setAttribute("data-pykxel-ext", key);
    (document.head || document.documentElement).appendChild(s);
  }

  /**
   * Safely inject a <link rel="stylesheet"> only once (guarded by data attribute).
   * @param {string} href - URL of the stylesheet to inject.
   * @param {string} key  - Unique key stored as data-pykxel-<key> on the element.
   */
  function injectStylesheet(href, key) {
    if (document.querySelector('link[data-pykxel-ext="' + key + '"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.setAttribute("data-pykxel-ext", key);
    (document.head || document.documentElement).appendChild(l);
  }

  /* ── 5. Dashboard welcome banner ─────────────────────────────────── */

  function injectBanner() {
    if (document.querySelector(".main_container1012")) return;
    if (window.location.pathname.indexOf("/login") !== -1) return;
    if (!isSubaccount()) return;

    var name = getUserName();

    var container = document.createElement("div");
    container.className = "main_container1012";
    container.setAttribute("data-pykxel-banner", "1");

    // Build the static skeleton with safe HTML (no user-supplied data in innerHTML)
    container.innerHTML = [
      '<div class="inside_container1012">',
      '  <div class="left_side1012">',
      '    <h2 class="helloow1012"></h2>',
      '    <h4 class="dashboard101224">Your dashboard is a great place to start your day.</h4>',
      "  </div>",
      '  <div class="right_side1012">',
      '    <div class="another_one12347">',
      '      <a class="pykxel-email" href="mailto:support@pykxel.com">Customer Support</a>',
      '      <a href="https://pykxel.com" target="_blank" rel="noopener">Pykxel Automation Services</a>',
      "    </div>",
      "  </div>",
      "</div>",
    ].join("\n");

    // Set greeting via textContent so user-supplied data is never interpreted as HTML
    var h2 = container.querySelector(".helloow1012");
    if (h2) h2.textContent = name ? "Hey " + name : "Hey there";

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
        window.location.href = "mailto:support@pykxel.com";
      });
    }
  }

  /* ── 6. Route-change handler (History API + polling fallback) ─────── */

  var _lastPath = window.location.pathname;

  function onRouteChange() {
    var current = window.location.pathname;
    if (current === _lastPath) return;
    _lastPath = current;

    // Remove stale banner so it can be re-injected on the new route
    var stale = document.querySelector(".main_container1012");
    if (stale) stale.parentNode.removeChild(stale);

    injectBanner();
  }

  // Patch pushState / replaceState to fire a custom event
  (function patchHistory() {
    function wrap(orig) {
      return function () {
        var result = orig.apply(this, arguments);
        window.dispatchEvent(new Event("pykxel:routechange"));
        return result;
      };
    }
    try {
      history.pushState    = wrap(history.pushState);
      history.replaceState = wrap(history.replaceState);
    } catch (e) {}
  })();

  window.addEventListener("popstate",              onRouteChange);
  window.addEventListener("pykxel:routechange",   onRouteChange);

  // Polling fallback for SPA routers that bypass History API (2 s keeps overhead low)
  setInterval(onRouteChange, 2000);

  /* ── 7. Extension / feature checks ──────────────────────────────── */

  /**
   * Checks whether a given extension key is active.
   * Extend this list as additional features are rolled out.
   * @param {string} key
   * @returns {boolean}
   */
  function isExtensionActive(key) {
    try {
      var ext = window.__pykxelExtensions || {};
      return !!ext[key];
    } catch (e) {
      return false;
    }
  }

  // Expose helper for use by other hosted scripts / the GHL loader
  window.__pykxelIsExtensionActive = isExtensionActive;

  /* ── 8. Initial load ─────────────────────────────────────────────── */

  // Run banner injection once the DOM is interactive
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectBanner);
  } else {
    injectBanner();
  }

  // Expose utility functions for external scripts that may rely on them
  window.__pykxelInitiator = {
    injectScript:     injectScript,
    injectStylesheet: injectStylesheet,
    isSubaccount:     isSubaccount,
    getUserName:      getUserName,
    injectBanner:     injectBanner,
  };

})();
