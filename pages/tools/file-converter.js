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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Universal File Converter</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li><b>Upload or drag & drop a file</b> (e.g., PDF, DOCX, MP4, JPG).</li>
                <li>Select the target format you want to convert to (e.g., PDF, PNG, MP3).</li>
                <li>Click <b>Convert File</b> to begin the conversion.</li>
                <li>Download your newly converted file instantly.</li>
              </ul>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                dragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"
              }`}
            >
              <CloudArrowUpIcon className="w-20 h-20 text-indigo-500 mx-auto mb-4" />
              
              {!file && (
                <div>
                  <p className="text-2xl font-semibold text-gray-700">Drag & Drop File Here</p>
                  <p className="text-gray-500 mt-2">or</p>
                  <label className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-indigo-200 transition">
                    Choose a File
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                  </label>
                </div>
              )}

              {file && (
                <div className="text-lg text-gray-800">
                  <p className="font-bold text-xl">Selected:</p>
                  <p>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                </div>
              )}
            </div>

            {error && <p className="text-red-600 mt-4 font-semibold text-center text-lg">{error}</p>}

            <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-lg">Convert to:</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {outputTypes.map((type) => (
                    <option key={type} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={runFinalAction(convertFile)}
                disabled={loading || !file}
                className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Converting..." : "Convert File"}
              </button>
            </div>

            {downloadUrl && (
              <div className="mt-8 text-center">
                <button
                  onClick={runFinalAction(() => {
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = `${file.name.split('.').slice(0, -1).join('.')}.${targetType}`;
                    a.click();
                  })}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Converted File
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}




