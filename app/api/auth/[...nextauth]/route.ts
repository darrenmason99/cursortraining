import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userService } from "../../../services/userService";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback triggered with user:', {
        id: user.id,
        email: user.email,
        name: user.name,
      });

      try {
        // Check if user exists in Supabase
        console.log('Checking if user exists in Supabase...');
        const existingUser = await userService.getUserById(user.id);
        console.log('Existing user check result:', existingUser);
        
        // If user doesn't exist, create them
        if (!existingUser) {
          console.log('User does not exist, creating new user...');
          const newUser = await userService.createUser({
            id: user.id,
            email: user.email!,
            name: user.name!,
            image: user.image || undefined,
          });
          console.log('New user created:', newUser);
        } else {
          console.log('User already exists in database');
        }
        
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        // Log the full error details
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
          });
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST }; 