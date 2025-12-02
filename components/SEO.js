import Head from "next/head";
import { useRouter } from "next/router";

export default function SEO({
  title = "MicroTools Hub",
  description = "Fast & free tools for YouTube downloading, compression, conversion & productivity.",
  keywords = "online tools, youtube downloader, pdf compressor, file converter",
  image = "/og-image.png",
}) {
  const router = useRouter();

  // 🍀 Detect base URL correctly
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  const fullUrl = `${baseUrl}${router.asPath}`;

  // 🍀 Ensure image is absolute URL
  const ogImage = image.startsWith("http")
    ? image
    : `${baseUrl}${image}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MicroTools Hub",
    url: baseUrl,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Head>
      <title>{title}</title>

      {/* 🔥 Essential Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#6366F1" />

      {/* 🔥 Indexing control */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* 🔥 Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* 🔥 OG Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* 🔥 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 🔥 Favicon + Apple Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* 🔥 Structured Data (Major SEO Boost) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
}




