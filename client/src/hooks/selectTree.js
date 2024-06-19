export const useSelectTree = ()=>{
    const selectTree = (treeUID)=>{
        try {
            if(treeUID){
                window.localStorage.setItem(`selectedTree`, JSON.stringify(treeUID))
            } else{
                window.localStorage.removeItem(`selectedTree`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return selectTree
}