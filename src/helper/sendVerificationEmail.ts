import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

// Emails are always async
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // For putting our email, our domain name should be verified
            to: email,
            subject: 'Mystery message | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: "Verification email sent successfully"};
    } catch (emailError) {
        console.error("Error in sending verification email ", emailError);
        return {success: false, message: "Failed to send the verification email"};
    }
}