import { Router } from "express"
import { createUrl, showUrl } from "../controllers/url.controllers.js"
import {urlValidation} from "../../middlewares/url.middleware.js"


const router = Router()

router.post("/urls/shorten", urlValidation, createUrl)
router.get("/urls/:id", showUrl)


export default router