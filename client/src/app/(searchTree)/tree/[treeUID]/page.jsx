import Tree from '@/components/themes/theme';
import React from 'react'



const getTree = async (treeUID) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/search/tree/treeUID/${treeUID}`,
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
    if (res.ok) {
      let responseData = await res.json();
      let tree = responseData.tree;
      return { tree };
    } else {
      let responseData = await res.json();
      console.log("error occured", responseData);
      return { tree: null, success: false };
    }
  } catch (error) {
    console.log("error catched in getTreeByTreeUID", error.message);
    return { tree: null, success: false, error: true };
  }
};


export default async function  TreeUIDSearch({params}) {
  let { tree } = await getTree(params.treeUID);

  // cheak if the tree exist. if true, display tree
  if (tree) {
    return (
        <Tree tree={tree} />
    );
  }

  // if any erroe occured display error
  return <p>Error occured lol</p>;
}
