import { connection } from "../database/server.js";

export async function getRanking(req, res){
    try{
    const body = await connection.query(`
    SELECT users.id, name,
    COUNT(urls.id)::INTEGER AS "linksCount",
    SUM(urls."visitCount")::INTEGER AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id=urls."userId"
    WHERE "visitCount" IS NOT NULL
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;`)
    res.status(200).send(body.rows)
    }catch(err){
        res.sendStatus(500)
        console.log(err)
    }   
}