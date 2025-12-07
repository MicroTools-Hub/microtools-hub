import { useState, useRef, useEffect } from "react";
import SEO from "../../components/SEO";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

export default function MemeGenerator() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [dragActive, setDragActive] = useState(false);

  const canvasRef = useRef(null);

  // Load Impact Font
  useEffect(() => {
    const font = new FontFace(
      "Impact",
      "url(https://fonts.gstatic.com/s/anton/v17/1Ptgg87LROyAm3Kz-C8CSKlvKpE.ttf)"
    );
    font.load().then(() => document.fonts.add(font));
  }, []);

  const handleImageUpload = (file) => {
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.crossOrigin = "anonymous";

    img.onload = () => {
      setImage(img);
      drawMeme(img, topText, bottomText, fontSize);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const drawMeme = (img, top, bottom, size) => {
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const maxWidth = 800;
    const scale = img.width > maxWidth ? maxWidth / img.width : 1;

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = `${size}px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = size / 10;
    ctx.textAlign = "center";

    if (top)
      drawWrappedText(ctx, top.toUpperCase(), canvas.width / 2, size + 10, size);

    if (bottom)
      drawWrappedText(
        ctx,
        bottom.toUpperCase(),
        canvas.width / 2,
        canvas.height - size / 2,
        size
      );
  };

  const drawWrappedText = (ctx, text, x, y, size) => {
    const maxWidth = ctx.canvas.width * 0.8;
    const words = text.split(" ");
    let line = "";
    const lines = [];

    for (let w of words) {
      const testLine = line + w + " ";
      if (ctx.measureText(testLine).width > maxWidth) {
        lines.push(line);
        line = w + " ";
      } else line = testLine;
    }

    lines.push(line);

    lines.forEach((l, i) => {
      const textY = y + i * (size + 5);
      ctx.fillText(l, x, textY);
      ctx.strokeText(l, x, textY);
    });
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      {/* ⭐⭐⭐⭐⭐ PRO SEO */}
      <SEO
        title="Meme Generator — Create HD Memes Online (Free) | MicroTools Hub"
        description="Create memes instantly with top & bottom text, Impact font, HD export, drag & drop images, and full customization. Free online meme maker with no watermark."
        keywords="meme maker, meme generator, meme creator online, create memes, impact font meme generator"
        image="/og/meme-generator.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Meme Generator — MicroTools Hub",
          applicationCategory: "Utility",
          operatingSystem: "All",
          url: "https://microtools-hub.vercel.app/tools/meme",
          description:
            "Free online meme generator with HD export, drag & drop upload, and classic Impact caption styling.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
                name: "Is this meme generator free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the MicroTools Hub meme generator is completely free with no watermarks.",
                },
              },
              {
                "@type": "Question",
                name: "Can I download memes in HD?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, all memes are exported in high resolution PNG format.",
                },
              },
              {
                "@type": "Question",
                name: "Does this meme maker require signup?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No signup needed — just upload an image, type text, and download.",
                },
              },
              {
                "@type": "Question",
                name: "Does it support drag and drop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can drag & drop images directly into the editor.",
                },
              },
            ],
          }),
        }}
      />

      {/* UI (unchanged) */}
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Meme Caption Generator
        </h1>

        {/* How to Use */}
        <div className="p-5 bg-white border rounded-xl shadow mb-8">
          <h2 className="font-semibold text-lg mb-2">How to Use</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-7">
            <li>Upload an image or drag & drop into the box.</li>
            <li>Type your top and bottom text.</li>
            <li>Adjust font size for perfect fit.</li>
            <li>Click <strong>Download Meme</strong>.</li>
          </ul>
        </div>

        {/* Upload Box */}
        <div
          className={`p-10 rounded-xl border-2 mb-6 text-center transition ${
            dragActive ? "bg-indigo-50 border-indigo-500" : "bg-gray-50 border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <CloudArrowUpIcon className="w-16 h-16 text-indigo-600 mx-auto mb-3" />
          <p className="font-medium text-gray-700">Drag & drop image here</p>
          <p className="text-gray-500 text-sm mb-4">or click below</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="cursor-pointer"
          />
        </div>

        {/* Text Inputs */}
        <div className="mb-6 space-y-4">
          <input
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Top text"
            value={topText}
            onChange={(e) => {
              setTopText(e.target.value);
              drawMeme(image, e.target.value, bottomText, fontSize);
            }}
          />

          <input
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Bottom text"
            value={bottomText}
            onChange={(e) => {
              setBottomText(e.target.value);
              drawMeme(image, topText, e.target.value, fontSize);
            }}
          />

          {/* Font Slider */}
          <div>
            <label className="font-medium">Font Size: {fontSize}px</label>
            <input
              type="range"
              min="20"
              max="120"
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                drawMeme(image, topText, bottomText, parseInt(e.target.value));
              }}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="rounded-xl shadow-lg border max-w-full mb-4"
        />

        {image && (
  <button
    onClick={downloadMeme}
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition"
  >
    Download Meme
  </button>
)}

      </div>
    </>
  );
}




