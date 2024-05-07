import styles from "@/components/linksEditor/linksEditor.module.css";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "@/components/linksEditor/link/link";
import { Toaster, toast } from "sonner";
import AddLinkButton from "./addLink/addLinkButton";
import AddHeaderButton from "./addHeader/addHeaderButton";
import TreePreview from "../treePreview/treePreview";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";

export default function LinksEditor() {
  const treeUID = `8809746353`;
  const [links, setLinks] = useState([
    {
      title: "Loading",
      URL: "loading",
      UID: "111111",
    },
  ]);

  const getAllLinks = async (treeUID) => {
    try {
      let res = await fetch(
        `http://localhost:4000/tree/adminAllTreeLinks/${treeUID}`,
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
        return { success: true, error: false, response: responseData };
      } else {
        let responseData = await res.json();
        return { success: false, error: false, response: responseData };
      }
    } catch (error) {
      return { success: false, error: true, response: error };
    }
  };

  const updateLinks = async () => {
    let { success, response, error } = await getAllLinks(treeUID);
    if (success) {
      setLinks(response.links);
    } else {
      if (error) {
        // if catched error in fetch
        toast.error("Error occured while fetching data")
        console.log("Error occured while fetching data", error);
      } else {
        //no error in fetch and success is false(from server)
        toast.error(`Link not added: ${response.message}`);
      }
    }
  };

  const deleteLink = async (linkUID) => {
    const treeUID = `8809746353`;
    try {
      console.log("posing");
      let res = await fetch(
        `http://localhost:4000/tree/edit/deleteLink/ggggggggggggg`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            linkUID,
            treeUID,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      console.log("posted");
      console.log(res);

      if (res.ok) {
        toast("res.ok is true");
        console.log("converting res-json to js");
        let responseData = await res.json();
        console.log("coverted res-json to js");
        // return { success: true, error: false, response: responseData };
        setLinks(responseData.links);
      } else {
        console.log("res.ok is false");
        console.log("converting res-json to js");
        let responseData = await res.json();
        console.log("coverted res-json to js");
        // return { success: false, error: false, response: responseData };
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
      console.log("catched error", error);
      // return { success: false, error: true, response: error };
      toast.error("Some Error Occured");
    }
  };

  useEffect(() => {
    updateLinks();
  }, []);

  return (
    <div className={styles.linksEditorContainer}>
      <div className={styles.addLinkAndHeaderContainer}>
        <AddLinkButton setLinks={setLinks} />
        {/* <AddLinkButton /> */}
        <AddHeaderButton />
      </div>

      <Reorder.Group
        values={links}
        onReorder={setLinks}
        layoutScroll
        className={styles.linksContainer}
      >
        {links.map((link, index) => (
          <Link key={link.UID} link={link} deleteLink={deleteLink} />
        ))}
      </Reorder.Group>
      <TreePreviewToggleButton />
      <Toaster position="bottom" expand={false} richColors />
    </div>
  );
}
