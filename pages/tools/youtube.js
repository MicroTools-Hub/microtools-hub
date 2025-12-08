import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p"];

  const fetchVideo = async () => {
    setError("");
    setInfo(null);

    if (!url.trim()) {
      setError("Please paste a valid YouTube URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/youtube`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.error) setError(data.error);
      else setInfo(data);
    } catch (err) {
      console.error("YOUTUBE FETCH ERROR:", err);
      setError("Failed to connect to server. Try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <SEO
        title="YouTube Video Downloader — Free HD MP4 (144p–1080p) | MicroTools Hub"
        description="Download YouTube videos in HD, Full HD, 1080p, 720p, 480p, 360p, and more. Fast, clean, mobile-friendly YouTube MP4 downloader with no ads."
        keywords="youtube downloader, youtube video download, yt mp4 download, 1080p youtube downloader, download youtube video hd, youtube video mp4, online youtube downloader"
        image="/og/youtube.png"
      />

      <ToolLayout>
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">YouTube Video Downloader</h1>

            <div className="p-4 bg-white rounded-2xl shadow-sm border mb-6">
              <h2 className="font-semibold text-lg mb-2">How to Use</h2>
              <ul className="list-disc ml-5 text-gray-700 leading-7">
                <li>Open any YouTube video</li>
                <li>Tap <strong>Share → Copy Link</strong></li>
                <li>Paste the link below</li>
                <li>Click <strong>Fetch Video</strong></li>
                <li>Select a quality (144p–1080p)</li>
                <li>Download instantly as MP4</li>
              </ul>
            </div>

            <input
              className="w-full max-w-full p-3 border rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste YouTube video URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={fetchVideo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto text-center transition"
            >
              Fetch Video
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {loading && (
              <div className="mt-6 p-4 bg-white rounded-2xl shadow-sm border animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-56 bg-gray-300 rounded mb-3"></div>
                <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            )}

            {info && !error && (
              <div className="mt-6 p-4 bg-white rounded-2xl shadow-sm border">
                <h2 className="text-xl font-semibold mb-3">{info.title}</h2>

                <img src={info.thumbnail} className="w-64 rounded mb-4 shadow" alt="thumbnail" />

                <div className="space-y-3">
                  {resolutions.map((res) =>
                    info.links?.[res] ? (
                      <button
                        key={res}
                        onClick={runFinalAction(() => {
                          const a = document.createElement("a");
                          a.href = info.links[res];
                          a.rel = "noopener";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        })}
                        className="block bg-gray-100 py-3 rounded-lg text-center border hover:bg-gray-200 transition font-medium"
                      >
                        Download {res}
                      </button>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}









