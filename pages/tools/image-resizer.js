// /pages/tools/image-resizer.js
import { useState } from "react";
import SEO from "../../components/SEO";

export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [imgSize, setImgSize] = useState({ width: 800, height: 600 });
  const [originalSize, setOriginalSize] = useState(null);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resultUrl, setResultUrl] = useState("");

  const handleFile = (f) => {
    setFile(f);
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height });
      setImgSize({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(f);
  };

  const updateWidth = (w) => {
    if (!originalSize) return;
    if (keepRatio) {
      const ratio = originalSize.height / originalSize.width;
      setImgSize({ width: w, height: Math.round(w * ratio) });
    } else {
      setImgSize((s) => ({ ...s, width: w }));
    }
  };

  const updateHeight = (h) => {
    if (!originalSize) return;
    if (keepRatio) {
      const ratio = originalSize.width / originalSize.height;
      setImgSize({ height: h, width: Math.round(h * ratio) });
    } else {
      setImgSize((s) => ({ ...s, height: h }));
    }
  };

  const resize = async () => {
    if (!file) return alert("Upload image first");

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = imgSize.width;
    canvas.height = imgSize.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/jpeg", 0.9);
    setResultUrl(data);
  };

  return (
    <>
      <SEO
        title="Image Resizer — Resize Images Online Free | MicroTools Hub"
        description="Resize images by width or height online. Maintain aspect ratio or set custom dimensions. Free image resizer."
      />

      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Image Resizer
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          className="mb-4"
        />

        {originalSize && (
          <>
            {/* Width */}
            <label className="block font-medium">
              Width (px)
            </label>
            <input
              type="number"
              value={imgSize.width}
              onChange={(e) => updateWidth(+e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="range"
              min="50"
              max="5000"
              value={imgSize.width}
              onChange={(e) => updateWidth(+e.target.value)}
              className="w-full mb-4"
            />

            {/* Height */}
            <label className="block font-medium">
              Height (px)
            </label>
            <input
              type="number"
              value={imgSize.height}
              onChange={(e) => updateHeight(+e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="range"
              min="50"
              max="5000"
              value={imgSize.height}
              onChange={(e) => updateHeight(+e.target.value)}
              className="w-full mb-4"
            />

            {/* Aspect ratio toggle */}
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(e) => setKeepRatio(e.target.checked)}
              />
              Keep Aspect Ratio
            </label>
          </>
        )}

        <button
          onClick={resize}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Resize
        </button>

        {resultUrl && (
          <a
            href={resultUrl}
            download="resized.jpg"
            className="block mt-4 bg-green-600 text-white px-4 py-2 rounded text-center"
          >
            Download Resized Image
          </a>
        )}
      </div>
    </>
  );
}
