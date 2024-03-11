import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

//@desc Register a user
//!@route POST /api/users/register
//@access public
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      res.send({
        success: false,
        message: "All fields are mandatory!",
      });
      throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      res.status(400);
      res.send({
        success: false,
        message: "User already registered!",
      });
      throw new Error("User already registered!");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: "User data is not valid",
      });
      throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
  }
);

//@desc Login user
//!@route POST /api/users/login
//@access public
export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      res.send({
        success: false,
        message: "All fields are mandatory!",
      });
      throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!process.env.ACCESS_TOKEN_SECERT) {
        res.status(500);
        res.send({
          success: false,
          message: "Access token secret is not defined",
        });
        throw new Error("Access token secret is not defined");
      }

      const accessToken: string = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "24h" }
      );
      res.status(200).json({
        success: true,
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          accessToken: accessToken,
        },
      });
    } else {
      res.status(401);
      res.send({
        success: false,
        message: "email or password is not valid",
      });
      throw new Error("email or password is not valid");
    }
  }
);
