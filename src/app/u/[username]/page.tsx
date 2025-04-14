"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SendMessagePage() {
  const { username } = useParams(); // Extract username from URL
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!message.trim()) {
      setFeedback({ type: "error", text: "Message cannot be empty." });
      return;
    }

    if (message.length > 300) {
      setFeedback({ type: "error", text: "Message cannot exceed 300 characters." });
      return;
    }

    setIsSubmitting(true);

    try {
      // Placeholder API call (replace with your backend)
      const response =await axios.post("/api/send-message", {
        username,
        content: message.trim(),
      });
      // console.log(response);
      if (!response.data.success) throw new Error("Failed to send message");

      setMessage("");
      setFeedback({ type: "success", text: "Message sent successfully!" });
    } catch (error) {
      setFeedback({ type: "error", text: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-sm p-8">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Anonymous Message to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-700">@{username}</span>
        </h1>

        {/* Subheading */}
        <h2 className="text-lg font-medium text-gray-600 text-center mb-4">
          Share Your Thoughts
        </h2>

        {/* Text Content */}
        <p className="text-gray-600 text-center mb-6">
          Send {username} a private, anonymous message. Keep it short and respectful (max 300 characters).
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
              rows={4}
              disabled={isSubmitting}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {message.length}/300
            </div>
          </div>

          {feedback && (
            <p
              className={`text-sm text-center ${
                feedback.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback.text}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting}
            className={`w-full py-2.5 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {
              isSubmitting? 
                (<>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
                </>) : "SignUp"
            }
          </Button>
        </form>
      </div>
    </div>
  );
}

