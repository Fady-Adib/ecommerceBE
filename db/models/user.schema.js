import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: "string",
      required: true,
      minLength: [4, "too short"],
      maxLength: [15, "too long"],
      trim: true,
    },
    lastName: {
      type: "string",
      required: true,
      minLength: [4, "too short"],
      maxLength: [15, "too long"],
      trim: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      trim: true,
    },
    age: {
      type: "number",
      required: true,
      min: [16, "Must be at least 16 years old"],
      max: [90, "Must be at max 90 years old"],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other", "prefer not to say"],
        message: `{VALUE} is not supported`,
      },
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: ["online", "offline"],
        message: `{VALUE} is not supported`,
      },
      default: "offline",
    },

    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: `{VALUE} is not supported`,
      },
      default: "user",
      trim: true,
    },
    passwordChangeTime: {
      type: Date,
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    addresses: [
      {
        name: { type: String, required: true },
        fullAddress: { type: String, required: true },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        city: { type: String, required: true },
        addressLabel: {
          type: String,
          enum: {
            values: ["home", "work"],
            message: `{VALUE} is not supported`,
          },
          trim: true,
        },
        country: { type: String, required: true },
      },
    ],
    otp: {
      type: Number,
      expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "5m" },
      },
    },
  },

  {
    timestamps: true,

  }
);

userSchema.pre("save",function(){
this.password=bcrypt.hashSync(this.password,Number(process.env.BCRYPT_ROUND))

})

userSchema.pre("findOneAndUpdate",function(){
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(
      this._update.password,
      Number(process.env.BCRYPT_ROUND)
    );
    this._update.status = "offline";
    this._update.passwordChangeTime = Date()

  }

})
const userModel = mongoose.model("user", userSchema);

export default userModel;
