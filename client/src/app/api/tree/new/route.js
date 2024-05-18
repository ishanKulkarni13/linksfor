import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  // let user = req.user        xxxxxxxxxxx
  try {
    await connectToDB();
    const session = await auth();
    const userID = session.user.id;
    let { treeName, treeBio, treeTheme } = await req.json();
    if (!treeName) {
      return NextResponse.json({ success: false, message: "treeName is a mandatory field which is not provided" }, { status: 500 })
      
    }
    
    // Uploading the provided treePicture to cloudnary (if not provided or if some error occurs, treePicture wont be sent to the DB)
    let treePicture = false // tempeee;
    // let path =
    //   "http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png";
    // if (req.file) {
    //   path = req.file.path;
    //   const uploadToCloudinaryResult = await uploadToCloudinary(path);
    //   if (
      //     uploadToCloudinaryResult &&
    //     uploadToCloudinaryResult.public_id &&
    //     uploadToCloudinaryResult.url
    //   ) {
    //     treePicture = {
    //       public_id: uploadToCloudinaryResult.public_id,
    //       url: uploadToCloudinaryResult.url,
    //     };
    //   } else {
    //     treePicture = false;
    //   }
    // } else {
    //   treePicture = false;
    // }

    // Construct the tree object with only provided fields
    let treeData = {
      owner: userID,
      treeName,
    };
    
    // Add optional fields if provided
    if (treePicture) treeData.treePicture = treePicture;
    if (treeBio) treeData.treeBio = treeBio;
    // if (treeContent) treeData.treeContent = treeContent;
    if (treeTheme) treeData.theme = theme;
    // Finally Creating Tree
    let tree = await Tree.create(treeData);
    
    
    // Adding tree to the User if he doesent have one.
    let user = await User.findById(userID)
    if (!user.trees.profileDefaultTree) {
      //  user = await User.findByIdAndUpdate(
        //   userID,
        //   { $set: { "trees.profileDefaultTree": tree._id } },
        //   { new: true }
        // );
        user.trees.profileDefaultTree = tree._id;
        user.save();
      }
      return NextResponse.json({
        sucess: true,
        message: "Tree created sucessfully",
        tree,
      });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
  };
  