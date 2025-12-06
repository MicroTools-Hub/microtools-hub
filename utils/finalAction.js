import { triggerPopUnderOnce } from "./popunder";

export function runFinalAction(action) {
  return async (...args) => {
    triggerPopUnderOnce(); // ✅ once per page
    return action(...args);
  };
}
