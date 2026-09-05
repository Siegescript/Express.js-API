import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.mjs";
import { users as mockUsers } from "../models/userModel_mock.mjs"

const sequelize = new Sequelize("expressjs_api", "root", process.env.DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

const initializeDatabase = async () => {
    try{
        await sequelize.authenticate();
        console.log("> Database connection established successfully.");

        await sequelize.sync({ alter: true });
        console.log("> Models synchronized.");

        const count = await User.count();
        if(count === 0){
            const seedData = await Promise.all(
                mockUsers.map(async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash("password123", salt);
                    
                    return{
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: hashedPassword
                    };
                })
            );

            await User.bulkCreate(seedData);
            console.log("> Mock users data seeded into MySQL");
        }
    }catch(error){
        console.log("Unable to connect to the database:", error);
        process.exit(1);
    }
}

export { sequelize, initializeDatabase };