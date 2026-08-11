import express from "express";
import { loggingMiddleware } from "./middlewares/logger.mjs";
import userRoutes from "./routes/userRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(express.json());
app.use(loggingMiddleware);

// BASE ROUTES
app.get("/", (request, response) => {
    response.status(200).send({msg: "Hello World!"});
});

// MOUNT ROUTERS
app.use("/api/users", userRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`
        [OMNISSIAH BLESSING] 
        > Machine Spirit status : AWAKENED & SANCTIFIED
        > Sacred Vox-Port      : ${PORT}
        > Incantation          : Complete
        
        "There is no certainty in flesh, only in the Machine."
    `);
});