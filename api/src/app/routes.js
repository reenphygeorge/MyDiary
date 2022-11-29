import express from 'express';
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { createUser, readUser, updateUser } from './service';

const router = express.Router();

// router.get('/content', verifySession(), (req, res) => {
//     res.json({ response: "User Data" });
//     res.end();
// });

router.get('/content', verifySession(), async (req, res) => {
    const response = await readUser(req.query.email)
    res.json({ response });
    res.end();
});

router.post('/content', verifySession(), (req, res) => {
    createUser(req.body)
    res.send({ response: "New user created" });
    res.end();
})

router.patch('/content', verifySession(), (req, res) => {
    const response = updateUser(req.query.email, req.body)
    res.send({ response: "Updated" });
    res.end();
})

// router.delete('/content', verifySession(), (req, res) => {
//     console.log(req.query.contentid);
//     res.send({ response: "Diary content deleted" });
//     res.end();
// })

export default router;