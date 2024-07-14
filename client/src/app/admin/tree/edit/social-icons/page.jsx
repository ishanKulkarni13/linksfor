"use client";
import styles from "./style.module.css";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/debounce";
import { useLocalstorage } from "@/hooks/localStorage";
import { useRouter } from "next/navigation";
import { useTreeUID } from "@/hooks/treeUID";
import useHandelReselectTree from "@/hooks/handelReselectTree";
import TreePreviewToggleButton from "@/components/treePreview/treePreviewToggleButton/treePreviewToggleButton";
import AddButton from "./components/add/addButton";
import Social from "./components/social/social.jsx";

export default function SocialIconsEditor() {
  let treeUID = useTreeUID();
  const [areLinksFetched, setAreLinksFetched] = useState();
  const [socials, setSocials] = useState([]);
  const [reorderedLinksUID, setReorderedLinksUID] = useState();
  const debouncelinksUIDOrder = useDebounce(reorderedLinksUID, 3000);
  const { redirectToSelectTree } = useHandelReselectTree();

  const updateSocials = async () => {
    let { success, response, error, statusCode } = await getSocials(treeUID);
    if (success) {
      setSocials(response.socials);
      setAreLinksFetched(true);
    } else {
      if (error) {
        // if catched error in fetch
        setSocials([]);
        toast.error("Error occured while fetching data");
        console.log("Error occured while fetching data", error);
      } else {
        //no error in fetch and success is false(from server)
        setSocials([]);
        toast.error(`Link not added: ${response.message}`);
        console.log(`code in updateLinks`, statusCode);
        if (statusCode === 400 || statusCode === 401) {
          return redirectToSelectTree();
        }
      }
    }
  };

  const getSocials = async (treeUID) => {
    try {
      let res = await fetch(`/api/admin/tree/socials/${treeUID}`, {
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

  const deleteSocial = async (UID) => {
    toast.loading("deleting", {
      id: 'deleting'
    });
    try {
      let res = await fetch(`/api/admin/tree/edit/socials/delete`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          socialUID: UID,
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
        setSocials(responseData.socials);
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

  function handelOrderChange(value) {
    setSocials(value);
    let GeneratedLinksUIDArray = value.map((social) => social.UID);
    setReorderedLinksUID(GeneratedLinksUIDArray);
  }

  async function sendLinksUIDToBackend(socialsUIDArray) {
    toast.loading(`Sinking to DB...`, {
      id: 'sinking',
      position: "top-left",
    });
    try {
      const res = await fetch(`/api/admin/tree/edit/socials/order/${treeUID}`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          treeUID,
          socialsUIDArray,
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
      console.error("Error updating socials order:", error);
      toast.error("Error updating socials order",{
        id:  'sinking',
        duration: 3000
      });
    }
  }

  useEffect(() => {
    if (treeUID) {
      updateSocials();
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
                  setSocials={setSocials}
                  treeUID={treeUID}
                />
              </div>

              {!areLinksFetched && (
                <div className={styles.fetchingLinksContainer}>
                  <h1>Fetching Links</h1>
                </div>
              )}
              {socials.length == 0 && areLinksFetched ? (
                <div className={styles.noLinksContainer}>
                  <h1>
                    No Links <br></br> Click on Add links to add a Link
                  </h1>
                </div>
              ) : (
                <>
                  <Reorder.Group
                    values={socials}
                    onReorder={handelOrderChange}
                    layoutScroll
                    
                    className={styles.linksContainer}
                  >
                    {socials.map((social, index) => (
                      <Social
                        key={social.UID}
                        link={social}
                        treeUID={treeUID}
                        deleteSocial={deleteSocial}
                      />
                    ))}
                  </Reorder.Group>
                </>
              )}
            </div>

            
          </div>



          <TreePreviewToggleButton treeUID={treeUID} alwaysVisible />
        </>
      )}
    </>
  );
}
