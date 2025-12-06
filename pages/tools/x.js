// /pages/tools/x.js
import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config";

export default function XDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadVideo = () => {
    if (!url.trim()) {
      setError("Please paste a valid X / Twitter URL.");
      return;
    }

    setError("");
    setLoading(true);

    // ✅ Direct file download (correct way)
    window.location.href = `${BACKEND}/api/download/twitter?url=${encodeURIComponent(
      url
    )}`;

    // stop loader after short delay
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <SEO
        title="X (Twitter) Video Downloader — Free & Fast | MicroTools Hub"
        description="Download X (Twitter) videos in HD instantly. No watermark, no signup, 100% free."
        keywords="x video downloader, twitter video download, twitter mp4"
      />

      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          X / Twitter Video Downloader
        </h1>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste X / Twitter post URL"
          className="w-full p-3 border rounded mb-3 focus:ring focus:ring-indigo-300"
        />

        <button
          onClick={downloadVideo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Downloading..." : "Download Video"}
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}

        <p className="mt-4 text-sm text-gray-600">
          ✅ Works for both twitter.com and x.com links
        </p>
      </div>
    </>
  );
}


