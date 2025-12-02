import SEO from "../components/SEO";
import {
  FaShieldAlt,
  FaFileUpload,
  FaYoutube,
  FaUserSecret,
  FaCookieBite,
  FaTools,
  FaChild,
  FaSync,
  FaEnvelope,
} from "react-icons/fa";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy — MicroTools Hub"
        description="Official privacy policy for MicroTools Hub. Learn how we protect your data, files, downloads, and privacy across all tools."
        keywords="microtools privacy, privacy policy, data safety, secure tools"
      />

      {/* HERO SECTION */}
      <section className="py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Privacy Policy</h1>
        <p className="max-w-2xl mx-auto mt-3 text-lg opacity-90">
          Your privacy and data safety are our top priorities.
        </p>
        <p className="mt-2 opacity-80">
          Effective Date: {new Date().getFullYear()}
        </p>
      </section>

      <div className="max-w-4xl mx-auto py-14 px-6 text-gray-700 space-y-12">

        {/* SECTION TEMPLATE */}
        <Section
          icon={<FaFileUpload className="text-indigo-600 text-3xl" />}
          title="1. Files You Upload"
          content={
            <>
              <p>
                MicroTools Hub processes your files only temporarily to generate
                results such as compression, conversion, or optimization.
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Files are deleted automatically after processing.</li>
                <li>We never store, backup, or analyze your files.</li>
                <li>No copies are saved on our servers.</li>
                <li>All processing is short-lived and automated.</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaYoutube className="text-indigo-600 text-3xl" />}
          title="2. YouTube & External Video Downloads"
          content={
            <>
              <p>
                When using our YouTube Downloader or Shorts Downloader:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>We do not track or log any URLs you input.</li>
                <li>No video content is stored or cached.</li>
                <li>All processing is done on-demand and erased instantly.</li>
              </ul>

              <p className="mt-3">
                Users are responsible for respecting applicable copyright laws.
              </p>
            </>
          }
        />

        <Section
          icon={<FaUserSecret className="text-indigo-600 text-3xl" />}
          title="3. Personal Data We Do NOT Collect"
          content={
            <>
              <p>MicroTools Hub never collects any sensitive personal data.</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>No accounts or sign-ups</li>
                <li>No phone numbers</li>
                <li>No passwords</li>
                <li>No file contents</li>
                <li>No precise location</li>
                <li>No identity data</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaShieldAlt className="text-indigo-600 text-3xl" />}
          title="4. Anonymous Information We May Collect"
          content={
            <>
              <p>
                To improve site performance, we may collect basic anonymous data:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Device/browser type</li>
                <li>General usage statistics</li>
                <li>Screen size</li>
              </ul>
              <p className="mt-3">
                These details are anonymous and cannot identify you.
              </p>
            </>
          }
        />

        <Section
          icon={<FaCookieBite className="text-indigo-600 text-3xl" />}
          title="5. Cookies & Analytics"
          content={
            <>
              <p>We may use lightweight cookies to:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Remember user preferences</li>
                <li>Enhance performance</li>
                <li>Perform basic analytics</li>
              </ul>

              <p className="mt-3">
                We do <strong>not</strong> use cookies for personal advertising
                unless required by Google AdSense.
              </p>
            </>
          }
        />

        <Section
          icon={<FaTools className="text-indigo-600 text-3xl" />}
          title="6. Third-Party Services"
          content={
            <>
              <p>We may integrate third-party services such as:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Google Analytics</li>
                <li>Razorpay (payments)</li>
                <li>Google AdSense</li>
              </ul>
              <p className="mt-3">
                These services may collect anonymous usage data on their end.
              </p>
            </>
          }
        />

        <Section
          icon={<FaChild className="text-indigo-600 text-3xl" />}
          title="7. Children's Privacy"
          content={
            <p>
              MicroTools Hub is not designed for children under 13.  
              We do not knowingly collect any information from minors.
            </p>
          }
        />

        <Section
          icon={<FaSync className="text-indigo-600 text-3xl" />}
          title="8. Updates to This Policy"
          content={
            <p>
              As our tools grow, we may update this Privacy Policy.  
              All changes will be posted on this page.
            </p>
          }
        />

        <Section
          icon={<FaEnvelope className="text-indigo-600 text-3xl" />}
          title="9. Contact Us"
          content={
            <>
              <p>
                If you have any questions regarding privacy or data usage:
              </p>

              <p className="font-semibold text-indigo-700 text-lg mt-4">
                📩 Email:{" "}
                <a href="mailto:microtools12345@gmail.com" className="underline">
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

/* 🔥 Reusable Section Component for Premium UI */
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


