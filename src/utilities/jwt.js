import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createToken = (user) => {
    const payload = {
        id: user.id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256']
    })
    return payload
}