import axios from "axios";
import LayoutPopup from "./layout/layout";
import ThumbnailUpdationContent from "./thumbnail/thumbnail";
import { toast } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LinkEditPopups({openPopup, closePopup, setLinkData, linkData, treeUID}) {

  // const update = async (data) => {
  //   // data.thumbnailURL && setLinkData({...linkData, thumbnail:{URL:data.thumbnailURL}})

  //    setLinkData(prev => ({
  //   ...prev,
  //   thumbnail: { URL: data.thumbnailURL }
  // }));

  
  //     console.log("thumbnailURL water = " + linkData.thumbnail?.URL);

  //   try {
  //     const res = await axios.post(
  //       `/api/tree/edit/link/${linkData.UID}`,
  //       { ...data,  treeUID, linkUID:linkData.UID },
  //       { withCredentials: true }
  //     );
  //     // console.log(res)
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       // if server responded
  //       toast.error(error.response.data.message,{
  //         id:"linkUpdate"
  //       });
  //       if (error.response.status === 404 || error.response.status === 400) {
  //         console.log(error.response);
  //         //   removeItem();
  //         //   return push("/admin/selectTree?removeSelectedTree");
  //       }
  //     } else if (error.request) {
  //       //req was made but go no response
  //       toast.error(`error occured while updating link`,{
  //         id:"linkUpdate"
  //       });
  //     } else {
  //       toast.error(`some error occured while updating link`,{
  //         description: error.message,
  //         id:"linkUpdate"
  //       });
  //     }
  //   }
  // };
     
  // return (
  //   <>
  //  {openPopup == `thumbnail` && <ThumbnailUpdationContent isOpen={openPopup == `thumbnail`? true:false} onOpenChange={null} update={update} linkData={linkData} close={closePopup} /> }
  //  {openPopup == `layout` && <LayoutPopup update={update} linkData={linkData} close={closePopup} /> }
  //   </>
  // )

  const update = async (data) => {
  try {
    // Send update to backend and get the updated link object
    const res = await axios.post(
      `/api/tree/edit/link/${linkData.UID}`,
      { ...data, treeUID, linkUID: linkData.UID },
      { withCredentials: true }
    );
    if (res.data && res.data.success && res.data.link) {
      // Use the updated link object from backend
      setLinkData(res.data.link);
      toast.success("Thumbnail updated!");
    } else {
      toast.error(res.data?.message || "Failed to update link", { id: "linkUpdate" });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      toast.error(error.response.data.message, { id: "linkUpdate" });
      if (error.response.status === 404 || error.response.status === 400) {
        console.log(error.response);
      }
    } else if (error.request) {
      toast.error(`error occured while updating link`, { id: "linkUpdate" });
    } else {
      toast.error(`some error occured while updating link`, {
        description: error.message,
        id: "linkUpdate"
      });
    }
  }
};

  return(
    <>
      {/* Thumbnail */}
      <Dialog open={openPopup == `thumbnail`? true:false} onOpenChange={(open)=> open? openPopup('thumbnail') : closePopup()}>
        
         <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit {openPopup}</DialogTitle>
                  <DialogDescription>Update thumbnail for {linkData.title}</DialogDescription>
                </DialogHeader>
                <ThumbnailUpdationContent update={update} linkData={linkData} close={closePopup} />
              </DialogContent>
      </Dialog>

      {/* // layout
      <Dialog open={openPopup == `thumbnail`? true:false} onOpenChange={(open)=> open? openPopup('thumbnail') : closePopup()}>
        <layoutlContent/>
      </Dialog> */}

    </>
  )
}
