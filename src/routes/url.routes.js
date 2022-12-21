import { Router } from "express"
import { createUrl } from "../controllers/url.controllers.js"
import urlValidation from "../../middlewares/url.middleware.js"


const router = Router()

router.post("/urls/shorten", urlValidation, createUrl)


export default router