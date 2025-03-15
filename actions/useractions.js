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