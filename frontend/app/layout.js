import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata = {
  title: "FluentAi",
  description: "Your AI English Practice Partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased flex flex-col min-h-screen relative">
        {/* Remove bg-gray-100 and add relative positioning */}
        <header className="relative z-50">
          <div className="container mx-auto px-4 py-4">
            <Navbar />
          </div>
        </header>

        <main className="flex-grow p-4 relative z-10">
          {children}
        </main>
        <Footer />
        {/* Animated Background */}
        
      </body>
    </html>
  );
}