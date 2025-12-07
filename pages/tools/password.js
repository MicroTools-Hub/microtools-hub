import { useState } from "react";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { runFinalAction } from "../../utils/finalAction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+{}[]<>?/";

    let chars = "";
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      alert("Please select at least one option!");
      return;
    }

    let output = "";
    for (let i = 0; i < length; i++) {
      output += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(output);
    setCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  // Strength meter
  const calculateStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (includeUppercase && includeLowercase) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (score === 2) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-600", width: "100%" };
  };

  const strength = calculateStrength();

  return (
    <>
      {/* ⭐⭐⭐⭐⭐ FULL SEO UPGRADED */}
      <SEO
        title="Password Generator — Create Secure, Random & Strong Passwords | MicroTools Hub"
        description="Generate ultra-secure passwords online instantly. Adjustable length, symbols, numbers, uppercase/lowercase letters. Free strong password generator with no limits."
        keywords="password generator, strong password generator, random password, secure password, password strength checker"
        image="/og/password-generator.png"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Password Generator — MicroTools Hub",
          applicationCategory: "Security Application",
          operatingSystem: "All",
          url: "https://microtools-hub.vercel.app/tools/password",
          description:
            "Free strong password generator with length control and security strength meter.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* ⭐ Google FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is the password generator free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the MicroTools Hub password generator is completely free with unlimited usage.",
                },
              },
              {
                "@type": "Question",
                name: "Are the passwords stored anywhere?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, all password generation happens locally on your device. Nothing is uploaded or saved.",
                },
              },
              {
                "@type": "Question",
                name: "What is the recommended password length?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Security experts recommend using passwords of at least 12–16 characters.",
                },
              },
              {
                "@type": "Question",
                name: "Does this tool generate strong, secure passwords?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. You can include uppercase, lowercase, numbers, and symbols for maximum strength.",
                },
              }
            ]
          })
        }}
      />

      <ToolLayout>
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">
          Password Generator
        </h1>

        {/* Card */}
        <div className="p-6 bg-white/80 backdrop-blur rounded-xl shadow-lg space-y-6 border">

          {/* Display */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="w-full p-3 border rounded-lg font-mono text-lg pr-14"
              placeholder="Generated password..."
            />

            {/* Toggle visibility */}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <EyeIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Copy */}
          {password && (
            <button
              onClick={runFinalAction(copyPassword)}
              className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                copied ? "bg-green-600" : "bg-gray-900 hover:bg-black"
              }`}
            >
              {copied ? "Copied!" : "Copy Password"}
            </button>
          )}

          {/* Strength meter */}
          {password && (
            <div>
              <p className="font-semibold mb-1">Strength: {strength.label}</p>
              <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                <div
                  className={`${strength.color} h-3 transition-all`}
                  style={{ width: strength.width }}
                ></div>
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="space-y-4">

            {/* Length */}
            <div>
              <label className="font-semibold">Length: {length}</label>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include Lowercase (a-z)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include Uppercase (A-Z)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers (0–9)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols (!@#$)
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
              onClick={runFinalAction(generatePassword)}
            className="w-full py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-lg font-semibold"
          >
            Generate Password
          </button>
        </div>

        {/* Instructions */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            How to Use This Password Generator
          </h2>

          <ul className="list-disc ml-5 text-gray-700 leading-7">
            <li>Select your preferred password length (recommended: 12–20).</li>
            <li>Choose character types (uppercase, lowercase, symbols, numbers).</li>
            <li>Click <strong>Generate Password</strong>.</li>
            <li>Copy & use it anywhere securely.</li>
          </ul>
        </section>
      </ToolLayout>
    </>
  );
}




