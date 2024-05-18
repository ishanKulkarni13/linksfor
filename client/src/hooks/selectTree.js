export const useSelectTree = ()=>{
    const selectTree = (treeUID)=>{
        try {
            window.localStorage.setItem(`selectedTree`, JSON.stringify(treeUID))
        } catch (error) {
            console.log(error);
        }
    };

    return selectTree
}