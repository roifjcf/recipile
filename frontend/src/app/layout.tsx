import type { Metadata } from "next";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Recipile",
  description: "Keep track on your recipes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
