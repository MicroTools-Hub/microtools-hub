import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { runFinalAction } from "../../utils/finalAction";

export default function EmojiTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("en");
  const [autoReplace, setAutoReplace] = useState(false);
  const previewRef = useRef(null);

  // ========= EMOJI DICTIONARIES =========
  const emojiDict = {
    love: "❤️", heart: "❤️", like: "❤️",
    happy: "😊", joy: "😊", smile: "😊",
    sad: "😢", cry: "😭", angry: "😡",
    laugh: "😂", lol: "😂",
    cool: "😎", fire: "🔥", ok: "👌",
    yes: "✅", no: "❌",
    pizza: "🍕", burger: "🍔",
    coffee: "☕", tea: "🍵",
    cat: "🐱", dog: "🐶",
    sun: "☀️", moon: "🌙",
    car: "🚗", phone: "📱",
    study: "📚", work: "💼",
    money: "💵", success: "🏆",
    party: "🥳", gift: "🎁",
    idea: "💡", clap: "👏",
    pray: "🙏", kiss: "😘",
  };

  const hindiMap = {
    "खुश": "😊", khush: "😊",
    "प्यार": "❤️", pyaar: "❤️",
    "दिल": "❤️",
    "खाना": "🍔",
    "चाय": "🍵",
    "कॉफी": "☕",
    "बिल्ली": "🐱",
    "कुत्ता": "🐶",
    "सूरज": "☀️",
    "चाँद": "🌙",
    "किताब": "📚",
    "पैसा": "💵",
  };

  const tamilMap = {
    "சந்தோஷம்": "😊", santhosham: "😊",
    "காதல்": "❤️", kaadhal: "❤️",
    "உணவு": "🍽️",
    "பறவை": "🐦",
    "மரம்": "🌳",
    "புத்தகம்": "📚",
    "வேலை": "💼",
    "பணம்": "💵",
  };

  function lookupWord(word) {
    const clean = word.toLowerCase().replace(
      /[^a-z\u0900-\u097F\u0B80-\u0BFF]/gi,
      ""
    );

    if (lang === "hi" && hindiMap[clean]) return hindiMap[clean];
    if (lang === "ta" && tamilMap[clean]) return tamilMap[clean];
    if (emojiDict[clean]) return emojiDict[clean];

    return null;
  }

  function translateText(text) {
    if (!text.trim()) {
      setOutput("");
      return;
    }

    const words = text.split(/\s+/);
    const translated = words
      .map((w) => {
        const emoji = lookupWord(w);
        return emoji ? emoji : w;
      })
      .join(" ");

    setOutput(translated);
  }

  function handleInputChange(v) {
    setInput(v);
    if (autoReplace) translateText(v);
  }

  const copyOutput = async () => {
    if (!output) return alert("Nothing to copy");
    await navigator.clipboard.writeText(output);
    alert("Copied ✅");
  };

  const downloadTxt = () => {
    if (!output) return alert("Nothing to download");

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "emoji.txt";
    a.click();
  };

  return (
    <>
      <SEO
        title="Emoji Translator – Convert Text to Emojis Online | MicroTools Hub"
        description="Convert text to emojis instantly. Supports English, Hindi & Tamil."
      />

      <ToolLayout>
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">Emoji Translator</h1>

        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          rows={5}
          placeholder="Type text here..."
          className="w-full border rounded p-3"
        />

        <div className="flex gap-3 items-center">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          </select>

          <button
            onClick={runFinalAction(() => translateText(input))}
            disabled={!input.trim()}
            className="bg-indigo-600 disabled:opacity-60 text-white px-4 py-2 rounded"
          >
            Translate
          </button>
        </div>

        {output && (
          <>
            <textarea
              value={output}
              readOnly
              rows={4}
              className="w-full border rounded p-3 bg-gray-50"
            />

            <div className="flex gap-3">
              <button onClick={runFinalAction(copyOutput)} className="bg-gray-900 text-white px-4 py-2 rounded">Copy</button>
              <button onClick={runFinalAction(downloadTxt)} className="bg-green-600 text-white px-4 py-2 rounded">Download</button>
            </div>
          </>
        )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}








