import { useState } from "react";
import SEO from "../../components/SEO";

export default function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [sentencesCount, setSentencesCount] = useState(3);
  const [summary, setSummary] = useState("");

  const splitSentences = (text) => {
    return text
      .match(/[^.!?]+[.!?]+/g)
      ?.map((s) => s.trim())
      .filter((s) => s.length > 0) || [text];
  };

  const summarize = () => {
    if (!inputText.trim()) {
      alert("Please enter text to summarize.");
      return;
    }

    const sentences = splitSentences(inputText);

    const words = inputText.toLowerCase().match(/\w+/g) || [];
    const freq = {};
    words.forEach((w) => {
      if (w.length > 2) freq[w] = (freq[w] || 0) + 1;
    });

    const scored = sentences.map((sentence) => {
      const sWords = sentence.toLowerCase().match(/\w+/g) || [];
      const score = sWords.reduce((total, w) => total + (freq[w] || 0), 0);
      return { sentence, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const selected = scored.slice(0, sentencesCount).map((s) => s.sentence);

    setSummary(selected.join(" "));
  };

  return (
    <>
      <SEO
        title="Text Summarizer — Smart Summary Generator | MicroTools Hub"
        description="Summarize essays, notes, paragraphs, assignments, and articles instantly using our smart summarizer. Fast, accurate, and works in the browser."
        keywords="summarizer, text summarizer, ai summary, shorten text, paragraph summarizer"
      />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Smart Text Summarizer
        </h1>

        {/* Instructions */}
        <div className="p-4 bg-white rounded-lg border shadow mb-6">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Paste your paragraph, essay, or article below.</li>
            <li>Select how many sentences you want in the summary.</li>
            <li>Click <strong>Summarize</strong> to generate a clean summary.</li>
            <li>Everything works offline in your browser.</li>
          </ul>
        </div>

        {/* Input */}
        <textarea
          className="w-full h-48 p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
          placeholder="Paste text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Options */}
        <div className="flex items-center gap-4 my-4">
          <span className="font-medium">Sentences:</span>

          <input
            type="number"
            min="1"
            max="10"
            value={sentencesCount}
            onChange={(e) => setSentencesCount(Number(e.target.value))}
            className="border p-2 w-20 rounded"
          />

          <button
            onClick={summarize}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Summarize
          </button>
        </div>

        {/* Output */}
        {summary && (
          <div className="p-5 bg-white border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="leading-7 text-gray-800">{summary}</p>
          </div>
        )}

        {/* SEO Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Free Online Text Summarizer — Reduce Any Content Instantly
          </h2>
          <p className="text-gray-700 leading-7 mb-4">
            Our Smart Summarizer extracts the most important sentences using a
            frequency-based scoring system. It's perfect for students, researchers,
            and writers who want fast and accurate summaries.
          </p>

          <p className="text-gray-700 leading-7">
            No login, no backend — everything runs privately in your browser.
          </p>
        </section>
      </div>
    </>
  );
}



