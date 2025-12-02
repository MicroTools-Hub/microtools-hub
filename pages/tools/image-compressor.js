import { useState } from "react";
import SEO from "../../components/SEO";
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

    const res = await fetch(`${BACKEND}/image/compress`, {
    method: "POST",
    body: formData,
    });


      if (!res.ok) {
        throw new Error("Compression failed. Try again.");
      }

      const zipBlob = await res.blob();
      setResults(URL.createObjectURL(zipBlob));
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Image Compressor — Compress JPG, PNG & WebP Online | MicroTools Hub"
        description="Fast online image compressor for JPG, PNG, and WebP. Drag & drop, adjust quality, and download compressed images instantly."
        keywords="image compressor, compress png, reduce jpg size"
      />

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Image Compressor
        </h1>

        {/* HOW TO USE */}
        <div className="p-5 bg-white shadow rounded-xl border mb-8">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Drag & drop images or click to upload.</li>
            <li>Adjust the quality slider (10% to 100%).</li>
            <li>Click <strong>Compress Images</strong>.</li>
            <li>Download your ZIP file containing all compressed images.</li>
          </ul>
        </div>

        {/* DRAG & DROP UPLOAD */}
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

          {/* PREVIEW GRID */}
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

        {/* ERROR */}
        {error && (
          <p className="text-red-600 mt-3 font-medium">{error}</p>
        )}

        {/* QUALITY SLIDER */}
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

        {/* COMPRESS BUTTON */}
        <button
          onClick={uploadImages}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Compressing..." : "Compress Images"}
        </button>

        {/* DOWNLOAD RESULT */}
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

      </div>
    </>
  );
}

