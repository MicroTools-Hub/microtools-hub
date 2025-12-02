import { useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import SEO from "../../components/SEO";
import { BACKEND } from "../../config";

export default function FileConverter() {
  const [file, setFile] = useState(null);
  const [targetType, setTargetType] = useState("pdf");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const outputTypes = [
    "pdf", "docx", "pptx", "xlsx", "txt",
    "jpg", "png", "webp",
    "mp4", "mp3", "wav"
  ];

  // 🔵 Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError("");
    }
  };

  // 🔥 Convert file
  const convertFile = async () => {
    if (!file) {
      setError("Please upload a file to convert.");
      return;
    }

    setLoading(true);
    setError("");
    
    const form = new FormData();
    form.append("file", file);
    form.append("target", targetType);

    try {
    const res = await fetch(`${BACKEND}/file/convert`, {
    method: "POST",
    body: fd,
    });


      if (!res.ok) {
        throw new Error("Conversion failed. Try another file.");
      }

      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Universal File Converter — Convert Any Format Online | MicroTools Hub"
        description="Convert PDF, DOCX, PPTX, XLSX, MP4, MP3, PNG and more instantly online. Free, fast, secure file converter."
        keywords="file converter, convert pdf, convert mp4, convert docx, convert jpg"
      />

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Universal File Converter
        </h1>

        {/* ===================== */}
        {/* 🔵 How to Use Section */}
        {/* ===================== */}
        <div className="p-5 bg-white shadow rounded-xl border mb-8">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Upload or drag & drop any file (PDF, DOCX, MP4, JPG, etc.)</li>
            <li>Select the format you want to convert to</li>
            <li>Click <strong>Convert</strong></li>
            <li>Download your converted file instantly</li>
          </ul>
        </div>

        {/* ===================== */}
        {/* 🔵 Upload Box */}
        {/* ===================== */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 rounded-xl p-10 text-center transition ${
            dragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <CloudArrowUpIcon className="w-16 h-16 text-indigo-600 mx-auto mb-3" />

          <p className="text-gray-700 font-medium">
            Drag & Drop your file here
          </p>
          <p className="text-gray-500 text-sm mb-4">or click to browse</p>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full cursor-pointer"
          />

          {file && (
            <p className="mt-3 text-gray-700 text-sm">
              <strong>Selected:</strong> {file.name} (
              {(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mt-3 font-medium">{error}</p>
        )}

        {/* ===================== */}
        {/* 🔵 Format Selector */}
        {/* ===================== */}
        <div className="mt-6">
          <label className="font-medium mr-2">Convert to:</label>
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="border p-2 rounded"
          >
            {outputTypes.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* ===================== */}
        {/* 🔵 Convert Button */}
        {/* ===================== */}
        <button
          onClick={convertFile}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Converting..." : "Convert File"}
        </button>

        {/* ===================== */}
        {/* 🔵 Download Button */}
        {/* ===================== */}
        {downloadUrl && (
          <div className="mt-8 text-center">
            <a
              href={downloadUrl}
              download={"converted." + targetType}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
    </>
  );
}


