// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongooseConnect from "../lib/mongoose";
import User from "../models/User";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  const { email } = req.query;
  console.log(email);
  if (method === "GET") {
    try {
      console.log(req.body);
      const user = await User.findOne({ email: email });
      console.log(user);
      return res.json({ user });
    } catch (error) {
      console.error("User not found:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
