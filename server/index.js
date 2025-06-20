import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {serve} from "inngest/express"
import {inngest ,functions} from "./ingest/index.js"
import {clerkMiddleware} from '@clerk/express'
dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(clerkMiddleware())

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


app.use("/api/inngest",serve({client:inngest,functions}))



const PORT = process.env.PORT || 4100;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Port ${PORT} running`);
    });
  })
  .catch(() => {
    logger.error("Error connecting DB", err);
  });
