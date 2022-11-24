import bcrypt from "bcryptjs";
import crypto from "crypto";
import { model, Schema } from "mongoose";
import addressSchema from "./Address";
import IUser from "./IUser";
const userSchema: Schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addresses: { type: [addressSchema] },
    password: {
      type: String,
      select: false,
      minlength: 8,
    },
    created_at: { type: Date, default: Date.now },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  // Only Run if password was modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
//   if (this.passwordChangedAt) {
//     const passwordTime = this.passwordChangedAt.getTime();
//     const changedTimeStamp = parseInt(
//       passwordTime / 1000,
//       10
//     );
//     return JWTTimestamp < changedTimeStamp;
//   }
//   // false not changed
//   return false;
// };

userSchema.methods.createPasswordResetToken = function () {
  const restToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return restToken;
};

export default model<IUser>("User", userSchema);
