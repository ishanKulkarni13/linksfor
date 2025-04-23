// import { Tree } from "@/lib/DB/models/tree";

// export const GET = async (req, {params})=>{
//     const { treeUID } = params;
//     let treeshareableLink;
//     try {
//         await connectToDB()
//         // const ownerUID = 
//         // let tree = await Tree.findOne({ UID: treeUID, owner: user._id });
//         let tree = await Tree.findOne({ UID: treeUID }).select("owner");
//         console.log(tree);
//         if (!tree) { return NextResponse.json({ success: false, message: 'Invalid treeUID'}, {status: 401})};

//         if (tree.owner.equals(userID)) {
//             return NextResponse.json({ success: true, links: tree.treeContent.links })
//         } else {
//             return NextResponse.json({ success: false, message: "Unautherised access to edit tree"}, {status: 401})
//         }

//     } catch (error) {
//         console.log(error);
//         throw new Error(error.message)
//     }
// }