// /pages/tools/qr.js
import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function QRGenerator(){
  const [text,setText]=useState("https://microtools-hub.example");
  const [localUrl,setLocalUrl]=useState("");
  const generateClient = async () => {
    // client QR via library can be used but we will use server endpoint as fallback
    const res = await fetch(`${BACKEND}/api/qr?text=${encodeURIComponent(text)}`);
    const blob = await res.blob(); setLocalUrl(URL.createObjectURL(blob));
  };
  return (<>
    <SEO title="QR Code Generator — MicroTools Hub" description="Generate QR codes quickly" />
    <ToolLayout>
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">QR Code Generator</h1>
      <input value={text} onChange={(e)=>setText(e.target.value)} className="w-full p-3 border rounded mb-3" />
      <button onClick={runFinalAction(generateClient)} className="bg-indigo-600 text-white px-4 py-2 rounded">Generate QR</button>
      {localUrl && (
        <button
          onClick={runFinalAction(() => {
            const a = document.createElement("a");
            a.href = localUrl;
            a.download = "qr.png";
            a.rel = "noopener";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })}
          className="block mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Download QR
        </button>
      )}
    </ToolLayout>
  </>);
}
