export const metadata = {
  title: "ElegancyArt AI",
  description: "ElegancyArt AI System"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
