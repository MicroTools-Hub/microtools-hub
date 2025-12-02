import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      
      {/* Top Navbar */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">
        <Header />
      </div>

      {/* Main content container */}
      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

