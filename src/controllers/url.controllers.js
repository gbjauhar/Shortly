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

export async function showUrl(req, res){
    const {id} = req.params
    try{
        const findUrl = await connection.query('SELECT * FROM urls WHERE id=$1;', [id])
        if(findUrl.rowCount === 0){
            return res.sendStatus(404)
        }
        const body = ({
            id: findUrl.rows[0].id,
            url: findUrl.rows[0].url,
            shortUrl: findUrl.rows[0].shortUrl
        })
        res.status(200).send(body)
    }catch(err){
        res.sendStatus(500)
        console.log(err)

    }
}