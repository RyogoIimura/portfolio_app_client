"use client";
import "./globals.css";
import NextAuthProvider from './providers/NextAuth'
import { css } from "@emotion/react";

import { Noto_Sans_JP } from 'next/font/google'
import { HEAD, PROJECT } from '../data/AppData'
import { vw } from "./utils/Responsive";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400','700']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang='ja'>
      <head>
        <title>{HEAD.NAME}</title>
        <meta name="description" content={HEAD.DESCRIPTION}/>
        <link rel="canonical" href={`${HEAD.URL}lp`}/>
        <meta property="og:title" content={HEAD.NAME}/>
        <meta property="og:site_name" content={HEAD.NAME}/>
        <meta property="og:description" content={HEAD.DESCRIPTION}/>
        <meta property="og:url" content={`${HEAD.URL}lp`}/>
        <meta property="og:image" content={`${HEAD.URL}images/og.png`}/>
      </head>
      <body
        className={noto_sans_jp.className}
        css={styles.body}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

const styles = {
  body: css `
    margin-top: ${vw(140)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 120px;
    }
  `,
}
