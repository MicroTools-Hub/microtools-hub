// Lightweight helper to wrap click handlers with a final action.
// Many pages call `onClick={runFinalAction(callback)}` — provide a
// minimal, safe implementation so the UI behaves consistently.

export function runFinalAction(fn) {
  return async function (event) {
    try {
      if (event && typeof event.preventDefault === "function") {
        // allow default behavior unless the callback handles it
      }

      if (typeof fn === "function") {
        // call the provided callback (may be sync or async)
        await fn(event);
      }
    } catch (err) {
      // swallow errors to avoid breaking UI; log for debugging
      // eslint-disable-next-line no-console
      console.error("runFinalAction error:", err);
    }
  };
}
