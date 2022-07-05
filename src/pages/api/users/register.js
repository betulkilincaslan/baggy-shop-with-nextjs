import nc from "next-connect";
import User from "/models/userModel";
import db from "/utils/db";
import { signToken } from "/utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connectDB();
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    isAdmin: false,
  });

  await db.disconnectDB();

  if (newUser) {
    const token = signToken(newUser);
    res.status(201).json({
      token,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export default handler;
