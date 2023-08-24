import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Lora, Merriweather } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const merriweather = Merriweather({ weight: ["300", "400", "700", "900"], subsets: ["latin"], variable: "--font-mr", display: "swap" });

export const metadata = {
  title: "Dams",
  description: "Clothing Brand",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${merriweather.variable} ${lora.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider >
  );
}
