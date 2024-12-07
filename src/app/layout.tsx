import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import NavigationContainer from "@/components/NavigationContainer";
import ProblemSelector from "@/components/ProblemSelector";

import './globals.css'

import { Source_Code_Pro } from 'next/font/google'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

const problemGroups: Record<number, number[]> = {
  2024: [1, 2, 3, 4, 5, 6, 7],
  2023: [1],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background text-white ${sourceCodePro.className}`}>
        <AppRouterCacheProvider>
          <NavigationContainer drawerContent={<ProblemSelector problemMap={problemGroups} />}>
            {children}
          </NavigationContainer>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
