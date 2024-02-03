import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "maliktowkeerulislam", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, email: user.email });
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

export { checkUser };
