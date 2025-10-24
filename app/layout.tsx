import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalLayout from "../app/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nunya",
  description: "WAEC learning, AI practice, and teacher tools — all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#030814] text-white`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
