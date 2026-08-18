
export const pathNotFound = (req, res)=> {
    res.status(404).json({
        status: "Error",
        message: "Path Not Found"
    })
}