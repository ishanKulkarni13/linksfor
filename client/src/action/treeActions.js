'use server'

import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { revalidatePath } from "next/cache";

export const deleteTree = async (reqData) => {

    const { treeUID } = reqData;
    if (!treeUID) {
        return { success: false, message: "treeUID not provided" }
    }


    try {
        const session = await auth()

        if (!session?.user) { return { success: false, message: "Auth error" } }

        const userID = session.user.id

        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) {
            return { success: false, message: 'Tree not found' }
        };

        if (tree.owner.equals(userID)) {

            tree.treeName = '100% deleted tree';
            tree.save();
            console.log('i will delete it afterwards, Trust me bro :)');

            revalidatePath('/admin/trees')
            return { success: true };
        } else {
            return { success: false, message: "Unautherised access to delete tree" }
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: error.message }
    }
}
