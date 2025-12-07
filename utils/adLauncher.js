// Lightweight ad launcher used by `runFinalAction`.
// Opens a new window immediately (so browsers don't block it) and
// navigates it to the ad content (URL or HTML) provided.

export async function showAd({ url = "/ad.html", html = null, closeAfterMs = 8000 } = {}) {
  try {
    if (typeof window === "undefined") return false;

    // Open an empty window immediately to avoid popup blockers
    const w = window.open("", "_blank");
    if (!w) return false; // blocked

    // If HTML snippet provided, write it into the new window
    if (html) {
      w.document.open();
      w.document.write(html);
      w.document.close();
    } else if (url) {
      // Navigate to the provided URL (defaults to /ad.html)
      w.location.href = url;
    }

    // Optionally close the ad after a timeout so it doesn't linger
    if (closeAfterMs && closeAfterMs > 0) {
      setTimeout(() => {
        try {
          w.close();
        } catch (e) {
          // ignore
        }
      }, closeAfterMs);
    }

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("showAd error:", err);
    return false;
  }
}
