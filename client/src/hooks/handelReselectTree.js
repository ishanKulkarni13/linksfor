import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useLocalstorage } from './localStorage';
import { useRouter } from 'next/navigation';

const useHandelReselectTree = () => {
    const { removeItem } = useLocalstorage("selectedTree");
    const { push } = useRouter();

    const redirectToSelectTree = async (updateData) => {
       
        try {
            toast.info('Reedirecting you to select tree')
            await removeItem();
        } catch (error) {
            console.log(error);
        }
        push('/admin/select-tree');
    }

    const handelInvalidTreeUID = redirectToSelectTree;
    return {redirectToSelectTree, handelInvalidTreeUID}
};

export default useHandelReselectTree;
