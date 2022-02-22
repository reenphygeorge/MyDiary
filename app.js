const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const handlebars = require('express-handlebars');

const fs = require('fs');

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
    res.status(200).render('home.hbs')
});
app.get('/add', (req, res) => {
    res.status(200).render('add.hbs')
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
    res.status(200).render('view.hbs')
});
app.get('/signin', (req, res) => {
    res.status(200).render('signin.hbs')
});
app.get('/signup', (req, res) => {
    res.status(200).render('signup.hbs')
});
app.all('*', (req, res) => {
    res.status(404).render('404.hbs');
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at Port ${port}`));