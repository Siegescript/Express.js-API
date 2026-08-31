import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/userModel.mjs";

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"    
}, async (email, password, done ) => {
    try{
        const user = await User.findOne({ where:{ email } });
        if(!user || user.password !== password){
            return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
    }catch(error){
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findByPk(id);
        done(null, user);
    }catch(error){
        done(error);
    }
});

export default passport;