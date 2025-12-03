// /pages/tools/emoji.js
import { useState, useRef } from "react";
import SEO from "../../components/SEO";

/*
  Upgrades:
  - Extended dictionary
  - Translate button
  - Share: WhatsApp, X (Twitter)
  - Export: copy text, download .txt, download image
  - Multi-language support (basic mappings for English, Hindi, Tamil)
*/

export default function EmojiTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("en");
  const [autoReplace, setAutoReplace] = useState(false);
  const previewRef = useRef(null);

  // ======= Big emoji dictionary (english keys) =======
  const emojiDict = {
    // basics
    love: "❤️", heart: "❤️", like: "❤️",
    happy: "😊", joy: "😊", smile: "😊",
    sad: "😢", upset: "😢", cry: "😭",
    angry: "😡", mad: "😡",
    laugh: "😂", funny: "😂", lol: "😂",
    cool: "😎", chill: "😌",
    fire: "🔥", lit: "🔥", hot: "🔥",
    star: "⭐", shine: "✨",
    ok: "👌", yes: "✅", no: "❌",
    wow: "😮", shocked: "😲",
    sleep: "😴", tired: "😪",

    // food
    pizza: "🍕", burger: "🍔", fries: "🍟",
    cake: "🎂", coffee: "☕", tea: "🍵",
    food: "🍽️", snack: "🍿", drink: "🥤",

    // animals
    cat: "🐱", dog: "🐶", lion: "🦁", tiger: "🐯",
    panda: "🐼", monkey: "🐒", bird: "🐦", fish: "🐟",

    // nature
    sun: "☀️", moon: "🌙", cloud: "☁️", rain: "🌧️",
    snow: "❄️", tree: "🌳", flower: "🌸", leaf: "🍃",

    // travel / objects
    car: "🚗", bike: "🏍️", plane: "✈️", train: "🚆",
    phone: "📱", laptop: "💻", camera: "📷",

    // activities
    run: "🏃", gym: "🏋️", dance: "💃", music: "🎵",
    study: "📚", book: "📖", work: "💼", play: "🎮",

    // money & success
    money: "💵", cash: "💰", rich: "🤑", success: "🏆",
    winner: "🏅", goal: "🎯",

    // misc / emotive
    party: "🥳", gift: "🎁", help: "🆘", idea: "💡",
    thumbs: "👍", clap: "👏", pray: "🙏", kiss: "😘",
    bug: "🐞", clock: "⏰", photo: "📸",

    // tech / web
    code: "💻", bug2: "🐛", server: "🖥️", cloudcomp: "☁️",

    // extended short forms
    brb: "⏳", asap: "⚡", gg: "🎮", hmm: "🤔",
  };

  // ======= Multi-language minimal mappings (Hindi & Tamil) =======
  // These map common words in native scripts (or transliteration) to emojis
  const hindiMap = {
    खुश: "😊", khush: "😊", प्यार: "❤️", pyaar: "❤️",
    दिल: "❤️", खाना: "🍔", चाय: "🍵", कॉफी: "☕",
    बिल्ली: "🐱", कुत्ता: "🐶", सूरज: "☀️", चाँद: "🌙",
    किताब: "📚", पढ़ाई: "📖", पैसा: "💵", पैसा है: "💰",
  };

  const tamilMap = {
    சந்தோஷம்: "😊", santhosham: "😊", காதல்: "❤️", kaadhal: "❤️",
    உணவு: "🍽️", katta: "🍔", பறவை: "🐦", மரம்: "🌳",
    புத்தகம்: "📚", வேலை: "💼", பணம்: "💵",
  };

  // ======= Smart fallback mapping synonyms =======
  const smartMapping = {
    good: "😊", great: "😊", excellent: "🌟",
    bad: "😞", bored: "🥱", scared: "😱",
    hungry: "🍽️", thirsty: "🥤",
    movie: "🎬", film: "🎬",
    song: "🎵", music: "🎵",
    run: "🏃", walk: "🚶",
    car: "🚗", bike: "🏍️",
  };

  // Merge dictionaries for easy lookup depending on language
  function lookupWord(word) {
    const w = word.toLowerCase().replace(/[^a-z\u0B80-\u0BFF\u0900-\u097F0-9]/gi, "");

    // language-specific first
    if (lang === "hi") {
      // check direct Devanagari or transliteration
      if (hindiMap[word]) return hindiMap[word];
      if (hindiMap[w]) return hindiMap[w];
    } else if (lang === "ta") {
      if (tamilMap[word]) return tamilMap[word];
      if (tamilMap[w]) return tamilMap[w];
    }

    // english lookup
    if (emojiDict[w]) return emojiDict[w];

    // smart synonyms
    if (smartMapping[w]) return smartMapping[w];

    return null;
  }

  // ======= Main translate function (called on button press) =======
  function translateText(text) {
    if (!text || !text.trim()) {
      setOutput("");
      return;
    }

    // preserve punctuation around words
    const words = text.split(/\s+/);

    const translated = words
      .map((raw) => {
        // capture non-letter prefix/suffix
        const prefix = raw.match(/^[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*/)?.[0] || "";
        const suffix = raw.match(/[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*$/)?.[0] || "";
        const core = raw.replace(/^[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]+|[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]+$/g, "");

        if (!core) return raw; // nothing to map

        const mapped = lookupWord(core) || lookupWord(core.toLowerCase()) || null;

        if (mapped) {
          return prefix + mapped + suffix;
        }

        // if no mapping, try to keep the original word
        return raw;
      })
      .join(" ");

    setOutput(translated);
  }

  // If autoReplace is toggled, run translate on each change
  function handleInputChange(v) {
    setInput(v);
    if (autoReplace) translateText(v);
  }

  // ======= Copy, download text, and download image =======
  const copyOutput = async () => {
    if (!output) return alert("Nothing to copy");
    try {
      await navigator.clipboard.writeText(output);
      alert("Emoji text copied to clipboard!");
    } catch (e) {
      alert("Copy failed: " + e.message);
    }
  };

  const downloadTxt = () => {
    if (!output) return alert("Nothing to download");
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emoji.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Draw a simple image (PNG) from the output text
  const downloadImage = () => {
    if (!output) return alert("Nothing to export as image");

    // prepare canvas size
    const lines = output.split("\n").flatMap((l) => {
      // wrap long lines roughly every 40 chars
      if (l.length <= 40) return [l];
      const chunks = [];
      for (let i = 0; i < l.length; i += 40) chunks.push(l.slice(i, i + 40));
      return chunks;
    });

    const padding = 30;
    const lineHeight = 38;
    const width = Math.max(400, ...lines.map((l) => l.length * 18)) + padding * 2;
    const height = lines.length * lineHeight + padding * 2;

    const canvas = document.createElement("canvas");
    canvas.width = Math.min(width, 2048);
    canvas.height = Math.min(height, 2048);

    const ctx = canvas.getContext("2d");
    // background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // text
    ctx.font = "28px system-ui, Arial";
    ctx.fillStyle = "#111827";
    ctx.textBaseline = "top";

    // draw each line
    const startX = padding;
    let y = padding;
    lines.forEach((ln) => {
      ctx.fillText(ln, startX, y);
      y += lineHeight;
    });

    // small footer
    ctx.font = "14px system-ui, Arial";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("Generated by MicroTools Hub • Emoji Translator", startX, canvas.height - padding - 14);

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "emoji.png";
    a.click();
  };

  // ======= Share links =======
  const shareWhatsApp = () => {
    if (!output) return alert("Nothing to share");
    const text = encodeURIComponent(output);
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, "_blank");
  };

  const shareX = () => {
    if (!output) return alert("Nothing to share");
    const text = encodeURIComponent(output + "\n\nvia @MicroToolsHub");
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <SEO
        title="Emoji Translator — Convert Text to Emojis Instantly | MicroTools Hub"
        description="Convert any text into fun emoji-enhanced messages. Free Emoji Translator with large dictionary, multi-language support, and sharing/export features."
        keywords="emoji translator, emoji converter, text to emoji, emoji generator"
      />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Emoji Translator</h1>

        <div className="p-4 bg-white border rounded shadow mb-6">
          <h2 className="font-semibold text-lg mb-2">How to use</h2>
          <ul className="list-disc ml-5 text-gray-700 leading-7">
            <li>Type your sentence in the input box below.</li>
            <li>Select the language (English, Hindi, Tamil) to improve replacements.</li>
            <li>Click <b>Translate</b> to convert words to emojis. Toggle <i>Auto Replace</i> to translate on typing.</li>
            <li>Use the Copy / Download / Share / Export buttons to save or share results.</li>
          </ul>
        </div>

        <div className="mb-4 flex gap-3 items-center">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="ta">Tamil (தமிழ்)</option>
          </select>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={autoReplace}
              onChange={(e) => setAutoReplace(e.target.checked)}
            />
            Auto Replace (translate while typing)
          </label>
        </div>

        <textarea
          className="w-full h-36 p-3 border rounded mb-4"
          placeholder="Type anything... (example: I am happy eating pizza)"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => translateText(input)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Translate
          </button>

          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        <div ref={previewRef} className="mb-6 p-4 bg-white border rounded shadow">
          <h3 className="font-semibold mb-2">Output</h3>
          {output ? (
            <>
              <p className="text-xl break-words">{output}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={copyOutput} className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-black">
                  Copy Text
                </button>

                <button onClick={downloadTxt} className="bg-gray-200 px-3 py-2 rounded">
                  Download .TXT
                </button>

                <button onClick={downloadImage} className="bg-gray-200 px-3 py-2 rounded">
                  Download as Image
                </button>

                <button onClick={shareWhatsApp} className="bg-green-500 text-white px-3 py-2 rounded hover:brightness-95">
                  Share → WhatsApp
                </button>

                <button onClick={shareX} className="bg-sky-500 text-white px-3 py-2 rounded hover:brightness-95">
                  Share → X
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No output yet — click Translate to convert text to emojis.</p>
          )}
        </div>

        {/* Extra small dictionary preview for users */}
        <section className="mt-6 p-4 bg-white border rounded shadow">
          <h4 className="font-semibold mb-2">Quick examples</h4>
          <p className="text-gray-700">
            Try: <code>I'm happy</code> → <code>I'm 😊</code> • <code>Love pizza</code> → <code>Love 🍕</code> •
            <code>paisa</code> (Hindi) → <code>💵</code>
          </p>
        </section>
      </div>
    </>
  );
}



