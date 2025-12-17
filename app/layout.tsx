import './globals.css';
import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export const metadata = {
  title: 'ElegancyArt AI Builder',
  description: 'Luxury AI-powered dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-black text-white font-sans overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
