import nc from "next-connect";
import Order from "/models/orderModel";
import { isAuthenticated } from "/utils/auth";
import db from "/utils/db";
import { onError } from "/utils/error";

const handler = nc({
  onError,
});
handler.use(isAuthenticated);

handler.post(async (req, res) => {
  await db.connectDB();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

export default handler;
