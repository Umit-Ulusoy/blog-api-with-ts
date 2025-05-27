import { Schema, model, Document } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
  name: string;
  slug: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    slug: {
        type: String,
        unique: true
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
  }
  next();
});

export default model<ICategory>("Category", categorySchema);
