import express from "express";
import dotnev from "dotenv";
import session from "express-session";
import cors from "cors";

// custom middleware
import { errorLogger } from "./middleware/errorLogger.js";

// routers
import AuthRouter from "./routes/authRoutes.js";

// config
import { corsOptions } from "./config/cors.js";

const app = express();
dotnev.config();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true },
  })
);
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5001;

// auth routes
app.use("/auth", AuthRouter);

app.use(errorLogger);

app.listen(PORT, console.log(`App listening on port ${PORT}`));
