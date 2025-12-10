import { useState } from "react";
import { runFinalAction } from "../../utils/finalAction";
import SEO from "../../components/SEO";
import ToolLayout from "../../components/ToolLayout";
import { BACKEND } from "../../config.js";

export default function XDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadVideo = () => {
    if (!url.trim()) {
      setError("Please paste a valid X / Twitter URL.");
      return;
    }

    setError("");
    setLoading(true);

    //  direct backend download
    window.location.href = `${BACKEND}/api/download/twitter?url=${encodeURIComponent(
      url
    )}`;

    // stop loader shortly (UI only)
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <SEO
        title="X (Twitter) Video Downloader — Free & Fast | MicroTools Hub"
        description="Download X (Twitter) videos in HD instantly. No watermark, no signup, 100% free."
        keywords="x video downloader, twitter video download, twitter mp4"
      />

              <ToolLayout>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

                  <div className="max-w-3xl mx-auto text-center">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-8">X (Twitter) Video Downloader</h1>

                    

                    <div className="p-6 bg-white rounded-2xl shadow-lg border mb-8 text-left">

                      <h2 className="font-bold text-2xl text-indigo-600 mb-4">How It Works</h2>

                      <ul className="list-decimal ml-6 text-gray-700 text-lg leading-relaxed space-y-2">

                        <li>Find a video on X (Twitter) that you want to download.</li>

                        <li>Click the <b>Share</b> icon on the post and select <b>Copy Link</b>.</li>

                        <li>Paste the link into the box below and click <b>Download Video</b>.</li>

                        <li>Your download will start automatically.</li>

                      </ul>

                    </div>

        

                    <div className="flex flex-col sm:flex-row gap-4">

                      <input

                        value={url}

                        onChange={(e) => setUrl(e.target.value)}

                        placeholder="Paste X or Twitter post URL"

                        className="w-full p-4 border rounded-lg text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"

                      />

                      <button

                        onClick={runFinalAction(downloadVideo)}

                        disabled={loading}

                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"

                      >

                        {loading ? "Preparing..." : "Download Video"}

                      </button>

                    </div>

        

                    {error && <p className="mt-4 text-red-500 text-lg font-semibold">{error}</p>}

        

                    <p className="mt-6 text-gray-600">

                      Works with both <b>twitter.com</b> and <b>x.com</b> links.

                    </p>

                  </div>

                </div>

              </ToolLayout>
    </>
  );
}
