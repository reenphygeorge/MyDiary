import express from 'express';
import { createUser, readUser, addDiary, updateDiary } from './service';

const router = express.Router();

// GET: localhost:8000/user?email= (to get all data of user by email)
router.get('/user', (req, res) => {
    const response = readUser(req.query.email)
    res.json({ response });
    res.end();
});

// POST: localhost:8000/user (to create a new user)
router.post('/user', (req, res) => {
    createUser(req.body)
    res.send({ response: "New user created" });
    res.end();
});

// localhost:8000/content/diary?email= (to add a new diary)
router.post('/user/diary', (req, res) => {
    const response = addDiary(req.query.email, req.body)
    res.send(response);
    res.end();
});

// localhost:8000/user/diary?cid= (to update a content with diary id)
router.patch('/content/diary', (req, res) => {
    const response = updateDiary(req.query.cid, req.body)
    res.send(response);
    res.end();
});

// localhost:8000/user/diary?cid= (to delete a content with diary id)
router.delete('/user/diary', (req, res) => {
    const response = deleteDiary(req.query.cid)
    res.send(response);
    res.end();
});

export default router;
