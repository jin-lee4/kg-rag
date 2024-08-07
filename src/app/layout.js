import { Inter } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header/Header";
import "./styles/variables.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ruleaid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
