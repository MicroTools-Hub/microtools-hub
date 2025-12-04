import SEO from "../components/SEO";

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Cancellation & Refund Policy | MicroTools Hub"
        description="Refund and cancellation policy for MicroTools Hub's digital tools. Refunds issued only for technical issues or duplicate payments."
        keywords="refund policy, cancellation, microtools hub refund"
      />

      <section className="py-16 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Cancellation & Refund Policy
        </h1>
        <p className="max-w-2xl mx-auto mt-3 text-lg opacity-90">
          Clear policies regarding refunds for digital services.
        </p>
      </section>

      <div className="max-w-4xl mx-auto py-14 px-6 text-gray-700">
        
        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Digital Products & Instant Delivery
          </h2>
          <p className="leading-7">
            All services on MicroTools Hub are digital and available instantly.
            Because tools are used immediately upon access, cancellations after usage are not possible.
          </p>
        </div>

        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Refund Eligibility
          </h2>

          <ul className="list-disc ml-6 leading-7">
            <li>If a payment was charged but you couldn't access the service.</li>
            <li>If a technical issue prevented tool usage.</li>
            <li>If duplicate payments were made accidentally.</li>
            <li>If a service was not used after payment.</li>
          </ul>

          <p className="leading-7 mt-4">
            Eligible refunds will be processed within 5–7 business days.
          </p>
        </div>

        <div className="border p-6 rounded-xl shadow bg-white mb-10">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Non-Refundable Cases
          </h2>

          <ul className="list-disc ml-6 leading-7">
            <li>Refund requests after successfully using a tool.</li>
            <li>Issues caused due to the user's internet/device/browser.</li>
            <li>Requests without valid transaction proof.</li>
          </ul>
        </div>

        <div className="border p-6 rounded-xl shadow bg-white">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Contact for Refund Support
          </h2>
          <p className="leading-7">
            Email:{" "}
            <a className="text-indigo-600 underline" href="mailto:microtools12345@gmail.com">
              microtools12345@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
