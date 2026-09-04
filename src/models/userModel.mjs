import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if(user.changed('password')){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

export{ User };