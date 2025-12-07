// Lightweight helper to wrap click handlers with a final action.
// Many pages call `onClick={runFinalAction(callback)}` — provide a
// minimal, safe implementation so the UI behaves consistently.

import { showAd } from "./adLauncher";

// Wrap a final user action (download / copy / open) so we can show an ad
// without being blocked by popup blockers. Behavior:
// 1. Open a blank window immediately (user gesture) to avoid blocker.
// 2. Optionally navigate that window to an ad URL or write HTML into it.
// 3. Execute the provided callback (download/copy). We navigate the ad
//    window right away to ensure the ad shows even if the page navigates.
export function runFinalAction(fn, { adUrl = "/ad.html", adHtml = null, closeAfterMs = 8000 } = {}) {
  return async function (event) {
    let adOpened = false;
    try {
      // Try to open the ad window immediately (direct user gesture)
      try {
        // We call showAd with url but prevent close until after action.
        // showAd will open the window and navigate it.
        adOpened = await showAd({ url: adUrl, html: adHtml, closeAfterMs });
      } catch (e) {
        adOpened = false;
      }

      if (typeof fn === "function") {
        await fn(event);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("runFinalAction error:", err);
    }

    // If ad could not be opened previously, try a fallback (attempt again)
    if (!adOpened) {
      try {
        await showAd({ url: adUrl, html: adHtml, closeAfterMs });
      } catch (e) {
        // ignore
      }
    }
  };
}
