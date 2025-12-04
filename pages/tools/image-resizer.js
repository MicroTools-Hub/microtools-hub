// /pages/tools/image-resizer.js
import { useState } from "react";
import SEO from "../../components/SEO";

export default function ImageResizer(){
  const [file,setFile]=useState(null);
  const [width,setWidth]=useState(800);
  const [resultUrl,setResultUrl]=useState("");
  const handleFile = (f) => setFile(f);
  const resize = async () => {
    if(!file) return alert("Upload image");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await img.decode();
    const canvas = document.createElement("canvas");
    const scale = width / img.width;
    canvas.width = width;
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const data = canvas.toDataURL("image/jpeg", 0.9);
    setResultUrl(data);
  };
  return (<>
    <SEO title="Image Resizer — MicroTools Hub" description="Resize images in browser" />
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Image Resizer</h1>
      <input type="file" accept="image/*" onChange={(e)=>handleFile(e.target.files[0])} className="mb-3" />
      <label>Width: {width}px</label>
      <input type="range" min="100" max="4000" value={width} onChange={(e)=>setWidth(+e.target.value)} className="w-full" />
      <button onClick={resize} className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Resize</button>
      {resultUrl && <a className="block mt-3 bg-green-600 text-white px-4 py-2 rounded" href={resultUrl} download="resized.jpg">Download Resized</a>}
    </div>
  </>);
}
