import { connectDB } from "@/app/database/connectDB"
import { NextRequest, NextResponse } from "next/server"
import sendMail from "@/app/lib/sendMail";
import {Data} from "@/app/database/schema";
export const POST = async (req: NextRequest) => {
    try {
        const { field, email } = await req.json();
        // console.log(email);
        // console.log(field);
        await connectDB();
        const data = await Data.create({ fields: field, email })
        // console.log(data);
        const { _id } = data;
        await sendMail(email, _id)
        return NextResponse.json('sucess')
    } catch (error) {
        // console.log(error);
        return NextResponse.json('error occoured')
    }

}