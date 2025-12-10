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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">PDF Compressor</h1>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li><b>Upload or drag & drop</b> a PDF file into the area below.</li>
                <li>Select a <b>compression level</b> (Medium is recommended for a good balance).</li>
                <li>Click <b>Compress PDF</b> to start the optimization process.</li>
                <li>Download your smaller, high-quality PDF.</li>
              </ul>
            </div>

            <div
              className={`border-4 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                dragging ? "border-indigo-600 bg-indigo-50" : "border-gray-300 bg-white"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <label className="text-2xl font-semibold text-gray-700 cursor-pointer">
                  Drag & Drop PDF Here
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 mt-2">or click to browse</p>
              </div>
              {file && (
                <p className="mt-4 text-lg text-gray-800 font-semibold">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-lg">Compression Level:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">{compressionLabels.low}</option>
                  <option value="medium">{compressionLabels.medium}</option>
                  <option value="high">{compressionLabels.high}</option>
                </select>
              </div>

              <button
                onClick={runFinalAction(uploadFile)}
                disabled={loading || !file}
                className="bg-indigo-600 disabled:opacity-50 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Compressing..." : "Compress PDF"}
              </button>
            </div>
            
            {loading && (
              <p className="mt-4 text-center text-indigo-600 font-semibold animate-pulse text-lg">
                Optimizing your PDF... this may take a moment.
              </p>
            )}

            {downloadUrl && (
              <div className="mt-8 text-center">
                <button
                  onClick={runFinalAction(() => {
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = "compressed.pdf";
                    a.click();
                  })}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  Download Compressed PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}







