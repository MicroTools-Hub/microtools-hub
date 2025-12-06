// /pages/tools/emoji.js
import { useState, useRef } from "react";
import SEO from "../../components/SEO";
import { runFinalAction } from "../../utils/finalAction";


export default function EmojiTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("en");
  const [autoReplace, setAutoReplace] = useState(false);
  const previewRef = useRef(null);

  // ======= Big emoji dictionary (english keys) =======
  const emojiDict = {
    love: "❤️",
    heart: "❤️",
    like: "❤️",
    happy: "😊",
    joy: "😊",
    smile: "😊",
    sad: "😢",
    upset: "😢",
    cry: "😭",
    angry: "😡",
    mad: "😡",
    laugh: "😂",
    funny: "😂",
    lol: "😂",
    cool: "😎",
    chill: "😌",
    fire: "🔥",
    lit: "🔥",
    hot: "🔥",
    star: "⭐",
    shine: "✨",
    ok: "👌",
    yes: "✅",
    no: "❌",
    wow: "😮",
    shocked: "😲",
    sleep: "😴",
    tired: "😪",

    pizza: "🍕",
    burger: "🍔",
    fries: "🍟",
    cake: "🎂",
    coffee: "☕",
    tea: "🍵",
    food: "🍽️",
    snack: "🍿",
    drink: "🥤",

    cat: "🐱",
    dog: "🐶",
    lion: "🦁",
    tiger: "🐯",
    panda: "🐼",
    monkey: "🐒",
    bird: "🐦",
    fish: "🐟",

    sun: "☀️",
    moon: "🌙",
    cloud: "☁️",
    rain: "🌧️",
    snow: "❄️",
    tree: "🌳",
    flower: "🌸",
    leaf: "🍃",

    car: "🚗",
    bike: "🏍️",
    plane: "✈️",
    train: "🚆",
    phone: "📱",
    laptop: "💻",
    camera: "📷",

    run: "🏃",
    gym: "🏋️",
    dance: "💃",
    music: "🎵",
    study: "📚",
    book: "📖",
    work: "💼",
    play: "🎮",

    money: "💵",
    cash: "💰",
    rich: "🤑",
    success: "🏆",
    winner: "🏅",
    goal: "🎯",

    party: "🥳",
    gift: "🎁",
    help: "🆘",
    idea: "💡",
    thumbs: "👍",
    clap: "👏",
    pray: "🙏",
    kiss: "😘",
    bug: "🐞",
    clock: "⏰",
    photo: "📸",

    code: "💻",
    bug2: "🐛",
    server: "🖥️",
    cloudcomp: "☁️",

    brb: "⏳",
    asap: "⚡",
    gg: "🎮",
    hmm: "🤔",
  };

  // ======= Hindi & Tamil mappings =======
  const hindiMap = {
    "खुश": "😊",
    khush: "😊",
    "प्यार": "❤️",
    pyaar: "❤️",
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
    "पैसा है": "💰",
  };

  const tamilMap = {
    "சந்தோஷம்": "😊",
    santhosham: "😊",
    "காதல்": "❤️",
    kaadhal: "❤️",
    "உணவு": "🍽️",
    katta: "🍔",
    "பறவை": "🐦",
    "மரம்": "🌳",
    "புத்தகம்": "📚",
    "வேலை": "💼",
    "பணம்": "💵",
  };

  const smartMapping = {
    good: "😊",
    great: "😊",
    excellent: "🌟",
    bad: "😞",
    bored: "🥱",
    scared: "😱",
    hungry: "🍽️",
    thirsty: "🥤",
    movie: "🎬",
    film: "🎬",
    song: "🎵",
    music: "🎵",
    run: "🏃",
    walk: "🚶",
    car: "🚗",
    bike: "🏍️",
  };

  function lookupWord(word) {
    const w = word
      .toLowerCase()
      .replace(/[^a-z\u0B80-\u0BFF\u0900-\u097F0-9]/gi, "");

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
``
  function translateText(text) {
    if (!text || !text.trim()) {
      setOutput("");
      return;
    }

    const words = text.split(/\s+/);

    const translated = words
      .map((raw) => {
        const prefix =
          raw.match(/^[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*/)?.[0] || "";
        const suffix =
          raw.match(/[^0-9A-Za-z\u0900-\u097F\u0B80-\u0BFF]*$/)?.[0] || "";

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

  const copyOutput = async () => {
    if (!output) return alert("Nothing to copy");
    await navigator.clipboard.writeText(output);
    alert("Emoji text copied to clipboard!");
  };

  const downloadTxt = runFinalAction(() => {
    if (!output) return alert("Nothing to download");
    const blob = new Blob([output], {
      type: "text/plain;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "emoji.txt";
    a.click();
  });

  const downloadImage = () => {
    if (!output) return alert("Nothing to export");

    const lines = output.split("\n");
    const padding = 30;
    const lineHeight = 38;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = lines.length * lineHeight + padding * 2;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px system-ui, Arial";
    ctx.fillStyle = "#111";

    let y = padding;
    lines.forEach((ln) => {
      ctx.fillText(ln, padding, y);
      y += lineHeight;
    });

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "emoji.png";
    a.click();
  };

  const shareWhatsApp = () => {
    if (!output) return alert("Nothing to share");
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(output)}`
    );
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
      <SEO
        title="Emoji Translator – Convert Text to Emojis Online (Free) | MicroTools Hub"
        description="Translate text into emojis instantly with the free Emoji Translator."
      />

      <div className="max-w-3xl mx-auto p-6">
        {/* UI unchanged */}
      </div>
    </>
  );
}







