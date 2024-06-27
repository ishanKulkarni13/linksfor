"use client";
import styles from "./treeProfileEditor.module.css";
import EditTreeTitleAndBio from "./editTreeTitleAndBio/editTreeTitleAndBio";
import EditTreePicture from "./editTreePicture/editTreePicture";
import EditTreeProfileLayout from "./editTreeProfileLayout/editTreeProfileLayout";

export default function TreeProfileEditor({treeProfile,setTreeProfile, treeUID}) {
  // const [treeProfile, setTreeProfile] = useState(null);
  // const { push } = useRouter();
  // const { removeItem } = useLocalstorage("selectedTree");

  // const getTreeProfile = async () => {
  //   if (!treeUID) {
  //     console.log(treeUID);
  //     return toast.error("didn't got treeUID while getting treeprofile");
  //   }
  //   try {
  //     console.log(`got treeUId in getTreeProfile as:`, treeUID);
  //     const res = await axios.get(`/api/tree/profile/${treeUID}`, {
  //       withCredentials: true,
  //     });
  //     let treeProfile = res.data.treeProfile;
  //     setTreeProfile(treeProfile);
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       // if server responded
  //       toast.error(error.response.data.message);
  //       if (error.response.status === 404 || error.response.status === 401) {
  //         removeItem();
  //         return push("/admin/selectTree?removeSelectedTree");
  //       }
  //     } else if (error.request) {
  //       //req was made but go no response
  //       toast.error(`error occured`);
  //     } else {
  //       toast.error(`some error occured: ${error.message}`);
  //     }
  //   }
  // };

  // useEffect(() => {
  //     getTreeProfile();
    
  // }, []);

  return (
    <>
          <p className={styles.title}>Profile</p>
          <div className={styles.container}>
            
            <div className={styles.editTreePictureContainer}>
              <EditTreePicture
                treeProfile={treeProfile}
                setTreeProfile={setTreeProfile}
                treeUID={treeUID}
              />
            </div>

            <div className={styles.profileTitleAndBioContainer}>
              <EditTreeTitleAndBio
                treeProfile={treeProfile}
                treeUID={treeUID}
              />
            </div>

            
            {/* <div className={styles.editTreeProfileLayoutContainer}>
              <EditTreeProfileLayout
                treeProfile={treeProfile}
                treeUID={treeUID}
              />
            </div> */}
          </div>
    </>
  );
}
