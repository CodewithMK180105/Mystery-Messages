import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema= z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    await dbConnect();

    try {
        // localhost:3000/api/check-username-unique?username=CodewithMK180105?phone=android
        const {searchParams}=new URL(request.url);
        const queryParam={
            username: searchParams.get('username')
        };

        // validate with zod
        const result=UsernameQuerySchema.safeParse(queryParam);
        // console.log(result);
        // console.log(result.error);

        if(!result.success){
            const usernameErrors= result.error.format().username?._errors || [];

            return Response.json({
                success: false,
                message: usernameErrors?.length > 0? usernameErrors.join(', '): "Invalid query Parameters"
            }, {status: 400});
        }

        const {username}= result.data;
        
        const existingVerifiedUser= await UserModel.findOne({username, isVerified: true});

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "username already exists"
            }, {status: 400});
        }

        return Response.json({
            success: true,
            message: "username is available"
        }, {status: 400});

    } catch (error) {
        // console.error("Error checking Username ", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        }, {status: 500});
    }
}