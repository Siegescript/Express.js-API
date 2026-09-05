import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "./config/passport.mjs";
import { loggingMiddleware } from "./middlewares/logger.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import { initializeDatabase } from "./config/database.mjs";
import cors from "cors";
import { globalLimiter } from "./middlewares/rateLimiters.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS CONFIGURATION
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(loggingMiddleware);
app.use(globalLimiter);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// BASE ROUTES
app.get("/", (request, response) => {
    response.status(200).send({msg: "Hello World!"});
});

// MOUNT ROUTERS
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// STARTUP SERVER
const startServer = async () => {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`
        [OMNISSIAH BLESSING] 
        > Machine Spirit status : AWAKENED & SANCTIFIED
        > Sacred Vox-Port       : ${PORT}
        > Incantation           : Complete

        "There is no certainty in flesh, only in the Machine."
        `);
    });
};

startServer();