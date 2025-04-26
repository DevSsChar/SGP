import { Inter } from "next/font/google";
import ChatButton from "../components/Chat/ChatButton";
import Navbar from "../components/Navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PathFinder",
  description: "Find your career path",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatButton />
        </AuthProvider>
      </body>
    </html>
  );
} 