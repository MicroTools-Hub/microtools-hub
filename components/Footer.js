export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-3">
            MicroTools <span className="text-indigo-400">Hub</span>
          </h3>
          <p className="text-gray-400 text-sm leading-6 max-w-xs">
            Your all-in-one platform for fast online tools —
            downloaders, converters, compressors, text tools & more.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Tools</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-indigo-400" href="/tools/youtube">YouTube Downloader</a></li>
            <li><a className="hover:text-indigo-400" href="/tools/shorts">Shorts Downloader</a></li>
            <li><a className="hover:text-indigo-400" href="/tools/pdf-compressor">PDF Compressor</a></li>
            <li><a className="hover:text-indigo-400" href="/tools/file-converter">File Converter</a></li>
            <li><a className="hover:text-indigo-400" href="/tools/file-compressor">File Compressor</a></li>
            <li><a className="hover:text-indigo-400" href="/tools/image-compressor">Image Compressor</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-indigo-400" href="/about">About Us</a></li>
            <li><a className="hover:text-indigo-400" href="/pricing">Pricing</a></li>
            <li><a className="hover:text-indigo-400" href="/contact">Contact</a></li>
            <li><a className="hover:text-indigo-400" href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a className="hover:text-indigo-400" href="/privacy">Privacy Policy</a></li>
            <li><a className="hover:text-indigo-400" href="/tos">Terms of Service</a></li>
            <li><a className="hover:text-indigo-400" href="/dmca">DMCA</a></li>
          </ul>
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center justify-center gap-6 text-2xl mt-10 text-gray-400">
        <a className="hover:text-indigo-400" href="#" aria-label="Twitter">🐦</a>
        <a className="hover:text-indigo-400" href="#" aria-label="Instagram">📸</a>
        <a className="hover:text-indigo-400" href="#" aria-label="YouTube">▶️</a>
        <a className="hover:text-indigo-400" href="#" aria-label="Facebook">📘</a>
      </div>

      {/* Bottom */}
      <p className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} MicroTools Hub — All rights reserved.
      </p>
    </footer>
  );
}

