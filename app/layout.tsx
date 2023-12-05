import { ClerkProvider } from "@clerk/nextjs";
import { Merriweather_Sans, Changa, Inter, DM_Sans } from "next/font/google";
import './globals.css'
import dotenv from "dotenv"

dotenv.config();

const inter = Inter({ subsets: ["latin"] });
const merrisans = Merriweather_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'], variable: "--font-merrisans", display: "swap" })
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-ds", display: "swap" });
const changa = Changa({ subsets: ["arabic"], weight: ['300', '400', '500', '600', '700', '800'], variable: "--font-changa", display: "swap" });



export const metadata = {
  title: "CDM Formations",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/logo.svg"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body className={`${inter.className} ${dm_sans.className}  ${merrisans.variable} ${changa.variable} max-w-[100%] `}>
          {children}
        </body>
      </html>
    </ClerkProvider >
  );
}
