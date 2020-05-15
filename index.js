const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 2000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("./config/passport-local-stragety");
const passportJWT=require("./config/passport_jwt");
const passportGoogle=require('./config/passport-google-autho');
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash=require("connect-flash");
const custoMware=require("./config/middleWare");

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
// make the upload path avilabe to browser
app.use('/uploads',express.static(__dirname + '/uploads'))
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
app.use(flash());
app.use(custoMware.setFlash);


app.use("/", require("./routes"));






app.listen(port, function(e) {
    if (e) {
        console.log(`Error in creating server:$e`);
    }
    console.log(`Server is running at port:${port}`);
})