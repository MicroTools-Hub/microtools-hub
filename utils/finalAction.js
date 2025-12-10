// Lightweight helper to wrap click handlers with a final action.
// Many pages call `onClick={runFinalAction(callback)}` — provide a
// minimal, safe implementation so the UI behaves consistently.

import { showAd } from "./adLauncher";

// Wrap a final user action (download / copy / open) so we can show an ad.
export const runFinalAction = typeof window !== 'undefined'
  ? function (fn) {
      return async function (event) {
        let adOpened = false;
        try {
          // Try to open the ad window immediately (direct user gesture)
          try {
            adOpened = await showAd();
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
            await showAd();
          } catch (e) {
            // ignore
          }
        }
      };
    }
  : function (fn) { // Server-side no-op
      return async function (event) {
        if (typeof fn === "function") {
          await fn(event);
        }
      };
    };
