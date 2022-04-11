const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, async (userName, password, done) => {

    //Match userName 
    const user = await User.findOne({userName})
    if(!user){
        return done(null, false, { message: 'Not User Found' });
    }else{
        //Match password
        let match = false;
        if (user.password == password) {
             match = true;
        } 
        if(match){
            return done(null, user)
        }else{
            return done(null, false, { message: 'Incorrect Password' })
        }
        }
    }

));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    });
});