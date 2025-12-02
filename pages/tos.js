import SEO from "../components/SEO";
import {
  FaGavel,
  FaYoutube,
  FaFileUpload,
  FaExclamationTriangle,
  FaShieldAlt,
  FaTools,
  FaBan,
  FaSync,
  FaEnvelope,
} from "react-icons/fa";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service — MicroTools Hub"
        description="Official Terms of Service for using MicroTools Hub. Understand acceptable usage, restrictions, liabilities, disclaimers, and your responsibilities as a user."
        keywords="terms of service, microtools hub terms, tos, legal"
      />

      {/* HERO */}
      <section className="py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Terms of Service</h1>
        <p className="max-w-2xl mx-auto mt-3 text-lg opacity-90">
          Please read these terms carefully before using our tools.
        </p>
        <p className="mt-2 opacity-80">
          Effective Date: {new Date().getFullYear()}
        </p>
      </section>

      <div className="max-w-4xl mx-auto py-14 px-6 text-gray-700 space-y-12">

        <Section
          icon={<FaGavel className="text-indigo-600 text-3xl" />}
          title="1. Acceptable Use of Our Services"
          content={
            <>
              <p>
                By using MicroTools Hub, you agree to use the platform only for
                lawful and personal purposes. You may NOT:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Upload or convert illegal or copyrighted files you don’t own.</li>
                <li>Use our tools to violate intellectual property rights.</li>
                <li>Attempt to hack, reverse engineer, or attack the system.</li>
                <li>Use bots or automated scripts to overload the server.</li>
                <li>Download videos you do not have the rights to access.</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaYoutube className="text-indigo-600 text-3xl" />}
          title="2. YouTube & External Video Download Restrictions"
          content={
            <>
              <p>Our YouTube download tools are provided for convenience only.</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>You must ensure you have permission to download any content.</li>
                <li>We do not store or host downloaded content.</li>
                <li>We are not associated with YouTube, Google, or Meta.</li>
              </ul>
              <p className="mt-3 text-gray-700">
                Users are fully responsible for any misuse or copyright violations.
              </p>
            </>
          }
        />

        <Section
          icon={<FaFileUpload className="text-indigo-600 text-3xl" />}
          title="3. File Uploads, Compression & Conversion"
          content={
            <>
              <p>When uploading files for processing:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Files are processed temporarily only.</li>
                <li>Files are deleted automatically after output is generated.</li>
                <li>We do NOT store, analyze, view, or keep your files.</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaExclamationTriangle className="text-indigo-600 text-3xl" />}
          title="4. Disclaimer of Warranties"
          content={
            <>
              <p>All tools are provided “as-is” and “as-available”. We do NOT guarantee:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Accuracy of downloads, conversions, or compressed files.</li>
                <li>Uninterrupted uptime or error-free service.</li>
                <li>Availability at all times due to server limitations.</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaShieldAlt className="text-indigo-600 text-3xl" />}
          title="5. Limitation of Liability"
          content={
            <>
              <p>MicroTools Hub is not liable for:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Loss of data, corruption, or file damage.</li>
                <li>Legal consequences from misuse or illegal downloads.</li>
                <li>Any copyrighted material downloaded without permission.</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaTools className="text-indigo-600 text-3xl" />}
          title="6. Third-Party Services"
          content={
            <>
              <p>We use external partners for certain features:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Razorpay — payment processing</li>
                <li>Google Analytics — traffic insights</li>
                <li>Google AdSense — advertisements</li>
              </ul>
              <p className="mt-3">These services follow their own policies.</p>
            </>
          }
        />

        <Section
          icon={<FaBan className="text-indigo-600 text-3xl" />}
          title="7. Termination of Access"
          content={
            <>
              <p>We may restrict or terminate usage if you:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Misuse our tools</li>
                <li>Perform illegal activities</li>
                <li>Attempt hacking or attacks</li>
                <li>Violate these Terms</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaSync className="text-indigo-600 text-3xl" />}
          title="8. Changes to These Terms"
          content={
            <>
              <p>
                We may update these Terms from time to time. Continued use means
                you accept the latest version.
              </p>
            </>
          }
        />

        <Section
          icon={<FaEnvelope className="text-indigo-600 text-3xl" />}
          title="9. Contact Us"
          content={
            <>
              <p>For any questions related to these Terms:</p>
              <p className="font-semibold text-indigo-700 text-lg mt-4">
                📩 Email:{" "}
                <a className="underline" href="mailto:microtools12345@gmail.com">
                  microtools12345@gmail.com
                </a>
              </p>
            </>
          }
        />
      </div>
    </>
  );
}

/* PREMIUM REUSABLE SECTION COMPONENT */
function Section({ icon, title, content }) {
  return (
    <div className="border p-6 rounded-xl shadow bg-white">
      <div className="flex items-start gap-4 mb-3">
        {icon}
        <h2 className="text-2xl font-bold text-indigo-600">{title}</h2>
      </div>
      <div className="leading-7">{content}</div>
    </div>
  );
}


