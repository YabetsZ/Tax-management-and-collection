import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/hashingFunctions.js";
import { getUserByTin } from "../postgres/users/getUser.js";
import {
    getAuthById,
    getAuthByEmail,
} from "../postgres/taxAuth/getAuthority.js";
import { getAdminByEmail, getAdminById } from "../postgres/admins/getAdmin.js";

passport.serializeUser((user, done) => {
    console.log("Hey from serializeUser id:", user.id);
    if (user.admin_type) done(null, { id: user.id, type: user.admin_type });
    else if (user.jurisdiction)
        done(null, { id: user.id, type: "tax authority" });
    else done(null, { id: user.tin, type: "tax payer" });
});

passport.deserializeUser(async (passed, done) => {
    try {
        let findUser;
        console.log("hey from deserialize", passed);
        if (passed.type === "tax payer") {
            findUser = await getUserByTin(passed.id);
        } else if (passed.type === "tax authority") {
            findUser = await getAuthById(passed.id);
        } else if (passed.type.trim().toLowerCase().endsWith("admin")) {
            findUser = await getAdminById(passed.id);
        }
        if (!findUser) throw new Error("No user has been found!");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    "adminLocal",
    new Strategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const admin = await getAdminByEmail(email);
                if (!admin) throw new Error("Email doesn't exist");
                if (!(await comparePassword(password, admin.password)))
                    throw new Error("Invalid credential");
                done(null, admin);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(
    "taxPayerLocal",
    new Strategy(
        { usernameField: "tin", passwordField: "password" },
        async (tin, password, done) => {
            try {
                const payer = await getUserByTin(tin);
                if (!payer) throw new Error("user doesn't exist");
                if (!(await comparePassword(password, payer.password)))
                    throw new Error("Invalid credential");
                done(null, payer);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(
    "taxAuthLocal",
    new Strategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const auth = await getAuthByEmail(email);
                if (!auth) throw new Error("Email doesn't exist");
                if (!(await comparePassword(password, auth.password)))
                    throw new Error("Invalid credential");
                done(null, auth);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
