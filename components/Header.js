import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-indigo-600 tracking-tight cursor-pointer">
              MicroTools <span className="text-gray-900">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link className="hover:text-indigo-600 transition" href="/tools">Tools</Link>
            <Link className="hover:text-indigo-600 transition" href="/pricing">Pricing</Link>
            <Link className="hover:text-indigo-600 transition" href="/about">About</Link>
            <Link className="hover:text-indigo-600 transition" href="/contact">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-gray-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
              <Link className="hover:text-indigo-600" href="/tools">Tools</Link>
              <Link className="hover:text-indigo-600" href="/pricing">Pricing</Link>
              <Link className="hover:text-indigo-600" href="/about">About</Link>
              <Link className="hover:text-indigo-600" href="/contact">Contact</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

