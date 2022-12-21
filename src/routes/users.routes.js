import { Router } from "express"
import signInValidation from "../../middlewares/signin.middleware.js"
import signUpValidation from "../../middlewares/signup.middleware.js"
import { createUser, signInUser } from "../controllers/users.controllers.js"


const router = Router()

router.post("/signup", signUpValidation, createUser)
router.post("/signin", signInValidation, signInUser)


export default router