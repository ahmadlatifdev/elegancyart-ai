import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Resumora",
  description: "Premium AI Resume Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#070b14] text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}