import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

//@desc Get all users
//?@route GET /api/users
//@access private
export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json({
      success: true,
      data: users,
    });
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "Users not found",
    });
    throw new Error("Users not found");
  }
});

//@desc Get user by id
//?@route GET /api/user/:id
//@access private
export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "User not found",
    });
    throw new Error("User not found");
  }
});

//@desc Get user's total points
//?@route GET /api/user/:id/points
//@access private
export const getUserPoints = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      success: true,
      data: {
        points: user.points,
      },
    });
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "User not found",
    });
    throw new Error("User not found");
  }
});

//@desc Register a user
//!@route POST /api/register
//@access public
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email, phone, password } = req.body;

    if (!firstname || !lastname || !email || !phone || !password) {
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
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      locations: [
        { name: "Исторически музей", visited: false },
        { name: "Хераклея Синтика", visited: false },
        { name: "Къща Ванга", visited: false },
        { name: "Самуилова Крепост", visited: false },
      ],
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          location: user.locations,
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
//!@route POST /api/login
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
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
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
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
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

//@desc Add points to user
//!@route POST /api/user/:id/points
//@access private
export const addPoints = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.points += req.body.points;
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        points: user.points,
      },
    });
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "User not found",
    });
    throw new Error("User not found");
  }
});

//@desc Deduct points from user
//!@route POST /api/user/:id/points/deduct
//@access private
export const deductPoints = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.points -= req.body.points;
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        points: user.points,
      },
    });
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "User not found",
    });
    throw new Error("User not found");
  }
});

//@desc Update user location
//!@route PUT /api/user/:id/location
//@access private
export const updateUserLocation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const location = user.locations.find(
      (location: any) => location.name === req.body.location
    );
    if (location) {
      location.visited = true;
      await user.save();
      res.status(200).json({
        success: true,
        data: {
          location: location,
        },
      });
    } else {
      res.status(404);
      res.send({
        success: false,
        message: "Location not found",
      });
      throw new Error("Location not found");
    }
  } else {
    res.status(404);
    res.send({
      success: false,
      message: "User not found",
    });
    throw new Error("User not found");
  }
});
