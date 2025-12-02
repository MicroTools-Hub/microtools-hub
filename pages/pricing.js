import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import SEO from "../components/SEO";

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: "Monthly",
      price: 2,
      id: "monthly",
      highlight: false,
      badge: "Starter",
      features: [
        "Unlimited 1080p downloads",
        "Ad-free experience",
        "Faster compression",
        "Higher file size limits",
        "All premium tools",
      ],
    },
    {
      name: "Yearly",
      price: 10,
      id: "yearly",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Everything in Monthly",
        "Cheapest long-term plan",
        "Priority speed",
      ],
    },
    {
      name: "Lifetime",
      price: 25,
      id: "lifetime",
      highlight: false,
      badge: "Best Value",
      features: [
        "One-time payment",
        "Lifetime access",
        "All future tools included",
      ],
    },
  ];

  // Payment logic stays exactly the same
  const startPayment = async (planId, priceInUSD) => {
    setLoading(true);

    const amountInINR = Math.round(priceInUSD * 85);

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInINR }),
    });

    const orderData = await orderRes.json();
    if (!orderData.success) {
      alert("Error creating Razorpay order");
      setLoading(false);
      return;
    }

    const order = orderData.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "MicroTools Hub Premium",
      description: `${planId} plan`,
      order_id: order.id,

      handler: async function (response) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verify = await verifyRes.json();

        if (verify.verified) {
          alert("Payment successful! Premium activated.");
        } else {
          alert("Payment verification failed.");
        }
      },

      theme: { color: "#6366F1" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Premium Pricing — MicroTools Hub"
        description="Unlock unlimited 1080p downloads, faster compression, ad-free experience & premium file tools with Monthly, Yearly, or Lifetime Premium."
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* HERO SECTION */}
      <section className="text-center mt-10">
        <h1 className="text-5xl font-extrabold text-indigo-600">
          Upgrade to Premium
        </h1>

        <p className="text-gray-600 text-lg mt-3">
          Faster tools. No ads. Unlimited power.
        </p>
      </section>

      {/* PREMIUM PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto px-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-8 rounded-2xl shadow-lg border
              ${
                plan.highlight
                  ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white scale-105"
                  : "bg-white text-gray-900"
              }
              transition hover:shadow-xl`}
          >
            {/* Badge */}
            <span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full
                ${
                  plan.highlight
                    ? "bg-white text-indigo-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
            >
              {plan.badge}
            </span>

            <h2 className="text-3xl font-bold">{plan.name}</h2>

            <p className="text-5xl font-extrabold mt-3 mb-6">
              ${plan.price}
            </p>

            <ul
              className={`space-y-3 text-base ${
                plan.highlight ? "text-indigo-100" : "text-gray-700"
              }`}
            >
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <button
              className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg transition
                ${
                  plan.highlight
                    ? "bg-white text-indigo-700 hover:bg-gray-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              onClick={() => startPayment(plan.id, plan.price)}
              disabled={loading}
            >
              {loading ? "Processing..." : `Buy ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* FEATURES COMPARISON TABLE — SUPER PREMIUM */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Compare All Plans
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4">Feature</th>
                <th className="p-4 text-center">Free</th>
                <th className="p-4 text-center">Premium</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              {[
                ["1080p Downloads", "Limited", "Unlimited"],
                ["Ads", "Yes", "No"],
                ["PDF Compression Speed", "Normal", "2× Faster"],
                ["Max File Upload Size", "100MB", "2GB"],
                ["Access to All Tools", "Basic Only", "Full Access"],
                ["Early Access to New Tools", "No", "Yes"],
                ["Support", "Standard", "Priority"],
              ].map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4">{row[0]}</td>
                  <td className="p-4 text-center">{row[1]}</td>
                  <td className="p-4 text-center font-semibold text-indigo-600">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ (kept same but styled better) */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5 text-gray-700 text-lg">
          <div>
            <h3 className="font-semibold">Is 1080p download free?</h3>
            <p>
              Yes, but Premium gives unlimited high-speed access & no ads.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Is Lifetime really one-time?</h3>
            <p>Yes, pay once → get access forever.</p>
          </div>

          <div>
            <h3 className="font-semibold">Payment supported?</h3>
            <p>UPI, Cards, Wallets, International cards.</p>
          </div>

          <div>
            <h3 className="font-semibold">Refund policy?</h3>
            <p>Digital products are non-refundable.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center my-20">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">
          Ready to Unlock Premium?
        </h2>
        <button
          onClick={() => startPayment("monthly", 2)}
          className="px-10 py-4 text-lg bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Get Started — $2/mo
        </button>
      </section>
    </>
  );
}


