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
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">AI PFP Generator</h1>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full max-w-full p-3 border rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="mt-4">
              <button
                onClick={runFinalAction(generate)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto text-center transition"
                disabled={loading}
              >
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>

            {job && (
              <pre className="mt-4 p-3 bg-white rounded-2xl shadow-sm border overflow-auto">{JSON.stringify(job, null, 2)}</pre>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}


