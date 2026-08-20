import "dotenv/config";
import express from "express";
import session from "express-session";
import { loggingMiddleware } from "./middlewares/logger.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/userRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(loggingMiddleware);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
        sameSite: "lax"
    }
}));

// BASE ROUTES
app.get("/", (request, response) => {
    response.status(200).send({msg: "Hello World!"});
});

// MOUNT ROUTERS
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`
        [OMNISSIAH BLESSING] 
        > Machine Spirit status : AWAKENED & SANCTIFIED
        > Sacred Vox-Port       : ${PORT}
        > Incantation           : Complete
        
        "There is no certainty in flesh, only in the Machine."
    `);
});