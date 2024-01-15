import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  token?: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      minlength: [3, "Full name should be more then 3 characters"],
      maxlength: [18, "Full name should be less then 18 characters"],
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      maxlength: [100, "Email should be not then 100 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("comparePassword").get(function () {
  return async (password: string) => {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error("Error Occured");
    }
  };
});

userSchema.virtual("token");

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);

export default UserModel;
