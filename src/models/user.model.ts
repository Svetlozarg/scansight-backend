import { Document, Schema, model, models } from "mongoose";

type LocationType = {
  name: string;
  visited: boolean;
};

export interface IUser extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  points: number;
  locations: LocationType[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    locations: [
      {
        name: {
          type: String,
          required: true,
        },
        visited: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
