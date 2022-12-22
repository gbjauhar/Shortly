import urlSchema from "../schemas/url.schema.js";
import { connection } from "../src/database/server.js";

export async function urlValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ","")
    if(!authorization){
        return res.sendStatus(401)
    }
    const checkToken = await connection.query('SELECT * FROM users WHERE token=$1;', [token])
    if(checkToken.rowCount === 0){
        return res.sendStatus(401)
    }
    const { error } = urlSchema.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(422).send(err)
    }
    next()
}