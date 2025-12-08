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
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">File Compressor</h1>

        <div className="p-4 bg-white rounded-2xl shadow-sm border mb-6">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-5 text-gray-700 leading-7">
            <li>Upload any file — PDF, DOCX, PPTX, XLSX, MP4, ZIP, JPG, PNG, etc.</li>
            <li>Select compression level: Low, Medium, High</li>
            <li>Click <b>Compress</b> to reduce file size</li>
            <li>Download your compressed ZIP file instantly</li>
            <li>Fully works on Android, iPhone, Windows, and Mac</li>
          </ul>
        </div>

        <div
          ref={dropRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-xl p-10 text-center text-gray-500 transition bg-white"
        >
          {file ? (
            <p className="text-lg text-gray-800">
              <b>Selected File:</b> {file.name} (
              {(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          ) : (
            <p className="text-lg">Drag & Drop your file here or click below</p>
          )}
        </div>

        <input
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
          className="mt-4 mb-4"
        />

        <div className="mb-4">
          <label className="font-medium">Compression Level: </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="low">Low (Best Quality, Least Compression)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Max Compression)</option>
          </select>
        </div>

        <button
          onClick={uploadFile}
          disabled={loading}
          className="bg-indigo-600 disabled:opacity-60 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Compressing..." : "Compress File"}
        </button>

        {downloadUrl && (
          <div className="mt-8 text-center">
            <button
              onClick={runFinalAction(() => {
                  const a = document.createElement("a");
                  a.href = downloadUrl;
                  a.download = "compressed.zip";
                  a.rel = "noopener";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                })}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
            >
              Download Compressed ZIP
            </button>
          </div>
        )}

        <section className="mt-12 p-4 bg-white border rounded-xl shadow">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-700 leading-7">
            <div>
              <h3 className="font-semibold">Which file types are supported?</h3>
              <p>DOCX, PPTX, XLSX, PDF, MP4, JPG, PNG, ZIP, TXT, and many more.</p>
            </div>

            <div>
              <h3 className="font-semibold">What does compression do?</h3>
              <p>
                It reduces file size by optimizing content while keeping quality high.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is it safe?</h3>
              <p>Yes, all files are temporary and auto-deleted.</p>
            </div>

            <div>
              <h3 className="font-semibold">Does it reduce video quality?</h3>
              <p>
                High compression reduces size aggressively and may slightly reduce MP4 quality.
              </p>
            </div>
          </div>
        </section>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}





