import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "./config/passport.mjs";
import { loggingMiddleware } from "./middlewares/logger.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import { sequelize } from "./config/database.mjs";
import { User } from "./models/userModel.mjs";
import { users as mockUsers } from "./models/userModel_mock.mjs";

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

// AUTHENTICATE AND SYNC
try{
    await sequelize.authenticate();
    console.log("> Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("> Models synchronized.");

    const count = await User.count();
    if(count === 0){
        const seedData = mockUsers.map(user => ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password
        }));

        await User.bulkCreate(seedData);
        console.log("> Mock users data seeded into MySQL")
    }
}catch(error){
    console.error("Unable to connect to the database:", error);
}

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