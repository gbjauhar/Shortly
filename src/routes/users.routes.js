import { Router } from "express"
import signUpValidation from "../../middlewares/signup.middleware.js"
import { createUser, signInUser } from "../controllers/users.controllers.js"


const router = Router()

router.post("/signup", signUpValidation, createUser)
router.post("/signin", signInUser)


export default router