'use server'

import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
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

        if (!(tree.owner.equals(userID))) {
            return { success: false, message: "Unautherised access to delete tree" }
        } else {
            let user = await User.findById(userID);
            if ((user.trees.profileDefaultTree.equals(tree._id))) {
                return { success: false, message: 'The following tree is your default tree, \n please select any other tree as your default tree to delete this tree' };
            } else {
                await Tree.findByIdAndDelete(tree._id);
                revalidatePath('/admin/trees')
                return { success: true };
            }
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: error.message }
    }
}
