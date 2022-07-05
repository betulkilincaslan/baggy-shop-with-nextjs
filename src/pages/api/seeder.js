import nc from "next-connect";
import Product from "/models/productModel";
import User from "/models/userModel";
import Order from "/models/orderModel";
import products from "/utils/data/products";
import users from "/utils/data/users";
import db from "/utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connectDB();

  await User.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  const createdUsers = await User.insertMany(users);
  const adminUser = createdUsers[0]._id;
  const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser };
  });
  await Product.insertMany(sampleProducts);

  await db.disconnectDB();

  res.json({ message: "Seeded successfully!" });
});

export default handler;
