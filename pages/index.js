import SEO from "../components/SEO";
import Link from "next/link";

export default function Home() {
  const tools = [
    { name: "YouTube Video Downloader", link: "/tools/youtube", icon: "📺" },
    { name: "YouTube Shorts Downloader", link: "/tools/shorts", icon: "🎬" },
    { name: "PDF Compressor", link: "/tools/pdf-compressor", icon: "📄" },
    { name: "Image Compressor", link: "/tools/image-compressor", icon: "🖼️" },
    { name: "File Converter", link: "/tools/file-converter", icon: "🔄" },
    { name: "Meme Generator", link: "/tools/meme", icon: "😂" },
    { name: "Password Generator", link: "/tools/password", icon: "🔐" },
    { name: "Quote Generator", link: "/tools/quotes", icon: "💬" },
    { name: "Emoji Translator", link: "/tools/emoji", icon: "😎" },
    { name: "Text Summarizer", link: "/tools/summarizer", icon: "📝" },
    { name: "File Compressor", link: "/tools/file-compressor", icon: "📦" },
  ];

  return (
    <>
      <SEO
        title="MicroTools Hub — Free Online Tools for Downloading, Converting & Productivity"
        description="MicroTools Hub offers fast and free tools for YouTube downloading, PDF compression, image optimization, file conversion, meme creation, text summarizing, and more."
      />

      <main className="min-h-screen bg-gray-50">

        {/* 🌟 HERO SECTION */}
        <section className="relative text-center px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/20 to-pink-400/20 blur-3xl opacity-40"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 relative drop-shadow-lg">
            Your All-in-One Online Tools Platform
          </h1>

          <p className="text-gray-700 text-lg md:text-xl mt-6 max-w-2xl mx-auto relative">
            Fast, free, and beautifully designed tools for downloading videos,
            compressing PDFs, converting files, creating memes, summarizing text
            and more — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4 relative">
            <Link href="/tools">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium shadow-lg hover:bg-indigo-700 transition">
                Explore All Tools →
              </button>
            </Link>

            <a href="#featured">
              <button className="px-8 py-3 bg-white border text-gray-800 rounded-xl text-lg font-medium shadow hover:bg-gray-100 transition">
                Popular Tools
              </button>
            </a>
          </div>
        </section>

        {/* ⭐ FEATURED TOOLS */}
        <section id="featured" className="px-6 mt-10 mb-20">
          <h2 className="text-4xl font-bold text-indigo-600 text-center mb-8">
            All Tools
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.link}>
                <div className="p-6 bg-white rounded-2xl border shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                  <div className="text-5xl">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">
                    {tool.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mt-2">
                    Open Tool →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ⚡ WHY CHOOSE US */}
        <section className="max-w-6xl mx-auto px-6 my-20">
          <h2 className="text-4xl font-bold text-indigo-600 text-center mb-6">
            Why Millions Will Use MicroTools Hub
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">⚡ Ultra Fast Tools</h3>
              <p className="text-gray-600">Everything loads instantly with no delay.</p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">💎 100% Free</h3>
              <p className="text-gray-600">
                No login, no limits, no complications. Just pure tools.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">📱 Mobile Friendly</h3>
              <p className="text-gray-600">
                Every tool works perfectly on Android, iPhone & tablets.
              </p>
            </div>
          </div>
        </section>

        {/* 🎯 HOW IT WORKS */}
        <section className="max-w-4xl mx-auto px-6 my-20">
          <h2 className="text-4xl font-bold text-indigo-600 text-center">
            How It Works
          </h2>

          <ol className="space-y-4 text-gray-700 text-lg mt-6">
            <li>1️⃣ Choose a tool from our collection.</li>
            <li>2️⃣ Upload your file or paste your link.</li>
            <li>3️⃣ Our system processes everything instantly.</li>
            <li>4️⃣ Download your final result in seconds.</li>
          </ol>
        </section>

      </main>
    </>
  );
}



