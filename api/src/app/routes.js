import express from 'express';
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const router = express.Router();

router.get('/content', verifySession(), (req, res) => {
    res.json({ response: "User Data" });
    res.end();
});

router.get('/content', verifySession(), (req, res) => {
    console.log(req.query.contentid)
    res.json({ response: "Specific Content" });
    res.end();
});

router.post('/content', (req, res) => {
    console.log(req.body)
    res.send({ response: "New user created" });
    res.end();
})

router.patch('/content', (req, res) => {
    console.log(req.query.userid)
    res.send({ response: "Diary content updated" });
    res.end();
})

router.delete('/content', (req, res) => {
    console.log(req.query.contentid);
    res.send({ response: "Diary content deleted" });
    res.end();
})

export default router;