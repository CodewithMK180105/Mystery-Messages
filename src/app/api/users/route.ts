import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async () => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUserUsername = session.user.username;

    const users = await UserModel.find({
      isAcceptingMessage: true,
      username: { $ne: currentUserUsername }, // Exclude current user
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};
