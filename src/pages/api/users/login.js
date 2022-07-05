import nc from "next-connect";
import User from "/models/userModel";
import db from "/utils/db";
import { signToken } from "/utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connectDB();
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  await db.disconnectDB();

  if (user && (await user.matchPassword(password))) {
    const token = signToken(user);
    res.json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export default handler;
