import {connection} from "../database/server.js"

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