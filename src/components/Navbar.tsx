"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User | undefined = session?.user as User;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-50 shadow-md p-4 md:p-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center text-2xl font-extrabold text-gray-800 transition-colors hover:text-purple-500"
        >
          <MessageCircle className="w-8 h-8 text-purple-500 mr-2" />
          Mystery Message
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-gray-600 hover:text-purple-500 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            Dashboard
          </Link>
          {/* <Link
            href="/about"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            Users
          </Link> */}
          <Link
            href="/select_user"
            className="text-gray-600 hover:text-purple-500 transition-colors duration-200"
          >
            Send Message
          </Link>

          {/* Session-based Actions */}
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 transition-transform transform hover:scale-105"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 transition-transform transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-50 to-gray-50 shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-end p-4 border-b border-purple-100">
          <button
            className="text-purple-600 hover:text-purple-800 focus:outline-none transition-colors duration-200"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <div className="flex flex-col items-start space-y-6 p-6">
          {/* <Link
            href="/"
            className="w-full text-lg text-gray-800 font-semibold hover:bg-purple-100 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-200"
            onClick={toggleSidebar}
          >
            Home
          </Link> */}
          <Link
            href="/dashboard"
            className="w-full text-lg text-gray-800 font-semibold hover:bg-purple-100 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-200"
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
          <Link
            href="/select_user"
            className="w-full text-lg text-gray-800 font-semibold hover:bg-purple-100 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-200"
            onClick={toggleSidebar}
          >
            Send Message
          </Link>

          {/* Session-based Actions */}
          {session ? (
            <div className="w-full flex flex-col items-start space-y-6 pt-4 border-t border-purple-100">
              <span className="text-gray-700 font-medium px-4">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                onClick={() => {
                  signOut();
                  toggleSidebar();
                }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-3 text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in" onClick={toggleSidebar} className="w-full">
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-3 text-lg font-semibold transition-transform transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;