// /pages/tools/watermark-remover.js
import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function WatermarkRemover(){
  const [file,setFile]=useState(null);
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const remove = async () => {
    if(!file) return alert("Upload image");
    setLoading(true);
    const fd = new FormData();
    fd.append("image", file);
    // optional: coords JSON string first try without coords (server uses heuristic)
    const res = await fetch(`${BACKEND}/api/remove-watermark`, { method:"POST", body: fd });
    if(!res.ok){ alert("Error"); setLoading(false); return; }
    const blob = await res.blob();
    setResult(URL.createObjectURL(blob));
    setLoading(false);
  };
  return (<>
    <SEO title="Watermark Remover — MicroTools Hub" description="Remove watermark (naive blur) or send coords for better result" />
    <ToolLayout>
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Watermark Remover</h1>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={remove} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Remove Watermark</button>
      {loading && <p>Processing...</p>}
      {result && <a href={result} download="clean.png" className="block mt-3 bg-green-600 text-white px-4 py-2 rounded">Download</a>}
    </ToolLayout>
  </>);
}
