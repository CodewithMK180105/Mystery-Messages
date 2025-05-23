import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/user.models";



export async function GET(request: Request){
    await dbConnect();

    const session=await getServerSession(authOptions);
    const user: User= session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Error verifying User"
        }, {status: 401});
    }

    const userId= new mongoose.Types.ObjectId(user?._id);
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        // console.log(user);

        if(!user || user.length===0){
            return Response.json({
                success: false,
                message: "User Not Found"
            }, {status: 401});
        }

        return Response.json({
            success: true,
            messages: user[0].messages
        }, {status: 200});

    } catch (error) {
        console.log("An unexpected error occured ", error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, {status: 500});
    }

}