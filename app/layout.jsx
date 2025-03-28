import { Inter } from "next/font/google";
import ChatButton from "../components/Chat/ChatButton";
import Navbar from "../components/Navbar";
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
          <ChatButton />
        </AuthProvider>
      </body>
    </html>
  );
} 