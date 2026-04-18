# pykxel-theme

Pykxel Automation – GoHighLevel white-label theme assets.

## Hosted assets

| Asset | URL |
|-------|-----|
| Theme CSS | `https://imranahmed157.github.io/pykxel-theme/dashboard.css` |
| Initiator JS | `https://imranahmed157.github.io/pykxel-theme/initiator.js` |

## Deployment notes

- **`banner.js` has been removed.** `initiator.js` is now the active JS asset.
- `dashboard.css` remains externally hosted; do **not** inline it into the loader script.

## GoHighLevel loader snippet

Paste the following in **Agency Settings → Company Branding → Custom Code** (or the equivalent custom-code field):

```html
<!-- PYKXEL THEME: External CSS -->
<link
  rel="stylesheet"
  href="https://imranahmed157.github.io/pykxel-theme/dashboard.css?v=13"
  data-pykxel-css="1"
>

<script>
(function () {
  /* ── Favicon ── */
  var favicon = document.querySelector("link[rel*='icon']") || document.createElement("link");
  favicon.type = "image/x-icon";
  favicon.rel  = "shortcut icon";
  favicon.href = "https://assets.cdn.filesafe.space/9GRYiLySPdVirhcEsaNl/media/69ce4798e030604aec393b61.png";
  document.head.appendChild(favicon);

  /* ── Unified script ── */
  if (!document.querySelector('script[data-pykxel-unified="1"]')) {
    var u = document.createElement("script");
    u.src = "https://authservice.ghlexperts.com/api/unified-script"
          + "?access-key=pit-d85e52ce-f3c6-4992-b71d-21840b838c51"
          + "&host=" + encodeURIComponent(window.location.hostname)
          + "&path=" + encodeURIComponent(window.location.pathname);
    u.defer = true;
    u.setAttribute("data-pykxel-unified", "1");
    document.head.appendChild(u);
  }

  /* ── Initiator JS ── */
  if (!document.querySelector('script[data-pykxel-initiator="1"]')) {
    var s = document.createElement("script");
    s.src = "https://imranahmed157.github.io/pykxel-theme/initiator.js?v=1";
    s.defer = true;
    s.setAttribute("data-pykxel-initiator", "1");
    document.head.appendChild(s);
  }
})();
</script>
```

> **Note:** Increment the `?v=` query parameter whenever you update `dashboard.css` or `initiator.js` to bust browser caches.
> **Security:** Rotate the `access-key` value after completing your initial deployment.
