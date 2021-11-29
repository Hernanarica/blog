import jwt from 'jsonwebtoken';

export function JWTValidar(req, res, next){
    const token = req.header('auth-token')
    if(token){
        try {
            const verify = jwt.verify(token, 'token')
            req.user = verify
            next()
        }
        catch (e) {
            res.status(400).json({error: 400, msg: "Token incorrecto."})
        }
    }else{
        res.status(400).json({error: 400, msg: "Acseso denegado."})
    }
}

export function createToken(data){
    return jwt.sign(data, 'token')
}

export default {
    JWTValidar,
    createToken
}