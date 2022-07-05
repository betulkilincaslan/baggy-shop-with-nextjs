import nc from "next-connect";
import Product from "/models/productModel";
import db from "/utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connectDB();
  const product = await Product.findById(req.query.id);
  await db.disconnectDB();

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export default handler;
