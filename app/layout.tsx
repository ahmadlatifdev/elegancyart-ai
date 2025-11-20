export const metadata = {
  title: "ElegancyArt AI",
  description: "AI-powered system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

