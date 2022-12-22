import {connection} from "../database/server.js"
import { v4 as uuid } from "uuid";

export async function createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body
    try{
    if(password !== confirmPassword){
        return res.sendStatus(500)
    }
    const existingUser = await connection.query('SELECT * FROM users WHERE email=$1;', [email])
    if(existingUser.rowCount > 0){
        return res.sendStatus(409)
    }
    await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password])
    res.sendStatus(201)
}catch (err){
    res.sendStatus(500)
}

}

export async function signInUser(req, res){
    const {email, password} = req.body
    try{
        const checkUser = await connection.query('SELECT * FROM users WHERE email=$1 AND password=$2;', [email, password])
        if(checkUser.rowCount === 0){
            return res.sendStatus(401)
        }
        const token = uuid()
        await connection.query('UPDATE users SET token=$1 WHERE email=$2;', [token, email])
        res.status(200).send(token)
    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }
}