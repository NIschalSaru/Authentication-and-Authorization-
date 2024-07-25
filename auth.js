// Middleware function to authenticate user
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received Credentials:", username, password);
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "User not found." });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid password." });
      }
    } catch (error) {
      console.log(error);
      // res.status(500).json({ error: "Internal Server Error" });
      return done(error);
    }
  })
);

module.exports = passport;
