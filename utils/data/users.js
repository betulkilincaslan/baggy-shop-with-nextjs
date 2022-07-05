import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "Betul",
    email: "betul@gmail.com",
    password: bcrypt.hashSync("betul123", 10),
  },
];

export default users;
