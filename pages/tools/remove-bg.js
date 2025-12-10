// /pages/tools/remove-bg.js
import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

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
    <ToolLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">Remove Image Background</h1>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
            <p className="font-bold">Important Notice:</p>
            <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">
            <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
            <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
              <li><b>Upload or drag & drop</b> an image file (JPG, PNG, etc.).</li>
              <li>Click <b>Remove Background</b> to process the image.</li>
              <li>Your background-free image will appear on the right.</li>
              <li>Click <b>Download Image</b> to save the result as a PNG.</li>
            </ul>
          </div>

          {!file && (
            <div className="text-center">
              <label className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-bold cursor-pointer hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                Choose an Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {file && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 p-4 rounded-2xl shadow-inner">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Original</h3>
                  <img src={URL.createObjectURL(file)} alt="Original" className="max-w-full h-auto rounded-lg shadow-md mx-auto" />
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl shadow-inner">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Result</h3>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-indigo-600 font-semibold animate-pulse">Removing background...</p>
                    </div>
                  ) : out ? (
                    <img src={out} alt="Background removed" className="max-w-full h-auto rounded-lg shadow-md mx-auto" />
                  ) : (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-gray-500">Awaiting processing...</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={runFinalAction(submit)}
                  disabled={loading}
                  className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </button>
              </div>

              {out && (
                <div className="mt-6">
                  <a
                    href={out}
                    download="background-removed.png"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                  >
                    Download Image
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  </>);
}
