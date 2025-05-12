import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";


export async function POST(request: Request){
    await dbConnect();

    try {
        const {username, email, password}= await request.json();

        const existingUserVerifiedByUsername= await UserModel.findOne({
            username,
            isVerified: true
        })                  // This will return the user which is verified

        if(existingUserVerifiedByUsername) {  // if that username exists return false message
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, {status: 400});
        }

        const existingUserByEmail= await UserModel.findOne({email});

        const verifyCode= Math.floor(100000+ Math.random()*900000).toString();

        if(existingUserByEmail){

            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                },{status: 400})
            } else{
                const hashedPassword= await bcrypt.hash(password, 10);
                existingUserByEmail.password=hashedPassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+ 3600000);
                await existingUserByEmail.save();
            }
        } else{
            // The user has come first time
            const hashedPassword=await bcrypt.hash(password, 10); // 10 is the number of rounds
            const expiryDate=new Date(); // due to new keyword the Date is passed in the form of an object
            expiryDate.setHours(expiryDate.getHours()+1); // and an object is just the memory reference point, hence can be modified even const is used to define 

            const newUser=new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save();
        }

        const emailResponse=await sendVerificationEmail(
            {
                email,
                username,
                otp: verifyCode
            }
        )

        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, {status: 201});
        }

        return Response.json({
            success: true,
            message: "User registered successfully, Please verify your email"
        }, {status: 201});

    } catch (error) {
        console.error("Error registering User ", error);
        return Response.json(
            {
                success: false,
                message: "Error registering User"
            },
            {
                status: 500
            }
        )
    }
}



// Feature	      |  Date.now()	           | new Date()
// Return Type	  |  number (timestamp)	   | Date object
// Usability	  |  Good for calculations | Good for date formatting & manipulation
// Example Output |	 1711563456789	       | Fri Mar 27 2025 14:30:56 GMT+0000
