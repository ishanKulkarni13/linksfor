import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linksfor",
  description: "Link in bio tool for creators and professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en"  >
      <body  className={`${inter.className}`} >
        <ThemeProvider attribute="class"  defaultTheme = 'dark'>
          < >
            <>
             {children}
             </>
             <NextTopLoader
              color="var(--color-primary)"
              showSpinner={false}
             
             />
             <Toaster position="top-left" richColors closeButton={true} pauseWhenPageIsHidden={true} />

          </>
         
        </ThemeProvider>
        <Analytics /> {/* For Vercel Web Analytics tool */}
        
      </body>
    </html>
  );
}