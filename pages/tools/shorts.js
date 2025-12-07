import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config.js";

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

      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          YouTube Shorts Downloader
        </h1>

        {/* Instructions */}
        <div className="p-4 bg-white border rounded-lg shadow mb-6">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Open YouTube Shorts and tap <strong>Share → Copy Link</strong></li>
            <li>Paste the link in the box below</li>
            <li>Click <strong>Fetch Video</strong></li>
            <li>Choose your download quality (144p–1080p)</li>
            <li>Download instantly in MP4 format</li>
          </ul>
        </div>

        {/* URL Input */}
        <input
          className="w-full p-3 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-indigo-300"
          placeholder="Paste Shorts URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={fetchVideo}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition w-full sm:w-auto"
        >
          Fetch Video
        </button>


        {/* Error */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-6 p-4 border rounded-lg bg-white shadow animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-40 bg-gray-300 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        )}

        {/* Result */}
        {info && !error && (
          <div className="mt-6 p-4 bg-white border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{info.title}</h2>

            <img
              src={info.thumbnail}
              alt="thumbnail"
              className="w-60 rounded mb-4 shadow"
            />

            <div className="space-y-3">
              {resolutions.map((res) =>
                info.links?.[res] ? (
                  <a
                    key={res}
                    href={info.links[res]}
                    className="block bg-gray-100 py-3 rounded-lg text-center border hover:bg-gray-200 transition font-medium"
                  >
                    Download {res}
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}








