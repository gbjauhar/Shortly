import { Router } from "express"
import { createUrl, showSite, showUrl, deleteById } from "../controllers/url.controllers.js"
import {urlValidation} from "../../middlewares/url.middleware.js"


const router = Router()

router.post("/urls/shorten", urlValidation, createUrl)
router.get("/urls/:id", showUrl)
router.get("/urls/open/:shortUrl", showSite)
router.delete("/urls/:id", deleteById)


export default router