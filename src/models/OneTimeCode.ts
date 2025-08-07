import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IOneTimeCode extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  purpose: 'email_verification' | 'password_reset';
  expiresAt: Date;
  createdAt: Date;
}

const OneTimeCodeSchema: Schema<IOneTimeCode> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    code: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['email_verification', 'password_reset'],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
  }
);

OneTimeCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OneTimeCode: Model<IOneTimeCode> = mongoose.model<IOneTimeCode>('OneTimeCode', OneTimeCodeSchema);

export default OneTimeCode;
