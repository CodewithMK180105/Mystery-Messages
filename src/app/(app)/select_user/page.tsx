"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { LucideMessageSquareText } from "lucide-react";


// Define User interface
interface User {
  id: string;
  username: string;
  avatar?: string;
}

// Mock user data
const mockUsers: User[] = [
  { id: "1", username: "AliceSmith", avatar: "https://res.cloudinary.com/dffoynel3/image/upload/v1740050201/aulit5kiqo6mxh041bjf.png" },
  { id: "2", username: "BobJohnson", avatar: "https://res.cloudinary.com/dffoynel3/image/upload/v1740050201/aulit5kiqo6mxh041bjf.png" },
  { id: "3", username: "CharlieBrown", avatar: "https://res.cloudinary.com/dffoynel3/image/upload/v1740050201/aulit5kiqo6mxh041bjf.png" },
  { id: "4", username: "DianaPrince", avatar: "https://res.cloudinary.com/dffoynel3/image/upload/v1740050201/aulit5kiqo6mxh041bjf.png" },
  { id: "5", username: "EthanHunt", avatar: "https://res.cloudinary.com/dffoynel3/image/upload/v1740050201/aulit5kiqo6mxh041bjf.png" },
];

// UserCard component
const UserCard: React.FC<{
  user: User;
  view: "grid" | "list";
  onSelect: (user: User) => void;
}> = ({ user, view, onSelect }) => {
  return (
    <div
      className={`flex ${
        view === "grid"
          ? "flex-col items-center py-2 px-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mx-auto w-full"
          : "flex-row items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg w-full transition-all duration-300"
      } border border-purple-200`}
      onClick={() => onSelect(user)}
    >
      {/* {user.avatar && ( */}
        <div className="relative">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            alt={user.username}
            width={view === "grid" ? 120 : 60}
            height={view === "grid" ? 120 : 60}
            className="rounded-full object-cover border-4 border-purple-100"
          />
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
        </div>
      {/* )} */}
      <div
        className={`${
          view === "grid" ? "mt-4 text-center" : "ml-4 flex-1"
        }`}
      >
        <h3 className="text-md md:text-xl font-semibold text-purple-900">{user.username.length>10? `${user.username.slice(0,8)}...` :user.username}</h3>
        {view === "list" && (
          <p className="text-sm text-purple-600 mt-1">
            Send an anonymous message
          </p>
        )}
      </div>
      <Link href={`/u/${user.username}`}>
        <button
          className="hidden md:block mt-4 bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 font-medium"
        >
          Message
        </button>
        <button
          className="md:hidden mt-4 bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 font-medium"
        >
          <LucideMessageSquareText />
        </button>
      </Link>
    </div>
  );
};

// Main page component
const SelectUserPage: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);


  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    // Extend with routing or modal for message sending
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-purple-900">
            Choose a Recipient
          </h1>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setView("grid")}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
                view === "grid"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200 text-purple-800 hover:bg-purple-300"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
                view === "list"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-200 text-purple-800 hover:bg-purple-300"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {mockUsers.length === 0 ? (
          <p className="text-center text-purple-700 text-lg">
            No users found to message.
          </p>
        ) : (
          <div
            className={`${
              view === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6 px-auto"
                : "flex flex-col space-y-2"
            }`}
          >
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                view={view}
                onSelect={handleSelectUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectUserPage;