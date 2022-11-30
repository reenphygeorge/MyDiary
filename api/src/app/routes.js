import express from 'express';
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { createUser, readUser, addDiary, updateDiary } from './service';

const router = express.Router();

router.get('/content', verifySession(), async (req, res) => {
    const response = await readUser(req.query.email)
    res.json({ response });
    res.end();
});

router.post('/content', (req, res) => {
    createUser(req.body)
    res.send({ response: "New user created" });
    res.end();
})

router.put('/content', (req, res) => {
    const response = addDiary(req.query.email, req.body)
    res.send({ response: "Updated" });
    res.end();
})

router.patch('/content', (req, res) => {
    const response = updateDiary(req.query.email, req.query.cid, req.body)
    res.send({ response: "Updated" });
    res.end();
})

// router.delete('/content', (req, res) => {
//     const response = deleteDiary(req.query.email, req.query.cid)
//     // console.log(req.query.contentid);
//     res.send({ response: "Diary content deleted" });
//     res.end();
// })

export default router;