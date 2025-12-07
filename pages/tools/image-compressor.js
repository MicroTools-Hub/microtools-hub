import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";
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
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Image Compressor
        </h1>

        <div className="p-5 bg-white shadow rounded-xl border mb-8">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Drag & drop images or click to upload.</li>
            <li>Adjust the quality slider (10% to 100%).</li>
            <li>Click <strong>Compress Images</strong>.</li>
            <li>Download your ZIP file containing all compressed images.</li>
          </ul>
        </div>

        <div
          className={`border-2 rounded-xl p-10 text-center transition ${
            dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <CloudArrowUpIcon className="w-16 h-16 text-indigo-600 mx-auto mb-3" />
          <p className="text-gray-700 font-medium">Drag & drop images</p>
          <p className="text-gray-500 text-sm mb-4">or click to browse</p>

          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={handleUpload}
            className="cursor-pointer"
          />

          {files.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map((f, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-2 border">
                  <img
                    src={URL.createObjectURL(f)}
                    alt="preview"
                    className="rounded-lg h-24 w-full object-cover"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    {(f.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-600 mt-3 font-medium">{error}</p>
        )}

        <div className="mt-6">
          <label className="font-medium block mb-2">Quality: {quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full accent-indigo-600"
          />
        </div>

        <button
          onClick={uploadImages}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Compressing..." : "Compress Images"}
        </button>

        {results && (
          <div className="mt-8 text-center">
           <a
             href={results}
             download="compressed-images.zip"
             className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
           >
             Download Compressed ZIP
           </a>

          </div>
        )}

      </ToolLayout>
    </>
  );
}



