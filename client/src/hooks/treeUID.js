import { backendBaseURL } from '@/constants';
import { useState, useEffect } from 'react';
import { useLocalstorage } from './localStorage';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useTreeUID = () => {
    const { push } = useRouter();
    const [treeUID, setTreeUID] = useState();
    const { setItem, getItem, removeItem } = useLocalstorage(`selectedTree`);

    useEffect(() => {
        const getDefaultTreeUID = async () => {
            try {
                let res = await fetch(
                    `/api/tree/user-default-treeUID`,
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
                    return { success: true, error: false, response: responseData, statusCode: res.status };
                } else {
                    let responseData = await res.json();
                    return { success: false, error: false, response: responseData, statusCode: res.status };
                }
            } catch (error) {
                return { success: false, error: error, response: error };
            }
        };

        const updateTreeUID = async () => {
            let UID = getItem();

            if (!UID) {
                let { success, response, error, statusCode } = await getDefaultTreeUID();
                if (success) {
                    UID = response.treeUID;
                } else {
                    if (error) {
                        // if caught error in fetch
                        console.log("Some error occurred", error);
                        toast.error(`Some error occurred: ${error.message}`)
                    } else {
                        // no error in fetch and success is false (from server)
                        toast.error(`gg${response.message}`)
                        if (statusCode === 404 || statusCode === 400) {
                            removeItem()
                            return push("/admin/selectTree?removeSelectedTree")
                        } 
                        console.log("can't get treeUID", response.message);
                    }
                }
                setItem(UID);
            }

            setTreeUID(UID)
        };

        updateTreeUID();
    }, []); // Only run this effect once on component mount

    return treeUID;
};

// export default useTreeUID;
