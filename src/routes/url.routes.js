import { Router } from "express"
import { createUrl } from "../controllers/url.controllers.js"


const router = Router()

router.post("/urls/shorten", createUrl)


export default router