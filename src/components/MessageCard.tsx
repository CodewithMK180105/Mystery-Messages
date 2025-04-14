import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/user.models";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
      // console.log(response);
      toast({
        title: "Message deleted",
        description: response.data.message,
      });
      onMessageDelete(message._id);
    } catch (error) {
      
      toast({
        title: "Error",
        description: "Failed to delete the message",
        variant: "destructive",
      });
    }
  };

  // Format timestamp
  const rawTimestamp = message.createdAt;
  const date = new Date(rawTimestamp);  // Convert the ISO string to Date object

  const formattedDate = !isNaN(date.getTime()) // Ensure the date is valid
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";

  const formattedTime = !isNaN(date.getTime()) // Ensure the time is valid
    ? date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Invalid Time";

  return (
    <Card className="relative shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{message.content}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Sent on {formattedDate} at {formattedTime}
        </CardDescription>

        <div className="absolute top-4 right-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. Are you sure you want to delete this message?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      {/* You can keep this if you plan to show more content in the future */}
      <CardContent>
        {/* Additional metadata or UI can go here */}
      </CardContent>

      {/* Footer */}
      <CardFooter className="text-xs text-muted-foreground">
        {/* No message ID displayed here */}
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
