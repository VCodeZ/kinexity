import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../styles/globals.css";
import DarkModeProvider from "../components/DarkModeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kinexity – Watch Less, Know More",
  description: "Kinexity is a platform to watch less and know more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('darkMode');
                  if (mode === 'true') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-kinexity-background dark:bg-kinexity-dark-background text-kinexity-text dark:text-kinexity-dark-text min-h-screen transition-colors duration-200`}
      >
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
