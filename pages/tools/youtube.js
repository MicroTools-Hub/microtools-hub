import { useState } from "react";
import SEO from "../../components/SEO";
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
      {/* ⭐⭐⭐ ELITE SEO FOR YOUTUBE DOWNLOADER */}
      <SEO
        title="YouTube Video Downloader — Free HD MP4 (144p–1080p) | MicroTools Hub"
        description="Download YouTube videos in HD, Full HD, 1080p, 720p, 480p, 360p, and more. Fast, clean, mobile-friendly YouTube MP4 downloader with no ads."
        keywords="youtube downloader, youtube video download, yt mp4 download, 1080p youtube downloader, download youtube video hd, youtube video mp4, online youtube downloader"
        image="/og/youtube.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "YouTube Video Downloader",
          "applicationCategory": "Multimedia",
          "operatingSystem": "Any",
          "url": "https://microtools-hub.com/tools/youtube",
          "description":
            "Free online YouTube downloader for HD/Full HD videos. Supports 144p, 360p, 480p, 720p, 1080p MP4 downloads instantly.",
          "featureList": [
            "HD & Full HD downloads",
            "Fast MP4 conversion",
            "Mobile-friendly",
            "Supports 144p–1080p",
            "No login required"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1287"
          }
        }}
      />

      <div className="max-w-3xl mx-auto p-4">

        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          YouTube Video Downloader
        </h1>

        {/* How to use */}
        <div className="p-4 bg-white border rounded-lg shadow mb-6">
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

        {/* URL Input */}
        <input
          className="w-full p-3 border rounded-lg shadow-sm mb-4 focus:ring focus:ring-indigo-300"
          placeholder="Paste YouTube video URL..."
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

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 p-4 bg-white border rounded-lg shadow animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
            <div className="h-56 bg-gray-300 rounded mb-3"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        )}

        {/* Display result */}
        {info && !error && (
          <div className="mt-6 p-4 bg-white border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">{info.title}</h2>

            <img
              src={info.thumbnail}
              className="w-64 rounded mb-4 shadow"
              alt="thumbnail"
            />

            {/* Download buttons */}
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









