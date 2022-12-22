import { nanoid } from "nanoid"
import { connection } from "../database/server.js"

export async function createUrl(req, res){
    const {url} = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try{
        const shortened = nanoid(10)
        const existingUser = await connection.query('SELECT id FROM users WHERE token=$1;', [token])
        await connection.query('INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, $4);', [existingUser.rows[0].id, url, shortened, 0])
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

export async function showSite(req, res){
    const {shortUrl} = req.params
    try{
        const findUrl = await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1;', [shortUrl])
        if(findUrl.rowCount === 0){
            return res.sendStatus(404)
        }
        console.log(findUrl.rows[0].url)
        await connection.query('UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;',[findUrl.rows[0].visitCount + 1, shortUrl])
       res.redirect(200, findUrl.rows[0].url)
    }catch(err){
        res.sendStatus(500)
        console.log(err)
        
    }
}

export async function deleteById(req, res){
    const {id} = req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ","")
    try{
    if(!authorization){
        return res.sendStatus(401)
    }
    const checkToken = await connection.query('SELECT * FROM users WHERE token=$1;', [token])
    if(checkToken.rowCount === 0){
        return res.sendStatus(401)
    }
    const findUrl = await connection.query('SELECT * FROM urls WHERE id=$1;', [id])
    if(findUrl.rowCount === 0){
        return res.sendStatus(404)
    }

    const findUrlByUser = await connection.query('SELECT "shortUrl" FROM urls WHERE "userId"=$1;', [checkToken.rows[0].id])
    if(findUrlByUser.rowCount === 0){
        return res.sendStatus(401)
    }
    await connection.query('DELETE FROM urls WHERE id=$1;', [id])
   res.sendStatus(204)

}catch (err){
    res.sendStatus(500)
    console.log(err)
}
}