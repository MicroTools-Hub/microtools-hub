import SEO from "../components/SEO";
import Link from "next/link";
import { useState } from "react";

export default function Tools() {
  const tools = [
    { name: "Meme Caption Generator", path: "/tools/meme", icon: "😂", category: "Fun" },
    { name: "Text Summarizer", path: "/tools/summarizer", icon: "📝", category: "Writing" },
    { name: "Quote Generator", path: "/tools/quote", icon: "💬", category: "Writing" },
    { name: "Password Generator", path: "/tools/password", icon: "🔐", category: "Utility" },
    { name: "Emoji Translator", path: "/tools/emoji", icon: "😎", category: "Fun" },
    { name: "YouTube Shorts Downloader", path: "/tools/shorts", icon: "🎬", category: "Downloaders" },
    { name: "YouTube Video Downloader", path: "/tools/youtube", icon: "📺", category: "Downloaders" },
    { name: "PDF Compressor", path: "/tools/pdf-compressor", icon: "📄", category: "Documents" },
    { name: "Image Compressor", path: "/tools/image-compressor", icon: "🖼️", category: "Images" },
    { name: "File Compressor", path: "/tools/file-compressor", icon: "🗜️", category: "Files" },
    { name: "File Converter", path: "/tools/file-converter", icon: "🔄", category: "Files" },
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
        description="Explore all free online tools: YouTube downloader, PDF tools, file converter, text tools, and more. Fast, clean, and beautifully designed."
      />

      <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 drop-shadow-sm">
          MicroTools Hub — All Tools
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mt-8">
          <input
            placeholder="Search tools (e.g., YouTube, PDF, Emoji...)"
            className="w-full p-4 border rounded-xl shadow-sm focus:ring focus:ring-indigo-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mt-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border shadow-sm text-sm transition 
              ${activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <Link key={tool.name} href={tool.path}>
              <div className="p-6 bg-white rounded-2xl shadow-lg border hover:shadow-2xl cursor-pointer 
              hover:-translate-y-1 transition transform duration-200">

                <div className="text-5xl mb-3">{tool.icon}</div>

                <h3 className="text-xl font-semibold">{tool.name}</h3>

                <p className="mt-2 text-gray-500 text-sm">{tool.category}</p>

                <div className="mt-4">
                  <span className="text-indigo-600 font-medium hover:underline">
                    Open Tool →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No tools match your search.</p>
        )}
      </div>
    </>
  );
}


