"use client";
import styles from "@/components/linksEditor/linksEditor.module.css";
import { backendBaseURL } from "@/constants/index";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "@/components/linksEditor/link/link";
import { toast } from "sonner";
import AddButton from "./addLink/addLinkButton";
import TreePreview from "../treePreview/treePreview";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";
import { useDebounce } from "@/hooks/debounce";
import { useLocalstorage } from "@/hooks/localStorage";
import { useRouter } from "next/navigation";
import { useTreeUID } from "@/hooks/treeUID";
import useHandelReselectTree from "@/hooks/handelReselectTree";

export default function LinksEditor() {
  let treeUID = useTreeUID();
  const [areLinksFetched, setAreLinksFetched] = useState();
  const [links, setLinks] = useState([]);
  const [reorderedLinksUID, setReorderedLinksUID] = useState();
  const debouncelinksUIDOrder = useDebounce(reorderedLinksUID, 3000);
  const { redirectToSelectTree } = useHandelReselectTree();

  const updateLinks = async () => {
    let { success, response, error, statusCode } = await getAllLinks(treeUID);
    if (success) {
      console.log("success on updateLinks", response);
      setLinks(response.links);
      setAreLinksFetched(true);
    } else {
      if (error) {
        // if catched error in fetch
        setLinks([]);
        toast.error("Error occured while fetching data");
        console.log("Error occured while fetching data", error);
      } else {
        //no error in fetch and success is false(from server)
        setLinks([]);
        toast.error(`Link not added: ${response.message}`);
        console.log(`code in updateLinks`, statusCode);
        if (statusCode === 400 || statusCode === 401) {
          return redirectToSelectTree();
        }
      }
    }
  };

  const getAllLinks = async (treeUID) => {
    try {
      let res = await fetch(`/api/tree/adminAllTreeLinks/${treeUID}`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          Accept: "applications/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (res.ok) {
        let responseData = await res.json();
        return { success: true, error: false, response: responseData };
      } else {
        let responseData = await res.json();
        return {
          success: false,
          error: false,
          response: responseData,
          statusCode: res.status,
        };
      }
    } catch (error) {
      return { success: false, error: error, response: error };
    }
  };

  const deleteLink = async (UID) => {
    toast.loading("deleting", {
      id: 'deleting'
    });
    try {
      let res = await fetch(`/api/tree/edit/delete/link/${UID}`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          linkUID: UID,
          treeUID,
        }),
        credentials: "include",
        headers: {
          Accept: "applications/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      if (res.ok) {
        toast.success("Deleted", {
          id: 'deleting',
          duration: 1000,
        });
        let responseData = await res.json();
        setLinks(responseData.links);
      } else {
        let responseData = await res.json();
        toast.error(responseData.message, {
          id: 'deleting',
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        id: 'deleting',
        duration: 3000,
      });
      console.log("catched error", error);
    }
  };

  function handelLinksOrderChange(value) {
    setLinks(value);
    let GeneratedLinksUIDArray = value.map((link) => link.UID);
    setReorderedLinksUID(GeneratedLinksUIDArray);
  }

  async function sendLinksUIDToBackend(linksUIDArray) {
    toast.loading(`Sinking links...`, {
      id: 'sinking',
      position: "top-left",
    });
    try {
      const res = await fetch(`/api/tree/edit/links-order/${treeUID}`, {
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
      });

      if (res.ok) {
        const responseData = await res.json();
        toast.success("Sinked", {
          id:  'sinking',
          position: "top-left",
        });
      } else {
        const responseData = await res.json();
        toast.error(responseData.message,{
          id:  'sinking',
          duration: 3000
        });
      }
    } catch (error) {
      console.error("Error updating links order:", error);
      toast.error("Error updating links order",{
        id:  'sinking',
        duration: 3000
      });
    }
  }

  useEffect(() => {
    toast.dismiss('selectTree');
    if (treeUID) {
      updateLinks();
    }
  }, [treeUID]);

  useEffect(() => {
    if (areLinksFetched) {
      sendLinksUIDToBackend(debouncelinksUIDOrder);
    }
  }, [debouncelinksUIDOrder]);

  return (
    <>
      {!treeUID ? (
        <div className={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.linksEditorContainer}>
              <div className={styles.addLinkAndHeaderContainer}>
                <AddButton
                  disabled={!areLinksFetched}
                  type="link"
                  setLinks={setLinks}
                  treeUID={treeUID}
                />
                <AddButton
                  disabled={!areLinksFetched}
                  type="header"
                  setLinks={setLinks}
                  treeUID={treeUID}
                />
              </div>

              {!areLinksFetched && (
                <div className={styles.fetchingLinksContainer}>
                  <h1>Fetching Links</h1>
                </div>
              )}
              {links.length == 0 && areLinksFetched ? (
                <div className={styles.noLinksContainer}>
                  <h1>
                    No Links <br></br> Click on Add links to add a Link
                  </h1>
                </div>
              ) : (
                <>
                  <Reorder.Group
                    values={links}
                    onReorder={handelLinksOrderChange}
                    layoutScroll
                    className={styles.linksContainer}
                  >
                    {links.map((link, index) => (
                      <Link
                        key={link.UID}
                        link={link}
                        treeUID={treeUID}
                        deleteLink={deleteLink}
                      />
                    ))}
                  </Reorder.Group>
                </>
              )}
            </div>

            <div className={styles.treePreviewContainer}>
              <div className={styles.treePreview}>
                {" "}
                <TreePreview showBorder={true} treeUID={treeUID} />
              </div>
            </div>
          </div>
          <TreePreviewToggleButton treeUID={treeUID} alwaysVisible />
        </>
      )}
    </>
  );
}
