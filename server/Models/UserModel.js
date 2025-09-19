const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username required"],
    },
    password: {
        type: String, 
        required: [true, "Enter your password"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model("User", userSchema);