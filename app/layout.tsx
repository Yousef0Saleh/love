import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love You 💕",
  description: "A romantic surprise for someone special",
  openGraph: {
    title: "Love You 💕",
    description: "I have a special surprise for you... 💖",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop", // Romantic heart image
        width: 1200,
        height: 630,
        alt: "Love You",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {/* Floating Hearts Background */}
        <div className="hearts-background">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
