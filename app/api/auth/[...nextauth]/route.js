import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

import { connectToDB } from "@utils/database";

const GOOGLE_CLIENT_ID =
  "822876224077-v3s15524bvr0gd5asfartimpu3pu9v7k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        //every nodejs route is serverless route  which means it is a lamba function
        //it will be opens up only when it is called
        //serverLess -> lamba -> dynamodb

        await connectToDB();
        //check if a user already exist
        //if not create user and save it to db
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          console.log(profile);
          await User.create({
            email: profile.email,
            username: profile.name.toString().replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      
    } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
