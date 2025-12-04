// /pages/tools/instagram.js
import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config";

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
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Instagram Downloader</h1>
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full p-3 border rounded mb-3" placeholder="Paste Instagram post / reel URL" />
        <button onClick={fetchVideo} className="bg-indigo-600 text-white px-6 py-2 rounded">Fetch</button>
        {loading && <p className="mt-3">Fetching...</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {downloadLink && <a href={downloadLink} className="block mt-4 bg-green-600 text-white px-4 py-2 rounded">Download</a>}
      </div>
    </>
  );
}
