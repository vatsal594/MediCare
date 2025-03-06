import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import videoCallRoutes from "./routes/videoCallRoute.js";
import dialogflow from "@google-cloud/dialogflow";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Dialogflow setup
const KEY_PATH = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);


if (!fs.existsSync(KEY_PATH)) {
  console.error("❌ Dialogflow key file is missing!");
  process.exit(1);
}

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: KEY_PATH,
});

const projectId = process.env.GOOGLE_PROJECT_ID;


// API Endpoint for Chatbot
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: "Missing message or sessionId" });
    }

    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.GOOGLE_PROJECT_ID,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({ response: result.fulfillmentText });
  } catch (error) {
    console.error("❌ Dialogflow Error:", error);
    res.status(500).json({ error: "Failed to get response from Dialogflow" });
  }
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/video-call", videoCallRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
