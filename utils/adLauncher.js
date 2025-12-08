// Lightweight ad launcher used by `runFinalAction`.
// Injects the vignette ad script inline on the current page (no popup window).
// The script runs immediately after the final user action (download/copy/generate).

export async function showAd({ url = "/ad.html", html = null, closeAfterMs = 8000 } = {}) {
  try {
    if (typeof window === "undefined") return false;

    // Always inject a fresh vendor script so the ad can run on every user action.
    // Append a timestamp query to bypass aggressive caching or provider-side simple dedupe.
    const vendorSrc = `https://groleegni.net/vignette.min.js?ts=${Date.now()}`;

    // Remove any existing vendor script elements we previously injected to avoid duplicates.
    try {
      const prev = Array.from(document.querySelectorAll("script[src*='groleegni.net/vignette.min.js']"));
      prev.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    } catch (e) {
      // ignore
    }

    const s = document.createElement('script');
    s.dataset.zone = '10293088';
    s.src = vendorSrc;
    s.async = true;
    document.body.appendChild(s);

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("showAd error:", err);
    return false;
  }
}
