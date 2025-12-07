// Cleaned Facebook downloader component — single, authoritative copy
import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function FacebookDownloader() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideo = async () => {
    setError("");
    setInfo(null);

    if (!url || !url.trim()) {
      setError("Please paste a valid Facebook URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Server returned an error while fetching the video.");
      } else {
        setInfo(data);
      }
    } catch (err) {
      console.error("FACEBOOK FETCH ERROR:", err);
      setError("Failed to connect to server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = () => {
    const downloadUrl = info?.url || `${BACKEND}/download?url=${encodeURIComponent(url)}&format=best`;
    try {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.rel = "noopener";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("DOWNLOAD ERROR:", err);
      setError("Unable to start download. You can open the link manually: " + downloadUrl);
    }
  };

  return (
    <>
      <SEO
        title="Facebook Video Downloader — MicroTools Hub"
        description="Download Facebook videos fast"
      />

      <ToolLayout>
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
          disabled={loading}
        >
          {loading ? "Fetching…" : "Fetch"}
        </button>

        {error && <p className="mt-3 text-red-600">{error}</p>}

        {info && (
          <button
            onClick={downloadVideo}
            className="block mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>
        )}
      </ToolLayout>
    </>
  );
}


