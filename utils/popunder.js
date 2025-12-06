export function triggerPopUnderOnce() {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem("popunder_shown")) return;

    sessionStorage.setItem("popunder_shown", "1");

    const script = document.createElement("script");
    script.dataset.zone = "10286478";
    script.src = "https://al5sm.com/tag.min.js";
    script.async = true;

    document.body.appendChild(script);
  } catch (e) {
    console.error("Popunder blocked");
  }
}
