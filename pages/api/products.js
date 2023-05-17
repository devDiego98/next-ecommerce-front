// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongooseConnect from "../lib/mongoose";
import Product from "../models/Product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    }
    res.json(await Product.find());
  }

  // if (method === "POST") {
  //   const productDoc = await Product.create({
  //     name: req.body.name,
  //     desc: req.body.desc,
  //     price: req.body.price,
  //     images: req.body.images,
  //     category: req.body.category,
  //     properties: req.body.properties,
  //   });
  //   res.status(200).json(productDoc);
  // }

  // if (method === "PUT") {
  //   const { name, desc, price, _id, images, category, properties } = req.body;
  //   res.status(200).json(
  //     await Product.updateOne(_id, {
  //       name,
  //       desc,
  //       price,
  //       images,
  //       category,
  //       properties,
  //     })
  //   );
  // }

  // if (method === "DELETE") {
  //   const { _id } = req.body;
  //   res.status(200).json(await Product.deleteOne(_id));
  // }
}
