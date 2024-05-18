import Tree from "@/components/themes/tree";
import {backendBaseURL} from "@/constants/index"
const getTreeByUsername = async (username) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/search/tree/username/${username}`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          Accept: "applications/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    console.log(res);
    if (res.ok) {
      let responseData = await res.json();
      let tree = responseData.tree;
      return { tree };
    } else {
      let responseData = await res.json();
      console.log("error occured in getTreeByUsername", responseData);
      return { tree: null, success: false };
    }
  } catch (error) {
    console.log("error catched in getTreeByUsername", error.message);
    return { tree: null, success: false, error: true };
  }
};

export default async function page({ params }) {
  let { tree } = await getTreeByUsername(params.username);

  // cheak if the tree exist. if true, display tree
  if (tree) {
    return (
        <Tree tree={tree} />
    );
  }

  // if any erroe occured display error
  return <p>Error occured</p>;
}
