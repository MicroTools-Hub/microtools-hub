// /pages/tools/tiktok.js
import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config";

export default function TikTokDownloader(){
  const [url,setUrl]=useState(""); const [info,setInfo]=useState(null); const [loading,setLoading]=useState(false);
  const fetchVideo = async ()=> {
    setLoading(true);
    const res = await fetch(`${BACKEND}/api/tiktok`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({url})});
    const data = await res.json(); setInfo(data); setLoading(false);
  };
  return (<>
    <SEO title="TikTok Downloader — MicroTools Hub" description="Download TikTok videos" />
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">TikTok Downloader</h1>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full p-3 border rounded mb-3" />
      <button onClick={fetchVideo} className="bg-indigo-600 text-white px-6 py-2 rounded">Fetch</button>
      {info && <a className="block mt-3 bg-green-600 text-white px-4 py-2 rounded" href={`${BACKEND}/download?url=${encodeURIComponent(url)}&format=best`}>Download</a>}
    </div>
  </>);
}
