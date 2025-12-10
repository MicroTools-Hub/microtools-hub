// /pages/tools/tiktok.js
import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function TikTokDownloader(){
  const [url,setUrl]=useState(""); const [info,setInfo]=useState(null); const [loading,setLoading]=useState(false);
  const fetchVideo = async ()=> {
    setLoading(true);
    const res = await fetch(`${BACKEND}/api/tiktok`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({url})});
    const data = await res.json(); setInfo(data); setLoading(false);
  };
  return (<>
    <SEO title="TikTok Downloader — MicroTools Hub" description="Download TikTok videos" />
    <ToolLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">TikTok Video Downloader</h1>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
            <p className="font-bold">Important Notice:</p>
            <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">
            <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
            <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
              <li>Open TikTok and find a video you want to download.</li>
              <li>Tap the <b>Share</b> button, then select <b>Copy Link</b>.</li>
              <li>Paste the link into the box below and click <b>Fetch Video</b>.</li>
              <li>Click <b>Download Video</b> to save the MP4 file.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste TikTok video URL"
            />
            <button
              onClick={runFinalAction(fetchVideo)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Video"}
            </button>
          </div>

          {loading && <p className="mt-4 text-indigo-600 font-semibold animate-pulse">Fetching video details...</p>}
          
          {info && (
            <div className="mt-8">
              <a
                href={`${BACKEND}/download?url=${encodeURIComponent(url)}&format=best`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
              >
                Download Video
              </a>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  </>);
}
