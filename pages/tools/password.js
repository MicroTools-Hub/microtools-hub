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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8 text-center">Secure Password Generator</h1>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
              <p className="font-bold">Important Notice:</p>
              <p className="text-sm">To support our free tools, clicking a button that performs a final action (like Compress, Download, or Convert) may open a sponsored advertisement in a new tab. Simply close the ad tab or navigate back to continue your task here.</p>
            </div>

            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-2xl border space-y-8">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  className="w-full p-4 border-2 border-gray-200 bg-gray-50 rounded-lg font-mono text-2xl pr-16 text-center"
                  placeholder="Your new password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? <EyeSlashIcon className="w-7 h-7" /> : <EyeIcon className="w-7 h-7" />}
                </button>
              </div>

              {password && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${strength.color} h-3 rounded-full transition-all duration-300`}
                        style={{ width: strength.width }}
                      ></div>
                    </div>
                    <span className={`font-semibold text-lg ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                  </div>

                  <button
                    onClick={runFinalAction(copyPassword)}
                    className={`w-full py-3 rounded-lg font-semibold text-lg text-white transition-all duration-300 ${
                      copied ? "bg-green-600" : "bg-gray-800 hover:bg-black"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy Password"}
                  </button>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="font-semibold text-lg">Password Length: {length}</label>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                  {[
                    { label: 'Lowercase (a-z)', state: includeLowercase, setter: setIncludeLowercase },
                    { label: 'Uppercase (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                    { label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                    { label: 'Symbols (!@#$)', state: includeSymbols, setter: setIncludeSymbols },
                  ].map(opt => (
                    <label key={opt.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-indigo-50">
                      <input
                        type="checkbox"
                        checked={opt.state}
                        onChange={(e) => opt.setter(e.target.checked)}
                        className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={runFinalAction(generatePassword)}
                className="w-full py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Generate Password
              </button>
            </div>

            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg border">
              <h2 className="font-bold text-2xl text-indigo-600 mb-4">How to Create a Strong Password</h2>
              <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">
                <li>Use a long password (16+ characters is recommended).</li>
                <li>Include a mix of uppercase letters, lowercase letters, numbers, and symbols.</li>
                <li>Avoid using personal information like birthdays or names.</li>
                <li>Never reuse passwords across different websites.</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}




