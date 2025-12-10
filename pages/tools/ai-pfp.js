import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function AIPFP() {
  const [prompt, setPrompt] = useState("studio portrait, closeup, dramatic lighting");
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  const generate = async () => {
    if (!prompt || !prompt.trim()) return alert("Please enter a prompt");
    setLoading(true);
    setJob(null);
    try {
      const res = await fetch(`${BACKEND}/api/ai-pfp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setJob(data);
    } catch (err) {
      console.error("AI PFP error:", err);
      alert("Failed to generate. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="AI PFP Maker — MicroTools Hub" description="Create AI profile pictures" />

      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">AI PFP Generator</h1>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">
                <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
                <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                    <li>Enter a descriptive prompt for your desired profile picture.</li>
                    <li>Click the <b>Generate</b> button.</li>
                    <li>Your AI-generated PFP will appear below.</li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
                placeholder="Enter a prompt for your AI PFP"
              />
              <button
                onClick={runFinalAction(generate)}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>

            {loading && <p className="mt-4 text-indigo-600 font-semibold animate-pulse">Generating your PFP...</p>}

            {job && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border overflow-hidden">
                <pre className="p-4 text-sm overflow-auto">{JSON.stringify(job, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
