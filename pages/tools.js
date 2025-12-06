import SEO from "../components/SEO";
import Link from "next/link";
import { useState } from "react";

export default function Tools() {
  const tools = [
    // FUN / WRITING
    { name: "Meme Caption Generator", path: "/tools/meme", icon: "😂", category: "Fun" },
    { name: "Emoji Translator", path: "/tools/emoji", icon: "😎", category: "Fun" },
    { name: "Quote Generator", path: "/tools/quotes", icon: "💬", category: "Writing" },
    { name: "Text Summarizer", path: "/tools/summarizer", icon: "📝", category: "Writing" },

    // UTILITY
    { name: "Password Generator", path: "/tools/password", icon: "🔐", category: "Utility" },
    { name: "QR Code Generator", path: "/tools/qr", icon: "🔳", category: "Utility" },

    // DOWNLOADERS
    { name: "YouTube Video Downloader", path: "/tools/youtube", icon: "📺", category: "Downloaders" },
    { name: "YouTube Shorts Downloader", path: "/tools/shorts", icon: "🎬", category: "Downloaders" },
    { name: "Instagram Downloader", path: "/tools/instagram", icon: "📸", category: "Downloaders" },
    { name: "TikTok Downloader", path: "/tools/tiktok", icon: "🎵", category: "Downloaders" },
    { name: "Facebook Video Downloader", path: "/tools/facebook", icon: "📘", category: "Downloaders" },
    { name: "X (Twitter) Video Downloader", path: "/tools/x", icon: "🐦", category: "Downloaders" },

    // FILES / DOCUMENTS
    { name: "PDF Compressor", path: "/tools/pdf-compressor", icon: "📄", category: "Documents" },
    { name: "File Compressor", path: "/tools/file-compressor", icon: "🗜️", category: "Files" },
    { name: "File Converter", path: "/tools/file-converter", icon: "🔄", category: "Files" },
    { name: "All PDF Maker", path: "/tools/all-pdf", icon: "📚", category: "Documents" },

    // IMAGES
    { name: "Image Compressor", path: "/tools/image-compressor", icon: "🖼️", category: "Images" },
    { name: "Image Resizer", path: "/tools/image-resizer", icon: "📐", category: "Images" },
    { name: "Background Remover", path: "/tools/remove-bg", icon: "✂️", category: "Images" },
    { name: "Watermark Remover", path: "/tools/watermark-remover", icon: "💧", category: "Images" },
  ];

  const categories = ["All", "Downloaders", "Files", "Writing", "Documents", "Images", "Fun", "Utility"];

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = tools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="All Tools — MicroTools Hub"
        description="Explore all free online tools: downloaders, image tools, PDF tools, converters, generators, and more."
      />

      <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600">
          MicroTools Hub — All Tools
        </h1>

        <div className="max-w-3xl mx-auto mt-8">
          <input
            placeholder="Search tools (e.g., YouTube, PDF, Emoji...)"
            className="w-full p-4 border rounded-xl shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center mt-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <Link key={tool.name} href={tool.path}>
              <div className="p-6 bg-white rounded-2xl shadow border hover:shadow-xl hover:-translate-y-1 transition">
                <div className="text-5xl mb-3">{tool.icon}</div>
                <h3 className="text-xl font-semibold">{tool.name}</h3>
                <p className="mt-2 text-gray-500 text-sm">{tool.category}</p>
                <span className="text-indigo-600 font-medium mt-4 inline-block">
                  Open Tool →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No tools match your search.</p>
        )}
      </div>
    </>
  );
}



