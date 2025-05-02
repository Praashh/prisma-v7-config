import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  {prisma}  from "@repo/db";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      isOnboarded?: boolean;
      publicKey?: string;
      socialHandle?: string;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        if (profile.email_verified) {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: profile.name.replace(" ", "").toLowerCase(),
                email: profile.email,
              },
            });
          }

          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session }: any) {
      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (userFromDb) {
        session.user.id = userFromDb.id;
        session.user.name = userFromDb.name;
        session.user.isOnboarded = userFromDb.isOnboarded;
        session.user.publicKey = userFromDb.publicKey;
        session.user.socialHandle = userFromDb.socialHandle;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // If it's a sign-in callback, fetch user data to determine redirection
      if (url.startsWith(baseUrl + "/api/auth/callback")) {
        // Get user email from the URL query parameters
        const urlParams = new URL(url).searchParams;
        const callbackUrl = urlParams.get("callbackUrl");
        
        // Check if redirection is already set in the callback URL
        if (callbackUrl && (callbackUrl.includes("/marketplace") || callbackUrl.includes("/onboarding"))) {
          return callbackUrl;
        }
        
        // Get the user's email from the session
        const sessionEmail = urlParams.get("email");
        
        if (sessionEmail) {
          try {
            const user = await prisma.user.findUnique({
              where: { email: sessionEmail },
            });
            
            if (user && user.isOnboarded) {
              return `${baseUrl}/marketplace`;
            } else {
              return `${baseUrl}/onboarding`;
            }
          } catch (error) {
            console.error("Error fetching user data for redirection:", error);
          }
        }
      }
      
      // Default fallback to the callback URL or home page
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};