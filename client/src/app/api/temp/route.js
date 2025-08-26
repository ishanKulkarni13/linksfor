
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    return NextResponse.json({ success: false, message: "noooo" }, { status: 500 });
    // try {
    //     let tree = await Tree.findOne({ UID: "3226651219" });
    //     if (!tree) {
    //         return NextResponse.json({ success: false, message: 'Tree not found' }, { status: 404 })
    //     };
    //     tree.isVerified = true;

    //     await tree.save();
    //     return NextResponse.json({ success: true })
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    // }
}