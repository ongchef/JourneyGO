import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';  //for MUI
import { ClerkProvider } from '@clerk/nextjs';  //for clerk
import { DataProvider } from "./components/dataContext";  //for context
import dotenv from 'dotenv';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JourneyGo",
  description: "Start your journey with JourneyGo",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=maps,marker`}></script>
        </head>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <DataProvider>
              {/* add nav bar */}
              {children}
            </DataProvider>
          </AppRouterCacheProvider>  
        </body>
      </html>
    </ClerkProvider>
  );
}