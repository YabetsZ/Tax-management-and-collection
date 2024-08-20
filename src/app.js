import express from "express";
import session from "express-session";
import passport from "passport";
import pgSimple from "connect-pg-simple";

import router from "./routes/allRoutes.js";
import pool from "./postgres/createConnection.js";
import "./Strategies/local-strategies.js";

const app = express();
const pgSession = pgSimple(session);
app.use(express.json());
app.use(
    session({
        secret: "thisismysecretcode",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
        store: new pgSession({
            pool: pool,
            tableName: "session",
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected to the server on port:${PORT}`));
