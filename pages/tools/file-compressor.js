import { useState, useRef } from "react";
import SEO from "../../components/SEO";
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

  // Drag & Drop visual effect
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

      // Correct backend route
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
      <SEO
        title="Online File Compressor — Reduce File Size Fast | MicroTools Hub"
        description="Free online file compressor for ZIP, DOCX, PPTX, XLSX, MP4, PDF, images, and more. Modern UI, drag & drop, fast compression, no ads."
        keywords="file compressor, compress file, file reducer, zip compressor, compress mp4"
      />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          File Compressor
        </h1>

        {/* How to use */}
        <div className="p-4 bg-white border rounded-xl shadow mb-6">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-5 text-gray-700 leading-7">
            <li>Upload any file — PDF, DOCX, PPTX, XLSX, MP4, ZIP, JPG, PNG, etc.</li>
            <li>Select compression level: Low, Medium, High</li>
            <li>Click <b>Compress</b> to reduce file size</li>
            <li>Download your compressed ZIP file instantly</li>
            <li>Fully works on Android, iPhone, Windows, and Mac</li>
          </ul>
        </div>

        {/* Drag & Drop */}
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
              <b>Selected File:</b> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
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

        {/* Compression level */}
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

        {/* Compress Button */}
        <button
          onClick={uploadFile}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Compressing..." : "Compress File"}
        </button>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: progress + "%" }}
            ></div>
          </div>
        )}

        {/* Download */}
        {downloadUrl && (
          <div className="mt-6">
            <a
              href={downloadUrl}
              download={(file?.name || "file") + ".zip"}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
            >
              Download Compressed File (ZIP)
            </a>
          </div>
        )}

        {/* FAQ Section */}
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
                It reduces file size by optimizing content while keeping quality as high as possible.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is it safe?</h3>
              <p>Yes, all files are processed temporarily and auto-deleted.</p>
            </div>

            <div>
              <h3 className="font-semibold">Does it reduce video quality?</h3>
              <p>
                For MP4, high compression reduces size but may slightly reduce quality.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}




