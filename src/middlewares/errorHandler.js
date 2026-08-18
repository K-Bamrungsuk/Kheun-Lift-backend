import z from "zod";

function errorHandler (err, req, res, next) {
    console.log('err', err)
    if(err instanceof z.ZodError){
        res.status(400).json({
            status: 'Error',
            message: "Validation error",
            error: z.flattenError(err).fieldErrors
        })
    }else{
        res.status(err.status || 500).json({
            status: "Error",
            message: err.message || "Internal Server error"
        })
    }
}

export default errorHandler