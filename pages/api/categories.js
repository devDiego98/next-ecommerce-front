// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongooseConnect from "../lib/mongoose";
import Category from "../models/Category";
export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Category.findOne({ _id: req.query.id }));
    }
    res.json(await Category.find());
  }
}
