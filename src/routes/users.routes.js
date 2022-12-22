import { Router } from "express"
import { authValidation } from "../../middlewares/authorization.middleware.js"
import signInValidation from "../../middlewares/signin.middleware.js"
import signUpValidation from "../../middlewares/signup.middleware.js"
import { createUser, showUser, signInUser } from "../controllers/users.controllers.js"


const router = Router()

router.post("/signup", signUpValidation, createUser)
router.post("/signin", signInValidation, signInUser)
router.get("/users/me", authValidation, showUser)


export default router