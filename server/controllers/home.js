import ErrorHandelar from "../middlewares/error.js";

export const homeHandelar = (req, res) => {
    let user = req.user;
    res.json({ user })


}

