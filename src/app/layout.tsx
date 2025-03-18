import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

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
    <html lang="ja" className={`${mPlusRounded1c.className}`}>
      <body>{children}</body>
    </html>
  );
}
