const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const handlebars = require('express-handlebars');

const fs = require('fs');

var signedin = false;

// MongoDB Connection //
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyDiary');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

const bcrypt = require('bcrypt');

app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout'
}));
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));


app.get('/home', (req, res) => {
    if(signedin == false) {
        res.status(200).render('home.hbs')
    }
    else {
        res.status(200).render('home.hbs', {layout:'layout2'})
    }
});
app.get('/add', (req, res) => {
    if(signedin == false) {
        res.status(200).render('signin.hbs')    
    }
    else {
        res.status(200).render('add.hbs', {layout: 'layout2'})
    }
});
app.post('/add', (req, res) => {
    let path = "data/"+req.body.diaryDate+".md"
    fs.writeFile(path, req.body.diaryContent, (err) => {
        if(err)
            console.log(err)
    })
    res.status(200).render('success.hbs')
});
app.get('/view', (req, res) => {
    if(signedin == false) {
        res.status(200).render('signin.hbs')    
    }
    else {
        res.status(200).render('view.hbs', {layout:'layout2'})
    }
});
app.get('/signin', (req, res) => {
    res.status(200).render('signin.hbs')
});
app.get('/signup', (req, res) => {
    res.status(200).render('signup.hbs')
});
app.get('/signout', (req,res) => {
    signedin = false
    res.status(200).render('home.hbs')
})
app.post('/signup', (req,res) => {
    var name = req.body.Name;
    var email = req.body.Email;
    var password = req.body.Password;
    bcrypt.hash(password,10).then (hash => {
        var data = {
            "name": name,
            "email": email,
            "password": hash
        }
        if(db.collection('UserData').countDocuments({"email": email}) == 0) {
            db.collection('UserData').insertOne(data, (err,collection)=>{
                if (err) throw err;
                console.log("Record inserted Successfully");
                signedin = true;
            });
            res.status(200).render('home.hbs', {layout:'layout2'});
        }
        // else {
        //     res.status(200).render('signup.hbs');
        // }
    })
})
app.all('*', (req, res) => {
    if(signedin == true) {
        res.status(404).render('404.hbs', {layout:'layout2'});    
    }
    else {
        res.status(404).render('404.hbs');
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at Port ${port}`));