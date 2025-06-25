import Nabar from "@/app/components/Nabar";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Tu sitio",
};

const redHatDisplay = Red_Hat_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: "normal",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} bg-black text-white`}>
        <Nabar />
        <main>{children}</main>
      </body>
    </html>
  );
}
