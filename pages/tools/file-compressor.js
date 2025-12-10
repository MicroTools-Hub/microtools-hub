import { useState, useRef } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";


export default function FileCompressor() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const dropRef = useRef(null);

  const handleFile = (f) => {
    setFile(f);
    setDownloadUrl(null);
    setProgress(0);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.add("border-indigo-500", "bg-indigo-50");
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("border-indigo-500", "bg-indigo-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove("border-indigo-500", "bg-indigo-50");

    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }

    try {
      setLoading(true);
      setProgress(20);

      const form = new FormData();
      form.append("file", file);
      form.append("level", level);

      const res = await fetch(`${BACKEND}/api/file-compress`, {
        method: "POST",
        body: form,
      });

      setProgress(70);

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error:", txt);
        alert("Compression failed. Try again.");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Cannot connect to backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 TOP-CLASS SEO UPGRADE */}
      <SEO
        title="Online File Compressor — Reduce File Size (ZIP, MP4, PDF, DOCX) | MicroTools Hub"
        description="Free online file compressor to reduce file size instantly. Compress PDF, DOCX, PPTX, MP4, ZIP, JPG, PNG & more. Fast, secure, drag & drop support, works on all devices."
        keywords="file compressor, compress files online, reduce file size, compress mp4, compress pdf, compress docx, file size reducer, online zip compressor"
        image="/og/file-compressor.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Online File Compressor — MicroTools Hub",
          url: "https://microtools-hub.vercel.app/tools/file-compressor",
          applicationCategory: "Utility",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Compress large files online including videos, PDFs, documents, archives, and images. No installation required.",
        }}
      />

      {/* ⭐ FAQ Rich Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which file types can I compress?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can compress PDF, DOCX, PPTX, XLSX, MP4, JPG, PNG, ZIP, and many other file types.",
                },
              },
              {
                "@type": "Question",
                name: "Is online file compression safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Files are processed securely and automatically deleted after compression.",
                },
              },
              {
                "@type": "Question",
                name: "Does compression reduce video quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "High compression reduces file size aggressively and may slightly reduce video quality.",
                },
              },
              {
                "@type": "Question",
                name: "Is this file compressor free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the file compressor is 100% free with no signup required.",
                },
              },
            ],
          }),
        }}
      />

      {/* UI (UNCHANGED) */}
      <ToolLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Online File Compressor</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li><b>Upload any file</b> — PDF, DOCX, MP4, ZIP, JPG, PNG, etc.</li>
                <li>Select a compression level (Low, Medium, or High).</li>
                <li>Click <b>Compress File</b> to start processing.</li>
                <li>Download your compressed ZIP file instantly.</li>
              </ul>
            </div>

            <div
              ref={dropRef}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleLeave}
              onDrop={handleDrop}
              className="border-4 border-dashed border-gray-300 rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 bg-white hover:border-indigo-500 hover:bg-indigo-50"
            >
              {file ? (
                <div className="text-lg text-gray-800">
                  <p className="font-bold text-2xl mb-2">Selected File:</p>
                  <p>{file.name}</p>
                  <p className="text-gray-600 text-base mt-1">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-gray-600">Drag & Drop your file here</p>
                  <p className="text-gray-500 mt-2">or</p>
                  <label className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-indigo-200 transition">
                    Click to Upload
                    <input
                      type="file"
                      onChange={(e) => handleFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-lg">Compression Level:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                onClick={runFinalAction(uploadFile)}
                disabled={loading || !file}
                className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Compressing..." : "Compress File"}
              </button>
            </div>

            {loading && progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-4 my-4">
                <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            )}

            {downloadUrl && (
              <div className="mt-8 text-center">
                <button
                  onClick={runFinalAction(() => {
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = "compressed.zip";
                    a.click();
                  })}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Compressed ZIP
                </button>
              </div>
            )}

            <section className="mt-16 p-6 bg-white border rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-xl">Which file types are supported?</h3>
                  <p>You can compress almost any file, including DOCX, PPTX, XLSX, PDF, MP4, MOV, JPG, PNG, and ZIP archives.</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Is it safe to use?</h3>
                  <p>Absolutely. Your files are uploaded over a secure connection and are automatically deleted from our servers after a short period.</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Does compression affect quality?</h3>
                  <p>The "High" compression setting may slightly reduce quality for some files like videos (MP4) and images (JPG), while "Low" and "Medium" settings provide excellent quality.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}





