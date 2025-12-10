// Cleaned Facebook downloader component — single, authoritative copy
import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-6">
              Facebook Video Downloader
            </h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste Facebook video URL"
              />
              <button
                onClick={runFinalAction(fetchVideo)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Fetching…" : "Fetch"}
              </button>
            </div>

            {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}

            {info && (
              <div className="mt-8">
                <button
                  onClick={runFinalAction(downloadVideo)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg w-full sm:w-auto transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Download Video
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}


