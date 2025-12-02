import SEO from "../components/SEO";
import { FaEnvelope, FaHeadset, FaHandshake, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact MicroTools Hub — Support, Feedback & Business Inquiries"
        description="Get fast support for downloads, compression, conversion, and all MicroTools Hub features. Contact our team at microtools12345@gmail.com."
        keywords="contact microtools hub, support email, microtools contact, help center"
      />

      {/* HERO SECTION */}
      <section className="py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
        <p className="max-w-2xl mx-auto mt-3 text-lg opacity-90">
          Need help? We're here 24/7 for support, feedback, and business inquiries.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto py-14 px-6 text-gray-700">

        {/* SUPPORT */}
        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <div className="flex items-start gap-4 mb-3">
            <FaHeadset className="text-indigo-600 text-3xl" />
            <h2 className="text-2xl font-bold text-indigo-600">Support & General Questions</h2>
          </div>

          <p className="leading-7 mb-4">
            Facing issues with downloading videos, compressing PDFs, converting files,
            or using any MicroTools Hub feature? Our support team is available 24/7.
          </p>

          <p className="font-semibold text-indigo-700 text-lg">
            📩 Email:{" "}
            <a href="mailto:microtools12345@gmail.com" className="underline">
              microtools12345@gmail.com
            </a>
          </p>
        </div>

        {/* BUSINESS */}
        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <div className="flex items-start gap-4 mb-3">
            <FaHandshake className="text-indigo-600 text-3xl" />
            <h2 className="text-2xl font-bold text-indigo-600">Business & Partnerships</h2>
          </div>

          <p className="leading-7 mb-4">
            Want to collaborate, sponsor, integrate our tools, or discuss business
            opportunities? Our team is open to brand deals, API access, monetization
            partnerships, and more.
          </p>

          <p className="font-semibold text-indigo-700 text-lg">
            📩 Business Email:{" "}
            <a href="mailto:microtools12345@gmail.com" className="underline">
              microtools12345@gmail.com
            </a>
          </p>
        </div>

        {/* RESPONSE TIME */}
        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <div className="flex items-start gap-4 mb-3">
            <FaClock className="text-indigo-600 text-3xl" />
            <h2 className="text-2xl font-bold text-indigo-600">Response Time</h2>
          </div>

          <p className="leading-7 text-lg">
            We typically respond within <strong>12–24 hours</strong>.  
            For urgent matters, include **URGENT** in your email subject.
          </p>
        </div>

        {/* THANK YOU */}
        <div className="text-center mt-10">
          <FaEnvelope className="text-indigo-600 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">Thank You</h2>
          <p className="leading-7 max-w-2xl mx-auto">
            Thank you for using MicroTools Hub!  
            Your support motivates us to build faster, smarter, and more powerful tools for everyone.
          </p>
        </div>
      </div>
    </>
  );
}


