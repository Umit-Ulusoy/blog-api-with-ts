import { Schema, model, Document } from "mongoose";

export interface IToken extends Document {
  userId: Schema.Types.ObjectId;
  jti: string;
    type: 'access' | 'refresh';
  createdAt: Date;
  expiresAt: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jti: {
      type: String,
      required: true,
      unique: true,
    },
        type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
);

const Token = model<IToken>("Token", tokenSchema);

export default Token;
