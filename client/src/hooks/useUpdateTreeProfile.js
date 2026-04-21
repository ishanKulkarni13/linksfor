import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useLocalstorage } from './localStorage';
import { useRouter } from 'next/navigation';

const useUpdateTreeProfile = (treeUID) => {
    // const [loading, setLoading] = useState(false); // temp
    const { removeItem } = useLocalstorage("selectedTree");
    const { push } = useRouter();

    const updateTreeProfile = useCallback(async (updateData) => {
        if (!treeUID) {
            return toast.error("Didn't get treeUID" , {id: "treeUpdation"});
        }
        // setLoading(true);
        try {
            const res = await axios.post(
                `/api/tree/edit/profile/${treeUID}`,
                updateData,
                { withCredentials: true }
            );
            const response = res.data.treeProfile;

            return { response }

            // Update local state if needed
            //   if (updateData.profilePicturePublicUrl) {
            //     setTreeProfile((prevProfile) => ({
            //       ...prevProfile,
            //       treePicture: {
            //         ...prevProfile.treePicture,
            //         URL: data.profilePicturePublicUrl,
            //       },
            //     }));
            //   }

        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message, {id: "treeUpdation"});
                if (error.response.status === 404 || error.response.status === 400 || error.response.status === 401) {
                    removeItem();
                    return push("/admin/select-tree?removeSelectedTree");
                }
            } else if (error.request) {
                toast.error("Network error occurred", {id: "treeUpdation"});
                return { error: { message: `Network error occurred` } }
            } else {
                toast.error(`Some error occurred: ${error.message}`, {id: "treeUpdation"});
                return { error: { message: `Some error occurred: ${error.message}` } }
            }
        }
        // finally {
        //     setLoading(false);
        // }
    }, [treeUID,removeItem, push ]);

    // return { updateTreeProfile, loading };
    return { updateTreeProfile };
};

export default useUpdateTreeProfile;
