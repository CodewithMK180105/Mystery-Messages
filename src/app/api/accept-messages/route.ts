import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/user.models";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";



export async function POST(request: Request){
    await dbConnect();

    const session=await getServerSession(authOptions);
    const user: User= session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Error verifying User"
        }, {status: 401});
    }

    const userId= user?._id;

    try {
        const body= await request.json();
        const result=AcceptMessageSchema.safeParse(body);

        if(!result.success){
            return Response.json(
                { success: false, message: "Invalid request data", 
                    errors: result.error.format() 
                },
                { status: 400 }
            );
        }

        const { acceptMessages } = result.data;

        const updatedUser=await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new: true}  // due to this, the returned value is the updated value
        );

        if(!updatedUser){
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages"
            }, {status: 400});
        }

        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            updatedUser
        }, {status: 200});

    } catch (error) {
        console.log("Failed to update user status to accept messages");
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, {status: 500});
    }
}

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

    const userId= user?._id;
    try {
        const foundUser=await UserModel.findById(userId);
    
        if(!foundUser){
            return Response.json({
                success: false,
                message: "User not Found",
    
            }, {status: 404});
        }
    
        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
    
        }, {status: 200});
    } catch (error) {
        console.log("Error in getting the message acceptance status");
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, {status: 500});
    }
}