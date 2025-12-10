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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">
              YouTube Video Downloader
            </h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a download button may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your download here.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">
                How to Use
              </h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li>Open any YouTube video</li>
                <li>
                  Tap <strong>Share → Copy Link</strong>
                </li>
                <li>Paste the link into the box below</li>
                <li>
                  Click <strong>Fetch Video</strong>
                </li>
                <li>Select a quality (144p–1080p)</li>
                <li>Download instantly as MP4</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube video URL"
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={runFinalAction(fetchVideo)}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Fetching..." : "Fetch Video"}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-red-500 text-lg font-semibold">
                {error}
              </p>
            )}

            {loading && (
              <div className="mt-6 p-4 bg-white rounded-2xl shadow-sm border animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-56 bg-gray-300 rounded mb-3"></div>
                <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            )}

            {info && !error && (
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border text-left">
                <h2 className="text-2xl font-bold mb-4">{info.title}</h2>

                <img
                  src={info.thumbnail}
                  className="w-full max-w-sm mx-auto rounded-lg mb-6 shadow-md"
                  alt="thumbnail"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full bg-gray-100 py-3 rounded-lg text-center border hover:bg-gray-200 transition font-medium text-lg"
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
