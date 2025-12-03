// /pages/tools/emoji.js
import { useState, useRef } from "react";
import SEO from "../../components/SEO";

export default function EmojiTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("en");
  const [autoReplace, setAutoReplace] = useState(false);
  const previewRef = useRef(null);

  // ======= Big emoji dictionary (english keys) =======
  const emojiDict = {
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

    pizza: "🍕", burger: "🍔", fries: "🍟",
    cake: "🎂", coffee: "☕", tea: "🍵",
    food: "🍽️", snack: "🍿", drink: "🥤",

    cat: "🐱", dog: "🐶", lion: "🦁", tiger: "🐯",
    panda: "🐼", monkey: "🐒", bird: "🐦", fish: "🐟",

    sun: "☀️", moon: "🌙", cloud: "☁️", rain: "🌧️",
    snow: "❄️", tree: "🌳", flower: "🌸", leaf: "🍃",

    car: "🚗", bike: "🏍️", plane: "✈️", train: "🚆",
    phone: "📱", laptop: "💻", camera: "📷",

    run: "🏃", gym: "🏋️", dance: "💃", music: "🎵",
    study: "📚", book: "📖", work: "💼", play: "🎮",

    money: "💵", cash: "💰", rich: "🤑", success: "🏆",
    winner: "🏅", goal: "🎯",

    party: "🥳", gift: "🎁", help: "🆘", idea: "💡",
    thumbs: "👍", clap: "👏", pray: "🙏", kiss: "😘",
    bug: "🐞", clock: "⏰", photo: "📸",

    code: "💻", bug2: "🐛", server: "🖥️", cloudcomp: "☁️",

    brb: "⏳", asap: "⚡", gg: "🎮", hmm: "🤔",
  };

  // ======= Multi-language minimal mappings (Hindi & Tamil) =======
  const hindiMap = {
    "खुश": "😊", "khush": "😊",
    "प्यार": "❤️", "pyaar": "❤️",
    "दिल": "❤️",
    "खाना": "🍔",
    "चाय": "🍵",
    "कॉफी": "☕",
    "बिल्ली": "🐱",
    "कुत्ता": "🐶",
    "सूरज": "☀️",
    "चाँद": "🌙",
    "किताब": "📚",
    "पढ़ाई": "📖",
    "पैसा": "💵",
    "पैसा है": "💰"
  };

  const tamilMap = {
    "சந்தோஷம்": "😊", "santhosham": "😊",
    "காதல்": "❤️", "kaadhal": "❤️",
    "உணவு": "🍽️",
    "katta": "🍔",
    "பறவை": "🐦",
    "மரம்": "🌳",
    "புத்தகம்": "📚",
    "வேலை": "💼",
    "பணம்": "💵"
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

  function lookupWord(word) {
    const w = word.toLowerCase().replace(/[^a-z\u0B80-\u0BFF\u0900-\u097F0-9]/gi, "");

    if (lang === "hi") {
      if (hindiMap[word]) return hindiMap[word];
      if (hindiMap[w]) return hindiMap[w];
    } else if (lang === "ta") {
      if (tamilMap[word]) return tamilMap[word];
      if (tamilMap[w]) return tamilMap[w];
    }

    if (emojiDict[w]) return emojiDict[w];
    if (smartMapping[w]) return smartMapping[w];

    return null;
  }

  function translateText(text) {
    if (!text || !text.trim()) {
      setOutput("");
      return;
    }

    const words = text.split(/\s+/);

    const translated = words
      .map((raw) => {
        const prefix = raw.match(/^[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*/)?.[0] || "";
        const suffix = raw.match(/[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*$/)?.[0] || "";

        const core = raw.replace(
          /^[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]+|[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]+$/g,
          ""
        );

        if (!core) return raw;

        const mapped = lookupWord(core) || lookupWord(core.toLowerCase());

        return mapped ? prefix + mapped + suffix : raw;
      })
      .join(" ");

    setOutput(translated);
  }

  function handleInputChange(v) {
    setInput(v);
    if (autoReplace) translateText(v);
  }

  // ======= Copy, TXT, Image Export =======
  const copyOutput = async () => {
    if (!output) return alert("Nothing to copy");
    await navigator.clipboard.writeText(output);
    alert("Emoji text copied to clipboard!");
  };

  const downloadTxt = () => {
    if (!output) return alert("Nothing to download");
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "emoji.txt";
    a.click();
  };

  const downloadImage = () => {
    if (!output) return alert("Nothing to export");

    const lines = output.split("\n").flatMap((l) => {
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
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px system-ui, Arial";
    ctx.fillStyle = "#111";
    ctx.textBaseline = "top";

    let y = padding;
    lines.forEach((ln) => {
      ctx.fillText(ln, padding, y);
      y += lineHeight;
    });

    ctx.font = "14px system-ui, Arial";
    ctx.fillStyle = "#666";
    ctx.fillText(
      "Generated by MicroTools Hub • Emoji Translator",
      padding,
      canvas.height - padding - 14
    );

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "emoji.png";
    a.click();
  };

  const shareWhatsApp = () => {
    if (!output) return alert("Nothing to share");
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(output)}`);
  };

  const shareX = () => {
    if (!output) return alert("Nothing to share");
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        output + "\n\nvia @MicroToolsHub"
      )}`
    );
  };

  return (
    <>
      {/* 🔥 FULL PROFESSIONAL SEO UPGRADED */}
      <SEO
        title="Emoji Translator – Convert Text to Emojis Online (Free) | MicroTools Hub"
        description="Translate text into emojis instantly with the free Emoji Translator. Supports English, Hindi, Tamil & smart emoji auto-replacement. Generate emoji messages, download as image, and share to WhatsApp or X."
        keywords="emoji translator, emoji converter, text to emoji, emoji sentence generator, hindi emoji translator, tamil emoji translator, emoji caption generator"
        image="/og/emoji-translator.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Emoji Translator – MicroTools Hub",
          url: "https://microtools-hub.vercel.app/tools/emoji",
          category: "Utility",
          applicationCategory: "ProductivityApplication",
          description:
            "Convert words into emojis instantly. Supports English, Hindi, Tamil. Export emoji text as PNG, TXT, or share online.",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* ⭐ FAQ Rich Schema (BOOST SEO RANKING) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an emoji translator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An emoji translator converts words into emojis automatically for fun messages, captions, and chats.",
                },
              },
              {
                "@type": "Question",
                name: "Does this emoji translator support Hindi and Tamil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, it supports English, Hindi, and Tamil words including script-based and transliterated text.",
                },
              },
              {
                "@type": "Question",
                name: "Can I download the emoji text?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can download the emoji output as PNG, export as .txt, copy it, or share directly.",
                },
              },
            ],
          }),
        }}
      />

      {/* UI below (unchanged) */}
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Emoji Translator</h1>

        <div className="p-4 bg-white border rounded shadow mb-6">
          <h2 className="font-semibold text-lg mb-2">How to use</h2>
          <ul className="list-disc ml-5 text-gray-700 leading-7">
            <li>Type your sentence in the input box below.</li>
            <li>Select the language (English, Hindi, Tamil).</li>
            <li>Click <b>Translate</b> or enable Auto Replace.</li>
            <li>Copy, Download, Share or Export the emoji text.</li>
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
                <button onClick={shareWhatsApp} className="bg-green-500 text-white px-3 py-2 rounded">
                  Share → WhatsApp
                </button>
                <button onClick={shareX} className="bg-sky-500 text-white px-3 py-2 rounded">
                  Share → X
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No output yet — click Translate to convert text to emojis.</p>
          )}
        </div>

        <section className="mt-6 p-4 bg-white border rounded shadow">
          <h4 className="font-semibold mb-2">Quick examples</h4>
          <p className="text-gray-700">
            Try: <code>I'm happy</code> → <code>I'm 😊</code> •
            <code> Love pizza</code> → <code>Love 🍕</code> •
            <code> paisa</code> (Hindi) → <code>💵</code>
          </p>
        </section>
      </div>
    </>
  );
}





