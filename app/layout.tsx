import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "CareerAI - Hệ thống tư vấn nghề nghiệp thông minh",
  description: "Khám phá nghề nghiệp phù hợp với bạn thông qua công nghệ AI tiên tiến. Làm bài trắc nghiệm và nhận gợi ý nghề nghiệp chính xác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
