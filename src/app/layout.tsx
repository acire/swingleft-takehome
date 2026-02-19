import './globals.css'
import React from "react";
import { Geist } from 'next/font/google'
import { Metadata } from 'next';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: "Voter Registration Deadlines",
  description: "Find your state's voter registration deadlines",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
