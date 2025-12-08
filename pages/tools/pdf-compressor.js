import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { runFinalAction } from "../../utils/finalAction";
import { BACKEND } from "../../config.js";

export default function PDFCompressor() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("medium");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Please upload a PDF first");

    setLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);

    try {
      // Backend route
      const res = await fetch(`${BACKEND}/api/pdf-compress`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error:", txt);
        alert("Compression failed. Try again!");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("PDF Compression Error:", err);
      alert("Unable to reach backend. Is the server running?");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  const compressionLabels = {
    low: "Low (Best Quality)",
    medium: "Medium (Balanced)",
    high: "High (Smallest Size)",
  };

  return (
    <>
      {/* ⭐⭐⭐⭐⭐ SEO UPGRADED */}
      <SEO
        title="PDF Compressor — Reduce PDF File Size Online (No Quality Loss) | MicroTools Hub"
        description="Compress PDF files online for free. Reduce PDF size without losing quality. Fast, secure, no signup required. Drag & drop and download instantly."
        keywords="compress pdf, pdf compressor, reduce pdf size online, make pdf smaller, pdf optimizer, free pdf compressor"
        image="/og/pdf-compressor.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PDF Compressor — MicroTools Hub",
          url: "https://microtools-hub.vercel.app/tools/pdf-compressor",
          applicationCategory: "UtilityApplication",
          operatingSystem: "All",
          description:
            "Free PDF compressor that reduces file size while keeping quality high. Drag & drop, fast optimization, no login.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
        }}
      />

      {/* ⭐ FAQ Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this PDF compressor free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, MicroTools Hub offers a completely free and fast PDF compressor with no limits."
                }
              },
              {
                "@type": "Question",
                name: "Does compressing a PDF reduce quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Low compression keeps the best quality, while medium and high give smaller sizes. You can choose the level."
                }
              },
              {
                "@type": "Question",
                name: "Are my PDF files stored?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All files are processed temporarily and automatically deleted from the server."
                }
              },
              {
                "@type": "Question",
                name: "Which PDF sizes can be compressed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can compress large PDFs, scanned PDFs, office-generated PDFs, and more."
                }
              }
            ]
          })
        }}
      />

      <ToolLayout>
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6 text-center sm:text-left">PDF Compressor</h1>

        {/* Upload Box */}
        <div
          className={`p-8 border-2 rounded-xl bg-white shadow transition ${
            dragging ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <p className="text-center text-gray-600 mb-3">Drag & drop your PDF here</p>
          <p className="text-center text-gray-400 mb-4">or</p>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block mx-auto"
          />

          {file && (
            <p className="text-center mt-4 text-gray-700 font-medium">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Compression Level */}
        <div className="mt-6 bg-white p-5 rounded-xl border shadow space-y-3">
          <label className="font-semibold text-gray-700">Compression Level:</label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border p-3 rounded-lg w-full"
          >
            <option value="low">{compressionLabels.low}</option>
            <option value="medium">{compressionLabels.medium}</option>
            <option value="high">{compressionLabels.high}</option>
          </select>
        </div>

        {/* Compress Button */}
        <button
          onClick={uploadFile}
          className="w-full mt-6 bg-indigo-600 text-white text-lg py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>

        {/* Status */}
        {loading && (
          <p className="mt-4 text-center text-gray-700 font-medium animate-pulse">
            Optimizing your PDF...
          </p>
        )}

        {/* Download */}
        {downloadUrl && (
          <div className="mt-6 text-center">
            <button
              onClick={runFinalAction(() => {
                  const a = document.createElement("a");
                  a.href = downloadUrl;
                  a.download = "compressed.pdf";
                  a.rel = "noopener";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                })}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Download Compressed PDF
            </button>
          </div>
        )}

        {/* Instructions */}
        <section className="mt-12 bg-white border p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            How to Use This PDF Compressor
          </h2>

          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Upload a PDF or drag & drop it into the box.</li>
            <li>Select your preferred compression level.</li>
            <li>Click <strong>Compress PDF</strong>.</li>
            <li>Download the optimized file instantly.</li>
            <li>Your files are processed safely and auto-deleted.</li>
          </ul>
        </section>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}







