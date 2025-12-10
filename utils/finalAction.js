// Lightweight helper to wrap click handlers with a final action.
// Many pages call `onClick={runFinalAction(callback)}` — provide a
// minimal, safe implementation so the UI behaves consistently.

import { showAd } from "./adLauncher";

// Wrap a final user action (download / copy / open) so we can show an ad.
export const runFinalAction = function (fn) {
  // Return an async function that will be the actual event handler.
  return async function (event) {
    if (typeof window !== 'undefined') {
      // Client-side execution
      let adOpened = false;
      try {
        // Try to open the ad window immediately (direct user gesture)
        adOpened = await showAd();
      } catch (e) {
        adOpened = false;
      }

      if (typeof fn === "function") {
        await fn(event);
      }

      // If ad could not be opened previously, try a fallback (attempt again)
      if (!adOpened) {
        try {
          await showAd();
        } catch (e) {
          // ignore
        }
      }
    } else {
      // Server-side (during prerendering) or non-browser environment
      if (typeof fn === "function") {
        // Just execute the provided function without ad logic.
        await fn(event);
      }
    }
  };
};
