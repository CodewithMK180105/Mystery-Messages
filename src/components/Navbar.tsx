"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Added for logo icon

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User | undefined = session?.user as User;

  return (
    <nav className="bg-gray-50 shadow-md p-4 md:p-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center text-2xl font-extrabold text-gray-800 mb-4 md:mb-0 transition-colors hover:text-purple-500"
        >
          <MessageCircle className="w-8 h-8 text-purple-500 mr-2" />
          Mystery Message
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/send-message"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            Send Message
          </Link>

          {/* Session-based Actions */}
          {session ? (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <span className="text-gray-700 font-medium">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 transition-transform transform hover:scale-105"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 transition-transform transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;