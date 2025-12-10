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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">Emoji Translator</h1>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">
                <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
                <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                    <li>Type your text in the input box.</li>
                    <li>Select the language of your text.</li>
                    <li>Click the <b>Translate</b> button to see the magic.</li>
                    <li>Your text with emojis will appear below.</li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                rows={5}
                placeholder="Type text here..."
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="flex flex-wrap gap-4 items-center my-4">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
              </select>

              <button
                onClick={runFinalAction(() => translateText(input))}
                disabled={!input.trim()}
                className="bg-indigo-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Translate
              </button>
            </div>

            {output && (
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border text-left">
                <textarea
                  value={output}
                  readOnly
                  rows={4}
                  className="w-full border rounded-lg p-3 text-lg bg-gray-100"
                />

                <div className="flex flex-wrap gap-4 mt-4">
                  <button onClick={runFinalAction(copyOutput)} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out">Copy</button>
                  <button onClick={runFinalAction(downloadTxt)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
