import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
export const metadata: Metadata = {
  title: "Money Lore | AI Financial Analyst",
  description:
    "Your entire financial life, effortlessly tracked by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2E5245",
          colorBackground: "#FDFDFD",
        },
      }}
    >
      <html lang="en">
        <body className="antialiased bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}