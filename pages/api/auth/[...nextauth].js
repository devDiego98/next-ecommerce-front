import NextAuth, { NextAuthOptions } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import mongooseConnect from "@/pages/lib/mongoose";
import User from "@/pages/models/User";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        await mongooseConnect();
        // Add logic here to look up the user from the credentials supplied
        // console.log(credentials);
        let exists = await User.findOne({ email: credentials.email });
        if (!exists && !credentials.login) {
          const userDoc = await User.create({
            email: credentials.email,
            password: credentials.password,
          });
          console.log(userDoc);
          return userDoc;
        } else {
          if (!credentials.login) {
            throw Error("User already exists , please sign in");
          } else {
            if (credentials.password === exists.password) {
              return exists;
            } else {
              throw Error("Password is incorrect");
            }
          }
        }

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
};
export default NextAuth(authOptions);
