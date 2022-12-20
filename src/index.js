import express from "express"
import cors from "cors"
import usersRouter from "./routes/users.routes.js"
import urlRouter from "./routes/url.routes.js"

const app = express();
app.use(express.json())
app.use(cors());
app.use(usersRouter)
app.use(urlRouter)

  app.listen(4000, () =>
  console.log(`Server running in port: 4000`)
);