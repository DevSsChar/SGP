"use server"

import connectDB from "@/db/connectDB"
import User from "@/models/User"

export const fetchuser = async (email) => {
    await connectDB()
    console.log(`Fetching user with email: ${email}`)
    let u = await User.findOne({ Email: email })
    if (!u) return null;
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const updateProfile = async (data, email) => {
    await connectDB()
    let ndata = Object.fromEntries(data);
    
    // Convert string values to appropriate types
    if (ndata.Age) ndata.Age = Number(ndata.Age);
    if (ndata.GraduationYear) ndata.GraduationYear = Number(ndata.GraduationYear);
    if (ndata.Grade) ndata.Grade = Number(ndata.Grade);
    if (ndata.Duration) ndata.Duration = new Date(ndata.Duration);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { Email: email },
            ndata,
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            return { error: "User not found" };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { error: error.message };
    }
}

export const verifyMobile = async (phoneNumber, email) => {
    try {
        await connectDB();
        console.log(`Updating mobile verification for email: ${email}`);
        
        // Make sure we create a fresh connection
        // mongoose.set('strictQuery', false);
        
        // Use findOneAndUpdate with proper options
        const updatedUser = await User.findOneAndUpdate(
            { Email: email },
            { $set: { mobileVerified: true } },
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            console.error(`User not found with email: ${email}`);
            return { error: "User not found" };
        }
        
        console.log("User after update:", updatedUser);
        return { success: true };
    } catch (error) {
        console.error('Error verifying mobile:', error);
        return { error: error.message };
    }
}