
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./interfaces/http/api/routes";
import errorHandler from "./interfaces/http/api/middlewares/errorHandler";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use("/api", router)


app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})