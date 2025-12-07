// /pages/index.js
import SEO from "../components/SEO";
import Link from "next/link";

export default function Home() {
const tools = [
  { name: "YouTube Video Downloader", link: "/tools/youtube", icon: "📺" },
  { name: "YouTube Shorts Downloader", link: "/tools/shorts", icon: "🎬" },
  { name: "Instagram Downloader", link: "/tools/instagram", icon: "📸" },
  { name: "TikTok Downloader", link: "/tools/tiktok", icon: "🎵" },
  { name: "Twitter / X Downloader", link: "/tools/x", icon: "🐦" },
  { name: "Facebook Video Downloader", link: "/tools/facebook", icon: "📘" },
  
  { name: "PDF Compressor", link: "/tools/pdf-compressor", icon: "📄" },
  { name: "Image Compressor", link: "/tools/image-compressor", icon: "🖼️" },
  { name: "Image Resizer", link: "/tools/image-resizer", icon: "📏" },
  { name: "Background Remover", link: "/tools/remove-bg", icon: "🧼" },
  { name: "Watermark Remover", link: "/tools/watermark-remover", icon: "🚿" },

  { name: "File Converter", link: "/tools/file-converter", icon: "🔄" },
  { name: "File Compressor", link: "/tools/file-compressor", icon: "📦" },

  { name: "QR Code Generator", link: "/tools/qr", icon: "🔳" },
  { name: "AI PFP Maker", link: "/tools/ai-pfp", icon: "🤖" },

  { name: "Meme Generator", link: "/tools/meme", icon: "😂" },
  { name: "Password Generator", link: "/tools/password", icon: "🔐" },
  { name: "Quote Generator", link: "/tools/quotes", icon: "💬" },
  { name: "Emoji Translator", link: "/tools/emoji", icon: "😎" },
  { name: "Text Summarizer", link: "/tools/summarizer", icon: "📝" },
];


  // Aggressive SEO keywords (broad + long-tail clusters)
  const keywords =
    "free online tools, youtube downloader, youtube shorts downloader, pdf compressor, image compressor, file converter, meme generator, password generator, quote generator, emoji translator, text summarizer, file compressor online, download youtube mp4 1080p, compress pdf online, compress images, convert pdf to jpg, mp4 to mp3 converter, online meme maker, instagram caption generator, seo-optimized tools";

  // JSON-LD structured data: WebApplication + CollectionPage + BreadcrumbList
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MicroTools Hub",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://microtools-hub.example",
    "description":
      "MicroTools Hub — Free, fast online tools: YouTube downloader, compressors, converters and more. No-login tools for creators and students.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "MicroTools Hub — All Tools",
    "description":
      "Collection of free online tools including YouTube downloader, Shorts downloader, PDF & image compressors, file converters, meme maker, quote generator and more.",
    "mainEntity": tools.map((t) => ({
      "@type": "SiteNavigationElement",
      "name": t.name,
      "url": (process.env.NEXT_PUBLIC_SITE_URL || "https://microtools-hub.example") + t.link
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_SITE_URL || "https://microtools-hub.example"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": (process.env.NEXT_PUBLIC_SITE_URL || "https://microtools-hub.example") + "/tools"
      }
    ]
  };

  return (
    <>
      <SEO
        title="MicroTools Hub — Free Online Tools for Downloading, Converting & Productivity"
        description="MicroTools Hub offers fast, free and mobile-first tools: YouTube & Shorts downloader (144p–1080p), PDF & Image compressors, file converters, meme & quote creators, summarizers and more. No login, no ads, instant downloads."
        keywords={keywords}
        image="/og-image.png"
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

          {/* Aggressive SEO supporting paragraph — natural language, keyword-rich */}
          <p className="text-gray-600 text-sm mt-4 max-w-3xl mx-auto leading-7">
            MicroTools Hub is built for creators, students and professionals who need trusted,
            no-login utilities: <strong>YouTube downloader 1080p</strong>, <strong>YouTube Shorts downloader</strong>,
            <strong> PDF compressor</strong>, <strong>image optimizer</strong>, and fast
            <strong> file converters</strong>. Use our tools to save bandwidth, speed up workflows,
            and generate social-ready content instantly.
          </p>

          {/* CTA Buttons */}
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
          <h2 className="text-4xl font-bold text-indigo-600 text-center mb-8">All Tools</h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.link}>
                <div className="p-6 bg-white rounded-2xl border shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                  <div className="text-5xl">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">{tool.name}</h3>
                  <p className="text-indigo-600 font-medium mt-2">Open Tool →</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Internal linking boost section (crawlable, visible) */}
          <div className="mt-8 max-w-6xl mx-auto text-sm text-gray-600">
            <p className="mb-2">
              Quick links:{" "}
              {tools.map((t, i) => (
                <span key={t.link}>
                  <Link href={t.link} className="underline hover:text-indigo-600">
                    {t.name}
                  </Link>
                  {i < tools.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ⚡ WHY CHOOSE US */}
        <section className="max-w-6xl mx-auto px-6 my-20">
          <h2 className="text-4xl font-bold text-indigo-600 text-center mb-6">Why Millions Will Use MicroTools Hub</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">⚡ Ultra Fast Tools</h3>
              <p className="text-gray-600">Everything loads instantly with no delay.</p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">💎 100% Free</h3>
              <p className="text-gray-600">No login, no limits, no complications. Just pure tools.</p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-md border">
              <h3 className="text-xl font-bold mb-2">📱 Mobile Friendly</h3>
              <p className="text-gray-600">Every tool works perfectly on Android, iPhone & tablets.</p>
            </div>
          </div>
        </section>

        {/* 🎯 HOW IT WORKS */}
        <section className="max-w-4xl mx-auto px-6 my-20">
          <h2 className="text-4xl font-bold text-indigo-600 text-center">How It Works</h2>

          <ol className="space-y-4 text-gray-700 text-lg mt-6">
            <li>1️⃣ Choose a tool from our collection.</li>
            <li>2️⃣ Upload your file or paste your link.</li>
            <li>3️⃣ Our system processes everything instantly.</li>
            <li>4️⃣ Download your final result in seconds.</li>
          </ol>
        </section>
      </main>

      {/* Aggressive structured data injection */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}




