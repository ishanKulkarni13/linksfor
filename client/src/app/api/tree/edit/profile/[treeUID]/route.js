export const POST = async (req, res, next) => {
    const user = req.user
    let treeUID;
    if (!(req.params.treeUID) && !(req.body.treeUID)) {
        return next(new ErrorHandelar("treeUID not provided"));
    } else {
        treeUID = req.params.treeUID || req.body.treeUID;
    }

    let {treeName, treeBio} = req.body;
    if(!treeName && !treeBio){return next(new ErrorHandelar("Nothing to change"))}

    try {

        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) { return next(new ErrorHandelar('treeUID is not valid', 400)) };

        if (tree.owner.equals(user._id)) {

            if(treeName){
                tree.treeName = treeName
            }

            if(treeBio){
                tree.treeBio = treeBio
            }          
            
            res.json({success:true, treeProfile: {treeBio, treeName}})
            await tree.save();
        } else {
            next(new ErrorHandelar("Unautherised access to edit tree", 401))
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}