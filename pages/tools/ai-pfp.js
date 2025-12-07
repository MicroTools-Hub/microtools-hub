// /pages/tools/ai-pfp.js
import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";


export default function AIPFP(){
  const [prompt, setPrompt] = useState("studio portrait, closeup, dramatic lighting");
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  const generate = async () => {
    setLoading(true);

    const res = await fetch(`${BACKEND}/api/ai-pfp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setJob(data);
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="AI PFP Maker — MicroTools Hub"
        description="Create AI profile pictures"
      />

      <ToolLayout>
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          AI PFP Maker
        </h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border rounded mb-3"
        />

        <button
          onClick={generate}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        {loading && <p>Generating... this may take 30–60s.</p>}

        {job && (
          <pre className="mt-3 p-3 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(job, null, 2)}
          </pre>
        )}
      </ToolLayout>
    </>
  );
}

