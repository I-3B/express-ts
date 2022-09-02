import mongoose from "mongoose";
const Schema = mongoose.Schema;
const User = new Schema(
    {
        facebookId: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        imageMini: {
            data: Buffer,
            contentType: String,
        },
        imageFull: {
            data: Buffer,
            contentType: String,
        },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("User", User);
