// /pages/tools/image-resizer.js
import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { runFinalAction } from "../../utils/finalAction";


export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [imgSize, setImgSize] = useState({ width: 800, height: 600 });
  const [originalSize, setOriginalSize] = useState(null);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resultUrl, setResultUrl] = useState("");

  const handleFile = (f) => {
    setFile(f);
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height });
      setImgSize({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(f);
  };

  const updateWidth = (w) => {
    if (!originalSize) return;
    if (keepRatio) {
      const ratio = originalSize.height / originalSize.width;
      setImgSize({ width: w, height: Math.round(w * ratio) });
    } else {
      setImgSize((s) => ({ ...s, width: w }));
    }
  };

  const updateHeight = (h) => {
    if (!originalSize) return;
    if (keepRatio) {
      const ratio = originalSize.width / originalSize.height;
      setImgSize({ height: h, width: Math.round(h * ratio) });
    } else {
      setImgSize((s) => ({ ...s, height: h }));
    }
  };

  const resize = async () => {
    if (!file) return alert("Upload image first");

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = imgSize.width;
    canvas.height = imgSize.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/jpeg", 0.9);
    setResultUrl(data);
  };

  return (
    <>
      <SEO
        title="Image Resizer — Resize Images Online Free | MicroTools Hub"
        description="Resize images by width or height online. Maintain aspect ratio or set custom dimensions. Free image resizer."
      />

      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Image Resizer</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            {!file ? (
              <div className="text-center">
                <label className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-bold cursor-pointer hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Choose an Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <img src={URL.createObjectURL(file)} alt="Original" className="max-w-full h-auto rounded-lg shadow-lg mx-auto" />
                  <p className="mt-4 text-lg font-semibold">Original: {originalSize?.width} x {originalSize?.height}</p>
                </div>
                
                <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg border">
                  <div>
                    <label className="block font-semibold text-lg mb-2">Width (px)</label>
                    <input
                      type="number"
                      value={imgSize.width}
                      onChange={(e) => updateWidth(+e.target.value)}
                      className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="range"
                      min="50"
                      max={originalSize ? originalSize.width * 2 : 5000}
                      value={imgSize.width}
                      onChange={(e) => updateWidth(+e.target.value)}
                      className="w-full mt-2 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-lg mb-2">Height (px)</label>
                    <input
                      type="number"
                      value={imgSize.height}
                      onChange={(e) => updateHeight(+e.target.value)}
                      className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="range"
                      min="50"
                      max={originalSize ? originalSize.height * 2 : 5000}
                      value={imgSize.height}
                      onChange={(e) => updateHeight(+e.target.value)}
                      className="w-full mt-2 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="keepRatio"
                      checked={keepRatio}
                      onChange={(e) => setKeepRatio(e.target.checked)}
                      className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="keepRatio" className="font-semibold text-lg">Keep Aspect Ratio</label>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button
                onClick={runFinalAction(resize)}
                disabled={!file}
                className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Resize Image
              </button>
            </div>

            {resultUrl && (
              <div className="mt-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Resized Image</h2>
                <img src={resultUrl} alt="Resized" className="max-w-full h-auto rounded-lg shadow-lg mx-auto" />
                <p className="mt-4 text-lg font-semibold">New Size: {imgSize.width} x {imgSize.height}</p>
                <button
                  onClick={runFinalAction(() => {
                    const a = document.createElement("a");
                    a.href = resultUrl;
                    a.download = "resized-image.jpg";
                    a.click();
                  })}
                  className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Resized Image
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
