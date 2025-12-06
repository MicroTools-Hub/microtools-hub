// /pages/tools/facebook.js
import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config.js";
import { runFinalAction } from "../../utils/finalAction";

export default function FacebookDownloader() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    setLoading(true);
    const res = await fetch(`${BACKEND}/api/facebook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setInfo(data);
    setLoading(false);
  };

  // ✅ FINAL ACTION → popunder here
  const downloadVideo = runFinalAction(() => {
    const link = document.createElement("a");
    link.href = `${BACKEND}/download?url=${encodeURIComponent(url)}&format=best`;
    link.click();
  });

  return (
    <>
      <SEO
        title="Facebook Video Downloader — MicroTools Hub"
        description="Download Facebook videos fast"
      />

      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Facebook Video Downloader
        </h1>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border rounded mb-3"
          placeholder="Paste Facebook video URL"
        />

        <button
          onClick={fetchVideo}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Fetch
        </button>

        {loading && <p className="mt-3">Loading…</p>}

        {info && (
          <button
            onClick={downloadVideo}
            className="block mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>
        )}
      </div>
    </>
  );
}

