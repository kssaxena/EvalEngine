import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" })); // For JSON format
app.use(express.text({ type: "text/*", limit: "32kb" })); // For plain text format
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//print function to ensure every step is executed
app.use((req, res, next) => {
  console.log(`Received ${req.method} request with body:`, req.body);
  next();
});


export { app };
