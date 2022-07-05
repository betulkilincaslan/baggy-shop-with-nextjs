import nc from "next-connect";
// import bcrypt from "bcryptjs";
import User from "/models/userModel";
// import db from "/utils/db";
import { signToken, isAuthenticated } from "/utils/auth";

const handler = nc();
handler.use(isAuthenticated);

handler.get(async (req, res, next) => {
  // await db.connect();
  const user = await User.findById(req.user._id);
  console.log(req.user._id);
  // await db.disconnect();

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

handler.put(async (req, res, next) => {
  // await db.connect();
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // await db.disconnect();
    const token = signToken(user);
    res.json({
      token,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export default handler;
