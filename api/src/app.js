import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import router from './app/routes'

const app = express();
dotenv.config()

app.use(express.json());

// Router //
app.use(router);

app.listen(process.env.API_PORT)