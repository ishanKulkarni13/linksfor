import axios from "axios";
import LayoutPopup from "./layout/layout";
import ThumbnailUpdationContent from "./thumbnail/thumbnail";
import { toast } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LinkEditPopups({openPopup, closePopup, setLinkData, linkData, treeUID}) {

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

  return (
    <>
      {/* Thumbnail */}
      <Dialog open={openPopup == `thumbnail`} onOpenChange={(open)=> open? openPopup('thumbnail') : closePopup()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {openPopup}</DialogTitle>
            <DialogDescription>Update thumbnail for {linkData.title}</DialogDescription>
          </DialogHeader>
          <ThumbnailUpdationContent update={update} linkData={linkData} close={closePopup} />
        </DialogContent>
      </Dialog>

      {/* Layout */}
      <Dialog open={openPopup == `layout`} onOpenChange={(open)=> open? openPopup('layout') : closePopup()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {openPopup}</DialogTitle>
            <DialogDescription>Choose a layout for {linkData.title}</DialogDescription>
          </DialogHeader>
          <LayoutPopup update={update} linkData={linkData} close={closePopup} />
        </DialogContent>
      </Dialog>
    </>
  )
}
