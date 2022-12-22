import express from "express"
import cors from "cors"
import usersRouter from "./routes/users.routes.js"
import urlRouter from "./routes/url.routes.js"
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(express.json())
app.use(cors());
app.use(usersRouter)
app.use(urlRouter)

  app.listen(process.env.PORT, () =>
  console.log(`Server running in port: ${process.env.PORT}`)
);