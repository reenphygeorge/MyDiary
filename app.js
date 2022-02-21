const express = require('express');
const app = express();

const path = require('path');

const handlebars = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout'
}));
app.use(express.static('public'));
app.get('/home', (req,res) => {
    res.render('home.hbs')
})
app.get('/add', (req,res) => {
    res.render('add.hbs')
})
app.get('/view', (req,res) => {
    res.render('view.hbs')
})
app.get('/signin', (req,res) => {
    res.render('signin.hbs')
})
app.get('/signup', (req,res) => {
    res.render('signup.hbs')
})
app.all('*', (req, res) => {
    res.status(404).render('404.hbs');
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at Port ${port}`));