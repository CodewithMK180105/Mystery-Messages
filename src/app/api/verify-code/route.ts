import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request: Request){
    // TODO: ZOD

    await dbConnect();

    try {
        const {username, code}=await request.json();

        const result=verifySchema.safeParse({code});
        if(!result.success){
            return Response.json({
                success: false,
                message: "Hii"
            }, {status: 400});
        }

        const decodedUsername= decodeURIComponent(username);
        console.log(decodedUsername);
        console.log(username);
        const user=await UserModel.findOne({username: decodedUsername});

        if(!user){
            return Response.json({
                success: false,
                message: "User Not Found"
            }, {status: 404});
        }

        const isCodeValid= user.verifyCode===code;

        const isCodeNotExpired= new Date(user.verifyCodeExpiry)>new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            await user.save();

            return Response.json({
                success: true,
                message: "Account Verified Successfully"
            }, {status: 200});
        } else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verification code has been expired, please sign-up again to get a new code"
            }, {status: 400});
        } else{
            return Response.json({
                success: false,
                message: "Invalid Verification Code"
            }, {status: 400});
        }


    } catch (error) {
        console.error("Error in Verifying code ", error);
        return Response.json({
            success: false,
            message: "Error Verifying code"
        }, {status: 500});
    }
}