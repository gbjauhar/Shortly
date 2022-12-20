import { Router } from "express"
import { createUser, signInUser } from "../controllers/users.controllers.js"


const router = Router()

router.post("/signup", createUser)
router.post("/signin", signInUser)


export default router