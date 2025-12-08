// Lightweight ad launcher used by `runFinalAction`.
// Injects the vignette ad script inline on the current page (no popup window).
// The script runs immediately after the final user action (download/copy/generate).

export async function showAd({ url = "/ad.html", html = null, closeAfterMs = 8000 } = {}) {
  try {
    if (typeof window === "undefined") return false;

    // Use the user-provided vignette script (zone + host replaced)
    const adScript = `(function(s){s.dataset.zone='10293088',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;

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
