"use client";
import styles from "@/components/linksEditor/linksEditor.module.css";
import { backendBaseURL } from "@/constants/index";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "@/components/linksEditor/link/link";
import { Toaster, toast } from "sonner";
import AddButton from "./addLink/addLinkButton";
import TreePreview from "../treePreview/treePreview";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";
import { useDebounce } from "@/hooks/debounce";
import { useLocalstorage } from "@/hooks/localStorage";
import { useRouter } from "next/navigation";
import { useTreeUID } from "@/hooks/treeUID";

export default function LinksEditor() {
  const { push } = useRouter();
  const { setItem, getItem, removeItem } = useLocalstorage(`selectedTree`);
  let treeUID = useTreeUID();
  const [areLinksFetched, setAreLinksFetched] = useState();
  const [links, setLinks] = useState([]);
  const [reorderedLinksUID, setReorderedLinksUID] = useState();
  const debouncelinksUIDOrder = useDebounce(reorderedLinksUID, 3000);

  // const getDefaultTreeUID = async ()=>{
  //   try {
  //     let res = await fetch(
  //       `${backendBaseURL}/tree/user-default-treeUID`,
  //       {
  //         method: "GET",
  //         cache: "no-store",
  //         credentials: "include",
  //         headers: {
  //           Accept: "applications/json",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Credentials": true,
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //       let responseData = await res.json();
  //       return { success: true, error: false, response: responseData, statusCode: res.status };
  //     } else {
  //       let responseData = await res.json();
  //       return { success: false, error: false, response: responseData, statusCode: res.status };
  //     }
  //   } catch (error) {
  //     return { success: false, error: error, response: error};
  //   }
  // }

  // const updateTreeUID = async () => {
  //   let UID = getItem();

  //   if (!UID) {
  //     let { success, response, error, statusCode } = await getDefaultTreeUID();
  //     if (success) {
  //       console.log('got treeUID', response.treeUID);
  //       UID = response.treeUID;
  //     } else{
  //       if (error) {
  //         // if catched error in fetch
  //         console.log("Some error occured", error);
  //         toast.error(`Some error occured: ${error.message}`)
  //       } else{
  //         //no error in fetch and success is false(from server)
  //         toast.error(`${response.message}`)
  //         if(statusCode === 404){
  //           removeItem()
  //          return  push("/admin/selectTree?removeSelectedTree")
  //         }
  //         console.log("cant get treEUID", response.message );

  //       }
  //     }
  //     console.log("setting selected tree cookie as no tree was selected");
  //     setItem(UID);
  //   }

  //   setTreeUID(UID)
  // };

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
          removeItem();
          push("/admin/selectTree?removeSelectedTree");
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
    try {
      console.log("posing");
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
    setReorderedLinksUID(GeneratedLinksUIDArray);
  }

  async function sendLinksUIDToBackend(linksUIDArray) {
    toast.info(`sendLinksUIDToBackend function is running`);
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
                <AddButton type="link" setLinks={setLinks} treeUID={treeUID} />
                <AddButton
                  type="header"
                  setLinks={setLinks}
                  treeUID={treeUID}
                />
              </div>

              {!areLinksFetched && <div className={styles.fetchingLinksContainer} >
                  <h1>
                 Fetching Links
                  </h1>
                </div>}
              {(links.length == 0 && areLinksFetched) ? (
                <div className={styles.noLinksContainer} >
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
          <Toaster position="bottom" expand={true} richColors />
        </>
      )}
    </>
  );
}
