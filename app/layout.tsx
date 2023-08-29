import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, Inter, Lora, Merriweather } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-ds", display: "swap" });
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
        <body className={`${inter.className} ${dm_sans.variable}  ${merriweather.variable} ${lora.variable} max-w-[100%] `}>
          {children}
        </body>
      </html>
    </ClerkProvider >
  );
}
