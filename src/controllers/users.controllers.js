import { connection } from "../database/server.js"
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt"

export async function createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body
    try {
        if (password !== confirmPassword) {
            return res.sendStatus(500)
        }
        const existingUser = await connection.query('SELECT * FROM users WHERE email=$1;', [email])
        if (existingUser.rowCount > 0) {
            return res.sendStatus(409)
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, passwordHash])
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }

}

export async function signInUser(req, res) {
    const { email, password } = req.body
    try {
        const checkUser = await connection.query('SELECT * FROM users WHERE email=$1;', [email])
        if(checkUser && bcrypt.compareSync(password, checkUser.rows[0].password)){
        const token = uuid()
        await connection.query('UPDATE users SET token=$1 WHERE email=$2;', [token, email])
        res.status(200).send(token)
        }else{
            return res.sendStatus(401)

        }
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function showUser(req, res) {
   const token = res.locals.token
    try {
        const checkToken = await connection.query('SELECT * FROM users WHERE token=$1;', [token])
        const urls = await connection.query('SELECT * FROM urls WHERE "userId" =$1;', [checkToken.rows[0].id])
        const soma = await connection.query('SELECT SUM("visitCount") FROM urls WHERE "userId"=$1;',[urls.rows[0].userId])
        const body = {
            id: checkToken.rows[0].id,
            name: checkToken.rows[0].name,
            visitCount: soma.rows[0].sum,
            shortenedUrls: urls.rows.map((p) => {
                return {
                    id: p.id,
                    url: p.url,
                    shortUrl: p.shortUrl,
                    visitCount: p.visitCount
                }
            })
        }
        res.status(200).send(body)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}