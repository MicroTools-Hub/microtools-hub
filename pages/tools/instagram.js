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
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">Instagram Downloader</h1>
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full p-3 border rounded mb-3" placeholder="Paste Instagram post / reel URL" />
        <button onClick={fetchVideo} className="bg-indigo-600 text-white px-6 py-2 rounded">Fetch</button>
        {loading && <p className="mt-3">Fetching...</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {downloadLink && (
          <button
            onClick={runFinalAction(() => {
              const a = document.createElement("a");
              a.href = downloadLink;
              a.rel = "noopener";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            })}
            className="block mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>
        )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
