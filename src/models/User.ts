import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(
    username: string,
    email: string
  ): Promise<{ isUsernameTaken: boolean; isEmailTaken: boolean }>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.isUserExist = async function (
  username: string,
  email: string
): Promise<{ isUsernameTaken: boolean; isEmailTaken: boolean }> {
  
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await this.findOne({
    $or: [
      { username: { $regex: `^${normalizedUsername}$`, $options: "i" } },
      { email: { $regex: `^${normalizedEmail}$`, $options: "i" } },
    ],
  });

  return {
    isUsernameTaken: existingUser?.username?.toLowerCase() === normalizedUsername,
    isEmailTaken: existingUser?.email?.toLowerCase() === normalizedEmail,
  };
};

const User = model<IUser, IUserModel>("User", userSchema);

export default User;
