import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { Configuration, OpenAIApi } from "openai";
// import { OpenAI } from "openai";

const app = express();

const corsOptions = {
  // origin: "*", // Allow only this origin
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true, // Allow credentials (cookies, headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// const config = new Configuration({
//   apiKey: process.env.OPEN_AI_API,
// });

// const openai = new OpenAIApi(config);

// const openAI = new OpenAI({ apiKey: process.env.OPEN_AI_API });

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" })); // For JSON format
app.use(express.text({ type: "text/*", limit: "32kb" })); // For plain text format
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//print function to ensure every step is executed
app.use((req, res, next) => {
  console.log(`Received ${req.method} request with body:`, req.body);
  console.log(`Received ${req.method} request with params:`, req.params);
  // console.log(req.headers.authorization);
  // console.log("Received Token:", token);

  next();
});

import respondentRoute from "./routes/respondent.routes.js";
import TeachersRoute from "./routes/Teachers.routes.js";
import testRoutes from "./routes/test.routes.js";

app.use("/api/v1/respondent", respondentRoute);
app.use("/api/v1/questioner", TeachersRoute);
app.use("/api/v1/test", testRoutes);

export { app };
