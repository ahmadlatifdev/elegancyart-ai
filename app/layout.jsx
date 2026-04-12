import "./globals.css";

export const metadata = {
  title: "Resumora",
  description: "Luxury Resume Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}