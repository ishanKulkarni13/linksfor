import styles from "@/components/linksEditor/linksEditor.module.css";
import {backendBaseURL} from "@/constants/index"
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "@/components/linksEditor/link/link";
import { Toaster, toast } from "sonner";
import AddLinkButton from "./addLink/addLinkButton";
import AddHeaderButton from "./addHeader/addHeaderButton";
import TreePreview from "../treePreview/treePreview";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";
import { useDebounce } from "@/hooks/debounce";

export default function LinksEditor() {
  const treeUID = `1148359071`;
  const [areLinksFetched, setAreLinksFetched] = useState();
  const [links, setLinks] = useState([
    {
      title: "Loading",
      URL: "loading",
      UID: "1111111",
    },
    {
      title: "Loading",
      URL: "loading",
      UID: "2222222222",
    },
    {
      title: "Loading",
      URL: "loading",
      UID: "33333333",
    },
  ]);
  const [reorderedLinksUID, setReorderedLinksUID] = useState();
  const debouncelinksUIDOrder = useDebounce(reorderedLinksUID, 3000);

  const updateLinks = async () => {
    let { success, response, error } = await getAllLinks(treeUID);
    if (success) {
      setLinks(response.links);
      setAreLinksFetched(true)
    } else {
      if (error) {
        // if catched error in fetch
        toast.error("Error occured while fetching data");
        console.log("Error occured while fetching data", error);
      } else {
        //no error in fetch and success is false(from server)
        toast.error(`Link not added: ${response.message}`);
      }
    }
  };

  const getAllLinks = async (treeUID) => {
    try {
      let res = await fetch(
        `${backendBaseURL}/tree/adminAllTreeLinks/${treeUID}`,
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

  const deleteLink = async (linkUID) => {
    try {
      console.log("posing");
      let res = await fetch(
        `${backendBaseURL}/tree/edit/deleteLink/${treeUID}`,
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

      if (res.ok) {
        let responseData = await res.json();
        setLinks(responseData.links);
      } else {
        let responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("catched error", error);
    }
  };

  function handelLinksOrderChange(value) {
    setLinks(value);
    let GeneratedLinksUIDArray = value.map((link) => link.UID);
    console.log("created GeneratedLinksUIDArray:", GeneratedLinksUIDArray);
    setReorderedLinksUID(GeneratedLinksUIDArray)
  }

  async function sendLinksUIDToBackend(linksUIDArray) {
    toast.info(`sendLinksUIDToBackend function is running`);
    try {
      const res = await fetch(
        `${backendBaseURL}/tree/edit/editLinksOrder/${treeUID}`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            linksUIDArray,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      if (res.ok) {
        const responseData = await res.json();
      } else {
        const responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error updating links order:", error);
      toast.error("Error updating links order");
    }
  }

  useEffect(() => {
    updateLinks();
  }, []);

  useEffect(() => {
    if(areLinksFetched){
    sendLinksUIDToBackend(debouncelinksUIDOrder);
    }

  }, [debouncelinksUIDOrder]);

  return (
    <div className={styles.linksEditorContainer}>
      <div className={styles.addLinkAndHeaderContainer}>
        <AddLinkButton setLinks={setLinks} treeUID={treeUID} />
        {/* <AddLinkButton /> */}
        <AddHeaderButton />
      </div>

      <Reorder.Group
        values={links}
        onReorder={handelLinksOrderChange}
        layoutScroll
        className={styles.linksContainer}
      >
        {links.map((link, index) => (
          <Link key={link.UID} link={link} treeUID={treeUID} deleteLink={deleteLink} />
        ))}
      </Reorder.Group>
      <TreePreviewToggleButton />
      <Toaster position="bottom" expand={true} richColors />
    </div>
  );
}
