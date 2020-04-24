const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 2000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("./config/passport-local-stragety");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}))

//middleware
app.use(express.urlencoded());
app.use(cookieParser());





app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static("./assets"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(session({
    secret: "somethingunique",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: "disabled"
    }, function(err) {
        console.log(err || 'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use("/", require("./routes"));






app.listen(port, function(e) {
    if (e) {
        console.log(`Error in creating server:$e`);
    }
    console.log(`Server is running at port:${port}`);
})