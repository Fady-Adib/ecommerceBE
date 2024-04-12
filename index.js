import dotenv from "dotenv";
import express from "express";
import path from "path";
import { dbConnection } from "./db/db.connection.js";
import appErr from "./src/utils/handler/appErr.js";
import GlobalErrHandler from "./src/utils/handler/globalErrHandlers.js";
import routes from "./src/initRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
dbConnection();
app.use(cors());
app.use(express.json());


routes(app)


app.use("*", (req, res, next) => {
  next(new appErr(`${req.originalUrl} is not found`, 404));
});

app.use(GlobalErrHandler);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
