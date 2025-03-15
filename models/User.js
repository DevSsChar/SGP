import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
    },
    Age: {
        type: Number,
    },
    Location: {
        type: String,
    },
    Degree: {
        type: String,
    },
    Institution: {
        type: String,
    },
    GraduationYear: {
        type: Number,
    },
    Grade: {
        type: Number,
    },
    Company: {
        type: String,
    },
    Position: {
        type: String,
    },
    Duration: {
        type: Date,
    },
    Description: {
        type: String,
    },
    Skills: {
        type: String,
    },
    SoftSKills: {
        type: String,
    },
    Languages: {
        type: String,
    },
    Interests: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model already exists before defining it
const User = mongoose.models.User || model("User", UserSchema);

export default User;