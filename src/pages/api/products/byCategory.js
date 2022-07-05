// import nc from "next-connect";
// import Product from "../../../models/productModel";
// import db from "../../../utils/db";

// const handler = nc();

// handler.post(async (req, res) => {
//   await db.connectDB();
//   const category = req.category.toLowerCase().replaceAll(" ", "-");
//   const products = await Product.find({ category });
//   console.log(products);

//   await db.disconnectDB();
//   res.send(products);
// });

// export default handler;

import nc from "next-connect";
import Product from "/models/productModel";
import db from "/utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connectDB();
  const products = await Product.find({});
  console.log(req.body.category);
  await db.disconnectDB();
  res.send(products);
});

export default handler;
