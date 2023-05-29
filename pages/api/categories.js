// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongooseConnect from "../lib/mongoose";
import Category from "../models/Category";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    try {
      if (req.query?.fetchChildren) {
        let id = new ObjectId(req.query.id);
        const categories = await Category.find({
          $expr: {
            $eq: [{ $arrayElemAt: ["$parentCategory", -1] }, id],
          },
        });
        res.json(categories);
      } else if (req.query?.id) {
        const category = await Category.findOne({ _id: req.query.id });
        res.json(category);
      } else {
        const categories = await Category.find();
        res.json(categories);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
