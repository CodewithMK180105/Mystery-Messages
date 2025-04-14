import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";

export const GET = async () => {
  try {
    await dbConnect();

    const users = await UserModel.find({isAcceptingMessage: true}); // You can select specific fields too
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};
