import { connectDB } from "@/app/database/connectDB"
import { NextRequest, NextResponse } from "next/server"
import {Data} from "@/app/database/schema"
type ParamType = {
    params: {
        id: string
    }
}
export const GET = async (req: NextRequest, param: ParamType) => {
    try {
        const { id } = param.params;
        await connectDB();
        const data = await Data.findById({ _id: id });
        return NextResponse.json({
            status: 'success',
            message: 'Form found',
            data
        })
    } catch (error) {
        return NextResponse.json({
            status: 'fail',
            message: 'Form not found'
        })
    }

} 





// import { connectDB } from "@/app/database/connectDB"
// import { NextRequest, NextResponse } from "next/server"
// import data from "@/app/database/schema"
// export const GET = async (req,param) => {
//     try {
//         const { id } = param.params;
//         await connectDB();
//         const d = await data.find();
//         console.log(d);
//         console.log(id);
//         return NextResponse.json({
//             status: 'success',
//             message: 'Form found',
//             data:d
//         })
//     } catch (error) {
//         return NextResponse.json({
//             status: 'fail',
//             message: 'Form not found'
//         })
//     }
// } 