import { connection } from "../src/database/server.js"

export async function authValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ","")
    if (!authorization) {
        return res.sendStatus(401)
    }
    const checkToken = await connection.query('SELECT * FROM users WHERE token=$1;', [token])
    if (checkToken.rowCount === 0) {
        return res.sendStatus(404)
    }
    res.locals.token = token
    next()
}