import { Inter,Outfit} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Manage your expenses",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
