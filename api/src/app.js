import express from 'express'
import dotenv from 'dotenv'
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import cors from "cors";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import Dashboard from "supertokens-node/recipe/dashboard";

const app = express();
dotenv.config()

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_URL,
        apiKey: process.env.SUPERTOKENS_API,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: process.env.API_NAME,
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEB_DOMAIN,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        Dashboard.init({ apiKey: process.env.SUPERTOKENS_API }),
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
});

app.use(cors({ origin: process.env.WEB_DOMAIN, allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()], credentials: true, }));
app.use(middleware());

app.get('/', (req, res) => {
    res.json({ data: "Welocme!" });
});

app.use(errorHandler())
// your own error handler
app.use((err, req, res, next) => { /* ... */ });
app.listen(process.env.API_PORT)