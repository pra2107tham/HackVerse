"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <div className="fixed inset-0 z-[-1]">
            <svg
              className="w-full h-full opacity-[0.03]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`horizontal-${i}`}
                  x1="0"
                  y1={i * 30}
                  x2="100"
                  y2={i * 30}
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`vertical-${i}`}
                  x1={i * 30}
                  y1="0"
                  x2={i * 30}
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
              ))}
              <path
                d="M0,50 Q25,30 50,50 T100,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}

