// /pages/tools/watermark-remover.js
import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
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
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">Watermark Remover</h1>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={remove} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Remove Watermark</button>
      {loading && <p>Processing...</p>}
      {result && (
        <button
          onClick={runFinalAction(() => {
            const a = document.createElement("a");
            a.href = result;
            a.download = "clean.png";
            a.rel = "noopener";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })}
          className="block mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Download
        </button>
      )}
          </div>
        </div>
      </ToolLayout>
  </>);
}
