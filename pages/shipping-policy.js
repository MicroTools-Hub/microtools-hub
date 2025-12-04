import SEO from "../components/SEO";

export default function ShippingPolicy() {
  return (
    <>
      <SEO
        title="Shipping Policy | MicroTools Hub"
        description="Shipping policy for MicroTools Hub. All tools are digital and delivered instantly online. No physical shipping involved."
        keywords="shipping policy, digital delivery, microtools hub"
      />

      <section className="py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Shipping Policy</h1>
        <p className="max-w-2xl mx-auto mt-3 text-lg opacity-90">
          MicroTools Hub provides 100% online digital tools — nothing is shipped physically.
        </p>
      </section>

      <div className="max-w-4xl mx-auto py-14 px-6 text-gray-700">
        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Digital Delivery Only
          </h2>

          <p className="leading-7 mb-4">
            MicroTools Hub operates entirely online. All features — including downloads,
            converters, compressors, and generators — are delivered instantly through our website.
          </p>

          <p className="leading-7 mb-4">
            ⭐ <strong>No physical goods are shipped.</strong>
          </p>

          <p className="leading-7 mb-4">
            Once you access our platform, you can immediately use all tools without waiting.
          </p>
        </div>

        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Delivery Time
          </h2>
          <p className="leading-7">
            All services are delivered instantly upon opening the tool.  
            You do not need to wait for any shipping or manual delivery.
          </p>
        </div>

        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Contact for Support
          </h2>
          <p className="leading-7">
            For any concerns, email us at:{" "}
            <a className="text-indigo-600 underline" href="mailto:microtools12345@gmail.com">
              microtools12345@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
