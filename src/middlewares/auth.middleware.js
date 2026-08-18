import creatError from 'http-errors'
import { verifyToken } from '../utilities/jwt.js'
import { findUserById } from '../services/user.service.js'

async function authCheck(req, res, next) {
    const authorization = req.headers.authorization
if(!authorization){
    return next(creatError(401, "Unauthorized Access"))
    }
    const token = authorization.split(" ")[1]

    const payload = verifyToken(token)
    
    const user = await findUserById(payload.id)
if(!user) {
    return next(creatError(401, "Unauthorized Access"))
    }
    req.user = user
    next()
}

export default authCheck