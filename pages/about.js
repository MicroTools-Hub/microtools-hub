import SEO from "../components/SEO";
import { FaBolt, FaShieldAlt, FaGlobe, FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <>
      <SEO
        title="About MicroTools Hub — Fast Online Tools for Productivity, Compression & Downloads"
        description="Learn about MicroTools Hub — the fastest online toolkit for video downloading, file compression, conversion, meme creation, productivity tools & more."
        keywords="about microtools hub, online tools platform, micro tools website, video downloader, file converter"
      />

      {/* HERO */}
      <section className="text-center py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About MicroTools Hub
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90 leading-7">
          A modern platform offering fast, reliable, and easy online tools that
          simplify your digital tasks — all in one place.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto py-14 px-6 text-gray-700 leading-8">

        {/* INTRO */}
        <p className="mb-6 text-lg">
          MicroTools Hub is a next-generation platform built for users who want
          instant, hassle-free tools without ads, slow loading times, or unnecessary steps.
          Everything here is fast, lightweight, and built with one mission:
        </p>

        <p className="text-indigo-600 font-semibold text-xl mb-8">
          “Make powerful tools accessible in seconds — for everyone.”
        </p>

        {/* FEATURES SECTION */}
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          What We Provide
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>YouTube Video & Shorts Downloader (144p–1080p)</li>
            <li>PDF Compressor with adjustable levels</li>
            <li>Image Compressor (JPG, PNG, WebP)</li>
            <li>Universal File Converter — any format to any format</li>
            <li>AI-based Text Summarizer</li>
          </ul>

          <ul className="list-disc ml-6 space-y-2">
            <li>Meme Caption Generator</li>
            <li>Password Generator</li>
            <li>Emoji Translator</li>
            <li>Random Quote Generator</li>
            <li>And many new tools coming soon</li>
          </ul>
        </div>

        {/* WHY WE BUILT THIS */}
        <h2 className="text-3xl font-bold text-indigo-600 mt-12 mb-4">
          Why We Created MicroTools Hub
        </h2>

        <p className="mb-4">
          Most online tools today are:
          <strong> slow, filled with ads, and often require payments</strong>
          just to do simple tasks. We wanted to create the opposite:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="flex items-start gap-3">
            <FaBolt className="text-indigo-600 text-2xl mt-1" />
            <p><strong>Fast</strong> — No lag, no waiting, instant processing.</p>
          </div>

          <div className="flex items-start gap-3">
            <FaShieldAlt className="text-indigo-600 text-2xl mt-1" />
            <p><strong>Safe</strong> — No files stored, full privacy.</p>
          </div>

          <div className="flex items-start gap-3">
            <FaGlobe className="text-indigo-600 text-2xl mt-1" />
            <p><strong>Accessible</strong> — Works worldwide on all devices.</p>
          </div>

          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-indigo-600 text-2xl mt-1" />
            <p><strong>Simple</strong> — Clean UI, no confusing steps.</p>
          </div>
        </div>

        {/* COMMITMENT */}
        <h2 className="text-3xl font-bold text-indigo-600 mt-12 mb-4">
          Our Commitment
        </h2>

        <p className="mb-6">
          We are committed to building the fastest, most reliable micro-tools platform on the internet — with:
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Blazing fast performance</li>
          <li>Regular updates & improvements</li>
          <li>New tools added every month</li>
          <li>100% privacy and secure processing</li>
          <li>No hidden fees — free core tools forever</li>
        </ul>

        <p className="mt-10 text-lg font-semibold text-indigo-600">
          Thank you for being a part of MicroTools Hub.  
          Your support helps us grow and build tools used by people worldwide.
        </p>
      </div>
    </>
  );
}


