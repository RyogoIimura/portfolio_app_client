// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import { Adapter } from "next-auth/adapters";
// import GoogleProvider from 'next-auth/providers/google'

// const prisma = new PrismaClient()

// export const authOptions = {
//   secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
//     }),
//   ],
// }


import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = { 
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};