import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";
import { runFinalAction } from "../../utils/finalAction";

export default function ShortsDownloader() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p"];

  const fetchVideo = async () => {
    setError("");
    setInfo(null);

    if (!url.trim()) {
      setError("Please paste a valid YouTube Shorts URL.");
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
      console.error("YouTube Fetch Error:", err);
      setError("Failed to connect to server. Try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* ⭐⭐⭐ ULTRA OPTIMIZED SEO FOR TOP RANKING */}
      <SEO
        title="YouTube Shorts Downloader — Fast HD 1080p MP4 Download | MicroTools Hub"
        description="Download YouTube Shorts instantly in HD — 144p, 360p, 480p, 720p, 1080p MP4. Fast, secure, no watermark. 100% free YouTube Shorts downloader tool."
        keywords="youtube shorts downloader, download shorts mp4, yt shorts download hd, youtube 1080p shorts download, no watermark shorts downloader, shorts video save"
        schema={{
          "@context": "https://schema.org/",
          "@type": "WebApplication",
          "name": "YouTube Shorts Downloader",
          "url": "https://microtools-hub.com/tools/shorts",
          "applicationCategory": "VideoTool",
          "operatingSystem": "All",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1234"
          },
          "featureList": [
            "Download Shorts in MP4",
            "1080p, 720p, 480p, 360p available",
            "Fast fetch & no watermark",
            "Mobile friendly YouTube downloader"
          ]
        }}
        image="/og/shorts.png"
      />

      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">YouTube Shorts Downloader</h1>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li>Find a YouTube Short and tap <b>Share</b>, then <b>Copy Link</b>.</li>
                <li>Paste the copied link into the input box below.</li>
                <li>Click <b>Fetch Video</b> to get the download links.</li>
                <li>Choose your desired quality (e.g., 1080p, 720p) and download.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste YouTube Shorts URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                onClick={runFinalAction(fetchVideo)}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? 'Fetching...' : 'Fetch Video'}
              </button>
            </div>

            {error && <p className="text-red-500 text-center text-lg font-semibold">{error}</p>}

            {loading && (
              <div className="mt-8 p-6 border rounded-2xl bg-white shadow-lg animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            )}

            {info && !error && (
              <div className="mt-8 p-6 bg-white border rounded-2xl shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{info.title}</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={info.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full md:w-64 h-auto rounded-lg shadow-md"
                  />
                  <div className="flex-grow space-y-3">
                    {resolutions.map((res) =>
                      info.links?.[res] ? (
                        <a
                          key={res}
                          href={info.links[res]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center text-lg font-semibold transition-transform transform hover:scale-105"
                        >
                          Download {res}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}








