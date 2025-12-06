// /pages/tools/remove-bg.js
import { useState } from "react";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config.js";
import { runFinalAction } from "../../utils/finalAction";

export default function RemoveBg(){
  const [file,setFile]=useState(null);
  const [out,setOut]=useState(null);
  const [loading,setLoading]=useState(false);

  const submit = async () => {
    if(!file) return alert("Upload");
    setLoading(true);
    const fd = new FormData(); fd.append("image", file);
    const res = await fetch(`${BACKEND}/api/remove-bg`, { method: "POST", body: fd });
    if (!res.ok) { alert("Failed"); setLoading(false); return; }
    const blob = await res.blob(); setOut(URL.createObjectURL(blob)); setLoading(false);
  };

  return (<>
    <SEO title="Remove Background — MicroTools Hub" description="Remove image background quickly" />
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Remove Background</h1>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={submit} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Remove Background</button>
      {out && <a href={out} download="no-bg.png" className="mt-3 block bg-green-600 text-white px-4 py-2 rounded" onClick={runFinalAction(() => {})}>Download</a>}
    </div>
  </>);
}
