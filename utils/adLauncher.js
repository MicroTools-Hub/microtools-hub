// Lightweight ad launcher used by `runFinalAction`.
// Injects the vignette ad script inline on the current page (no popup window).
// The script runs immediately after the final user action (download/copy/generate).

export async function showAd() {
  try {
    if (typeof window === "undefined") return false;

    // Always inject a fresh vendor script so the ad can run on every user action.
    // Append a timestamp query to bypass aggressive caching or provider-side simple dedupe.
    const vendorSrc = `https://al5sm.com/tag.min.js?ts=${Date.now()}`;

    // Remove any existing vendor script elements we previously injected to avoid duplicates.
    try {
      const prev = Array.from(document.querySelectorAll("script[src*='al5sm.com/tag.min.js']"));
      prev.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    } catch (e) {
      // ignore
    }

    const s = document.createElement('script');
    s.dataset.zone = '10286478';
    s.src = vendorSrc;
    s.async = true;
    document.body.appendChild(s);

    // Attempt to bring focus back to the current window after ad script injection.
    // This is a best-effort approach as browser security policies might prevent it
    // if the ad script opens a new window in the foreground.
    window.focus();

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("showAd error:", err);
    return false;
  }
}
