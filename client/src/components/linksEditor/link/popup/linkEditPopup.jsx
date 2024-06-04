import axios from "axios";
import LayoutPopup from "./layout/layout";
import ThumbnailPopup from "./thumbnail/thumbnail";
import { toast } from "sonner";

export default function LinkEditPopup({openPopup, closePopup, setLinkData, linkData, treeUID}) {

  const update = async (data) => {
    data.thumbnailURL && setLinkData({...linkData, thumbnail:{URL:data.thumbnailURL}})
    try {
      const res = await axios.post(
        `/api/tree/edit/link/${linkData.UID}`,
        { ...data,  treeUID, linkUID:linkData.UID },
        { withCredentials: true }
      );
      console.log(res)
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        if (error.response.status === 404 || error.response.status === 400) {
          console.log(error.response);
          //   removeItem();
          //   return push("/admin/selectTree?removeSelectedTree");
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };
     
  return (
    <>
   {openPopup == `thumbnail` && <ThumbnailPopup update={update} linkData={linkData} close={closePopup} /> }
   {openPopup == `layout` && <LayoutPopup update={update} linkData={linkData} close={closePopup} /> }
    </>
  )
}
