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
      <main className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

