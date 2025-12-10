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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">QR Code Generator</h1>

          <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
            <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
            <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
              <li>Enter any text or URL in the input field.</li>
              <li>Click <b>Generate QR Code</b> to create your QR code.</li>
              <li>Your QR code will appear below.</li>
              <li>Click <b>Download QR</b> to save it as a PNG image.</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter text or URL"
            />
            <button
              onClick={runFinalAction(generateClient)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Generate QR
            </button>
          </div>

          {localUrl && (
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border inline-block">
              <img src={localUrl} alt="Generated QR Code" className="w-64 h-64 mx-auto" />
              <button
                onClick={runFinalAction(() => {
                  const a = document.createElement("a");
                  a.href = localUrl;
                  a.download = "qr-code.png";
                  a.click();
                })}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105"
              >
                Download QR
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  </>);
}
