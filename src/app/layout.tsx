import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "在庫管理システム",
  description: "実装で学ぶフルスタックWeb開発で作る「在庫管理システム」",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
