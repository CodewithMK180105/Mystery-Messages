import { Message } from "@/models/user.models";

export interface ApiResponse{
    success: boolean,
    message: string,
    isAcceptingMessages?: boolean, // because we don't need to send it during the sign up
    messages?: Array<Message>
}