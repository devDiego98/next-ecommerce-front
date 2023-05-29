// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongooseConnect from "../lib/mongoose";
import Product from "../models/Product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  const urlParams = new URLSearchParams(req.url);

  // Create a new object to store the extracted properties
  const propertiesObj = {};

  // Iterate over each query parameter
  urlParams.forEach((value, key) => {
    // Check if the key starts with 'properties.'
    if (key.startsWith("properties.")) {
      const propertyKey = key.substring("properties.".length);
      propertiesObj[`properties.${propertyKey}`] = value;
    }
  });

  if (method === "GET") {
    try {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        return res.json(product);
      }

      if (req.query?.categoryId) {
        const { categoryId } = req.query;
        const products = await Product.find({
          category: categoryId,
          ...propertiesObj,
        });
        return res.status(200).json(products);
      }

      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
