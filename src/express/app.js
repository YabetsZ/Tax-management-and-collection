import express from "express";
import session from "express-session";

import { getAdmins, getUser } from "./queries.js";

const app = express();
app.use(express.json());
app.use(
    session({
        secret: "thisismysecretcode",
        saveUninitialized: false,
        resave: false,
        Cookie: {
            maxAge: 1000 * 60 * 2,
        },
    })
);

app.get("/", getAdmins); // this is trial api endpoint
app.post("/api/user", getUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected to the server on port:${PORT}`));
