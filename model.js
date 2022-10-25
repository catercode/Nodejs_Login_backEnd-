import mongoose from "mongoose";
const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String, require: true
    },
    phoneNumber: {
        type: Number, require: true
    },
    password: { type: String, require: true }
})

const usermodel = model("signup", userSchema)
export default usermodel