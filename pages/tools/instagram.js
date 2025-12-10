// /pages/tools/instagram.js
import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";
import { runFinalAction } from "../../utils/finalAction";


export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const fetchVideo = async () => {
    setError(""); setDownloadLink(""); if (!url) return setError("Paste an Instagram URL");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/instagram`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.error) setError(data.error || "Failed");
      else {
        // we return a generic download link that points to /download
        setDownloadLink(`${BACKEND}/download?url=${encodeURIComponent(url)}&format=best`);
      }
    } catch (err) { setError("Server error"); }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Instagram Downloader — MicroTools Hub" description="Download Instagram photos & videos" />
      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">Instagram Downloader</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste Instagram post or reel URL"
              />
              <button
                onClick={runFinalAction(fetchVideo)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch"}
              </button>
            </div>

            {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}
            
            {downloadLink && (
              <div className="mt-8">
                <a
                  href={downloadLink}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Media
                </a>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
