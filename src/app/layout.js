import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';  //for MUI
import { ClerkProvider } from '@clerk/nextjs';  //for clerk

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JourneyGo",
  description: "Start your journey with JourneyGo",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=maps,marker`}></script>
        </head>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>  
          </body>
      </html>
    </ClerkProvider>
  );
}
