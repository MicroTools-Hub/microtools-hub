import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";
import { runFinalAction } from "../../utils/finalAction";
import { PhotoIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";


export default function ImageCompressor() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(80);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      setFiles([...e.dataTransfer.files]);
      setError("");
    }
  };

  const handleUpload = (e) => {
    setFiles([...e.target.files]);
    setError("");
  };

  const uploadImages = async () => {
    if (files.length === 0) {
      setError("Please upload images first.");
      return;
    }

    setLoading(true);
    setResults(null);
    setError("");

    const formData = new FormData();
    for (const f of files) formData.append("images", f);
    formData.append("quality", quality);

    try {
      const res = await fetch(`${BACKEND}/api/image-compress`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error:", txt);
        throw new Error("Compression failed. Try again.");
      }

      const zipBlob = await res.blob();
      setResults(URL.createObjectURL(zipBlob));
    } catch (err) {
      setError(err.message || "Unknown error occurred.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* ⭐⭐⭐⭐⭐ ENTERPRISE SEO HEAD */}
      <SEO
        title="Image Compressor — Reduce JPG, PNG & WebP Size Online (No Quality Loss)"
        description="Free online image compressor: shrink JPG, PNG, and WebP images instantly. Drag & drop, adjustable quality, batch compression & ZIP download. Fast, secure, mobile-friendly."
        keywords="image compressor, compress images online, reduce jpg size, compress png, compress webp, reduce image size online"
        image="/og/image-compressor.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Image Compressor — MicroTools Hub",
          url: "https://microtools-hub.vercel.app/tools/image-compressor",
          applicationCategory: "Utility",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Online image compressor supporting PNG, JPG & WebP formats. Batch compress images with drag & drop, adjustable quality, and instant download.",
        }}
      />

      {/* ⭐ GOOGLE FAQ SCHEMA (RANKS AS RICH RESULTS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which image formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our tool supports JPG, PNG, and WebP format images for fast and high-quality compression.",
                },
              },
              {
                "@type": "Question",
                name: "Does image compression reduce quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can adjust compression from 10% to 100%. Higher quality = less compression. You control the results.",
                },
              },
              {
                "@type": "Question",
                name: "Is this image compressor free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, it's 100% free with no signup and no limits.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data safe during compression?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, all images are processed securely and automatically deleted after compression.",
                },
              },
            ],
          }),
        }}
      />

      {/* UI — DO NOT TOUCH (Your design stays unchanged) */}
      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Image Compressor</h1>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li><b>Drag & drop or upload</b> your JPG, PNG, or WebP images.</li>
                <li>Adjust the <b>quality slider</b> to balance size and quality (80% is recommended).</li>
                <li>Click <b>Compress Images</b> to start the process.</li>
                <li>Download a <b>ZIP file</b> with your compressed images.</li>
              </ul>
            </div>

            <div
              className={`border-4 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                dragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="w-20 h-20 text-indigo-500 mx-auto mb-4" />
              
              <label className="text-2xl font-semibold text-gray-700 cursor-pointer">
                Drag & Drop Images Here
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
              <p className="text-gray-500 mt-2">or click to browse</p>
            </div>

            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Selected Images: {files.length}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {files.map((f, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-2 border transition-transform transform hover:scale-105">
                      <img
                        src={URL.createObjectURL(f)}
                        alt={`preview ${index}`}
                        className="rounded-lg h-28 w-full object-cover"
                      />
                      <p className="text-xs text-gray-600 mt-2 text-center truncate">
                        {(f.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-red-600 mt-4 font-semibold text-center text-lg">{error}</p>}

            <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="w-full sm:w-auto flex-grow flex items-center gap-4">
                <label className="font-semibold text-lg">Quality: {quality}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <button
                onClick={runFinalAction(uploadImages)}
                disabled={loading || files.length === 0}
                className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Compressing..." : "Compress Images"}
              </button>
            </div>

            {results && (
              <div className="mt-8 text-center">
                <button
                  onClick={runFinalAction(() => {
                    const a = document.createElement("a");
                    a.href = results;
                    a.download = "compressed-images.zip";
                    a.click();
                  })}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Compressed ZIP
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}



