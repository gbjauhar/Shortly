import { nanoid } from "nanoid"
import { connection } from "../database/server.js"

export async function createUrl(req, res){
    const {url} = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try{
        const shortened = nanoid(10)
        const existingUser = await connection.query('SELECT "userId" FROM sessions WHERE token=$1;', [token])
        await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [existingUser.rows[0].userId, url, shortened])
        res.status(201).send({"shortUrl": shortened})
    }catch (err){
        res.sendStatus(500)
        console.log(err)
    }

}