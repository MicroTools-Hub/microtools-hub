import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

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

    // ✅ direct backend download
    window.location.href = `${BACKEND}/api/download/twitter?url=${encodeURIComponent(
      url
    )}`;

    // stop loader shortly (UI only)
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <SEO
        title="X (Twitter) Video Downloader — Free & Fast | MicroTools Hub"
        description="Download X (Twitter) videos in HD instantly. No watermark, no signup, 100% free."
        keywords="x video downloader, twitter video download, twitter mp4"
      />

      <ToolLayout>
        <h1 className="text-3xl font-bold text-indigo-600">
          X / Twitter Video Downloader
        </h1>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste X / Twitter post URL"
          className="w-full p-3 border rounded focus:ring focus:ring-indigo-300"
        />

        <button
          onClick={downloadVideo}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-6 py-2 rounded"
        >
          {loading ? "Downloading…" : "Download Video"}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        <p className="text-sm text-gray-600">
          ✅ Works with both twitter.com and x.com links
        </p>
      </ToolLayout>
    </>
  );
}


