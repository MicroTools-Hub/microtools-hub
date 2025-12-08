import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";


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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files?.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError("");
    }
  };

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
      const res = await fetch(`${BACKEND}/api/file-convert`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error:", txt);
        throw new Error("Conversion failed. Try another file.");
      }

      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message || "Unknown error occurred.");
      console.error("CONVERSION ERROR:", err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🌟 ENTERPRISE-GRADE SEO UPGRADE */}
      <SEO
        title="Universal File Converter — Convert Any File to PDF, DOCX, MP4 & More | MicroTools Hub"
        description="Free online file converter for PDF, DOCX, PPTX, XLSX, MP4, MP3, PNG, JPG and more. Convert files instantly with drag & drop. Fast, secure and works on all devices."
        keywords="file converter, convert file online, pdf converter, mp4 to mp3, docx to pdf, pptx to pdf, online converter, image converter, audio converter"
        image="/og/file-converter.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Universal File Converter — MicroTools Hub",
          url: "https://microtools-hub.vercel.app/tools/file-converter",
          applicationCategory: "Utility",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Instant file converter supporting PDF, DOCX, XLSX, PPTX, MP4, MP3, JPG, PNG, and more. No installation required.",
        }}
      />

      {/* ⭐ GOOGLE FAQ RICH RESULTS (Boosts SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which file types does this converter support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This converter supports PDF, DOCX, PPTX, XLSX, TXT, MP4, MP3, WAV, JPG, PNG, WEBP and more.",
                },
              },
              {
                "@type": "Question",
                name: "Is the file converter free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the converter is completely free with no account or login required.",
                },
              },
              {
                "@type": "Question",
                name: "Is file conversion safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All files are processed securely and automatically deleted after conversion.",
                },
              },
              {
                "@type": "Question",
                name: "Does converting files reduce quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most formats maintain full quality. Images and videos may have light compression depending on output type.",
                },
              },
            ],
          }),
        }}
      />

      {/* UI SECTION (UNCHANGED) */}
      <ToolLayout>
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">Universal File Converter</h1>

        <div className="p-5 bg-white shadow rounded-xl border mb-8">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Upload or drag & drop any file (PDF, DOCX, MP4, JPG, etc.)</li>
            <li>Select the format you want to convert to</li>
            <li>Click <strong>Convert</strong></li>
            <li>Download your converted file instantly</li>
          </ul>
        </div>

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

          <p className="text-gray-700 font-medium">Drag & Drop your file here</p>
          <p className="text-gray-500 text-sm mb-4">or click to browse</p>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full cursor-pointer"
          />

          {file && (
            <p className="mt-3 text-gray-700 text-sm">
              <strong>Selected:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {error && (
          <p className="text-red-600 mt-3 font-medium">{error}</p>
        )}

        <div className="mt-6">
          <label className="font-medium mr-2">Convert to:</label>
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="border p-2 rounded"
          >
            {outputTypes.map((type) => (
              <option key={type} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <button
          onClick={convertFile}
          disabled={loading}
          className="w-full mt-6 py-3 bg-indigo-600 disabled:opacity-60 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Converting..." : "Convert File"}
        </button>

        {downloadUrl && (
          <div className="mt-8 text-center">
           <button
             onClick={runFinalAction(() => {
               const a = document.createElement("a");
               a.href = downloadUrl;
               a.download = (file?.name || "file") + ".zip";
               a.rel = "noopener";
               document.body.appendChild(a);
               a.click();
               document.body.removeChild(a);
             })}
             className="block w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg mt-3"
           >
             Download Compressed File (ZIP)
           </button>

          </div>
        )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}




