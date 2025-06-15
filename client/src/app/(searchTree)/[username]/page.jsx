import Tree from "@/components/themes/tree";
import { Tree as TreeModel } from "@/lib/DB/models/tree";
import { connectToDB } from "@/lib/DB/connectDB";
import { User } from "@/lib/DB/models/user";

const getTree = async (username) => {
  try {
    await connectToDB();

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    }).select("verified trees _id");

    // const user = await User.findOne({username}).select("verified trees _id");

    if (!user) {
      return { error: "User not found" };
    }
    const tree = await TreeModel.findById(user.trees.profileDefaultTree); //change
    if (!tree) {
      return { error: "Tree not found" };
    }
    // Check if the tree visibility is public
    if (tree.treeVisibility !== "public") {
      return {
        error: `The tree is not public, it's locked with ${tree.treeVisibility}`,
      };
    }
    // Prepare the response tree
    let responseTree = {
      verified: user.verified,
      UID: tree.UID,
      treeName: tree.treeName,
      treeVisibility: tree.treeVisibility,
      treePicture: tree.treePicture,
      treeBio: tree.treeBio,
      treeContent: {
        links: tree.treeContent.links.map((link) => {
          const { linkLockConfig, ...rest } = link;
          return rest._doc;
        }),
        socials: tree.treeContent.socials,
      },
      theme: tree.theme,
    };

    if (tree.theme.selectedTheme.themeID == 0) {
      responseTree.theme.customThemeConfig = undefined;
    }

    // Send the response

    return { tree: responseTree };
  } catch (error) {
    console.log(error);
    return {
      error:
        "Some Unknown error occured , contact the support for assistance. Error_Code: getTree-username-catch ",
    };
  }
};

export default async function page({ params }) {
  let { tree, error } = await getTree(params.username);

  // cheak if the tree exist. if true, display tree
  if (tree) {
    return <Tree tree={tree} />;
  }

  // if any erroe occured display error
  return <p>Error occured : {error}</p>;
}
