// Lightweight ad launcher used by `runFinalAction`.
// Injects the vignette ad script inline on the current page (no popup window).
// The script runs immediately after the final user action (download/copy/generate).

export async function showAd({ url = "/ad.html", html = null, closeAfterMs = 8000 } = {}) {
  try {
    if (typeof window === "undefined") return false;

    // Extract the vignette script from ad.html or use provided HTML
    const adScript = `(function(s){s.dataset.zone='10289133',s.src='https://gizokraijaw.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;

    // Create and inject the script element into the page
    const script = document.createElement("script");
    script.textContent = adScript;
    script.async = true;
    document.body.appendChild(script);

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("showAd error:", err);
    return false;
  }
}
