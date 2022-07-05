import nc from "next-connect";
import Order from "/models/orderModel";
import db from "/utils/db";
import { isAuthenticated } from "/utils/auth";

const handler = nc();

handler.use(isAuthenticated);

handler.get(async (req, res) => {
  await db.connectDB();
  const order = await Order.findById(req.query.id);
  await db.disconnectDB();
  res.send(order);
});

export default handler;
