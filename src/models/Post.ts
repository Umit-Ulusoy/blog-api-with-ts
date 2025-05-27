import { Schema, model, Document, Types } from "mongoose";
import slugify from "slugify";

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  author: Types.ObjectId;
  views: number;
  comments: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.pre<IPost>("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Post = model<IPost>("Post", postSchema);

export default Post;
