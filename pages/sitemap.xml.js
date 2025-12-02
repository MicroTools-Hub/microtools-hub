export async function getServerSideProps({ res }) {
  const baseUrl = "https://yourdomain.com";

  const pages = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/privacy-policy",
    "/terms",
    "/tools/meme-generator",
    "/tools/text-summarizer",
    "/tools/quote-generator",
    "/tools/password-generator",
    "/tools/emoji-translator",
    "/tools/shorts",
    "/tools/youtube",
    "/tools/pdf-compressor",
    "/tools/image-compressor",
    "/tools/file-compressor",
    "/tools/file-converter"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
