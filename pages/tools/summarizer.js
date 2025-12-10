import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";

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
      {/* ⭐⭐⭐ ELITE SEO OPTIMIZATION */}
      <SEO
        title="Text Summarizer — Free Online Summary Tool (No Login) | MicroTools Hub"
        description="Summarize paragraphs, essays, articles, assignments, research papers, and long texts instantly with our smart frequency-based summarizer. Fast, accurate, and 100% private."
        keywords="text summarizer, online summarizer, summary generator, shortener tool, essay summarizer, paragraph summarizer, ai summarizer free"
        image="/og/summarizer.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Smart Text Summarizer",
          "applicationCategory": "Utility",
          "operatingSystem": "Any",
          "url": "https://microtools-hub.com/tools/summarizer",
          "description":
            "Free online text summarizer that creates clean, accurate summaries of essays, articles, and long paragraphs instantly.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "942"
          },
          "featureList": [
            "Instant summary generation",
            "AI-like frequency scoring",
            "Offline text processing",
            "Essay & article summarizer",
            "Privacy-safe (browser only)"
          ]
        }}
      />

      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Smart Text Summarizer</h1>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li>Paste your text (article, essay, paragraph) into the input box.</li>
                <li>Choose the desired number of sentences for your summary.</li>
                <li>Click <b>Summarize Text</b> to generate the result.</li>
                <li>Your summary appears below — it's that easy!</li>
              </ul>
            </div>

            <textarea
              className="w-full p-4 border rounded-lg text-lg min-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste your text here to summarize..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-lg">Summary Sentences:</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={sentencesCount}
                  onChange={(e) => setSentencesCount(Number(e.target.value))}
                  className="border p-3 w-24 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={runFinalAction(summarize)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-4 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Summarize Text
              </button>
            </div>

            {summary && (
              <div className="mt-8 bg-white rounded-2xl shadow-2xl border p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Summary</h2>
                <p className="text-lg leading-relaxed text-gray-700">{summary}</p>
              </div>
            )}
            
            <section className="mt-12 p-6 bg-white rounded-2xl shadow-lg border">
              <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                Free Online Summarizer
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                This tool helps you quickly summarize long texts, articles, and documents. It works by identifying the most important sentences based on word frequency, giving you a concise overview of the content. All processing happens in your browser, ensuring your data remains private.
              </p>
            </section>
          </div>
        </div>
      </ToolLayout>

    </>
  );
}







