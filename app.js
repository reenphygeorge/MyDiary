const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const handlebars = require('express-handlebars');

const fs = require('fs');
var signedin = false;

const db = require(__dirname+"/connection")
const User = require(__dirname+"/userschema")

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
    let path = "data/"+signedin+"/"+req.body.diaryDate+".md"
    fs.writeFile(path, req.body.diaryContent, (err) => {
        if(err)
            console.log(err)
    })
    res.status(200).render('success.hbs', {layout:'layout2'})
});
app.get('/view', (req, res) => {
    if(signedin == false) {
        res.status(200).render('signin.hbs')    
    }
    else {
        const loc = "data/"+signedin;
        var jsondiary = [] 
        fs.readdir(loc, (err, files) => {

            files.forEach((item, index)=> {
                fs.readFile(loc+"/"+item, 'utf8', function(err, data){
                    var obj = {"date": item,"data": data}
                    jsondiary.push(obj)
                    res.status(200).render('viewfull.hbs', {jsondiary, layout:'layout2'})
                })
            })
        })
    }
});
app.get('/viewfull', (req,res) => {
    res.status(200).render('viewfull.hbs', {layout:'layout2'})
})
app.get('/signin', (req, res) => {
    res.status(200).render('signin.hbs')
})
app.post('/signin', (req,res) => {
    User.findById(req.body.Email, (err,docs) => {
        if(err) console.log(err)
        else {
            if(docs == null)
                res.status(200).render('signin.hbs');
            else
            {
                bcrypt.compare(req.body.Password, docs.password, (err,response)=>{
                    if(response) {
                        res.status(200).render('home.hbs', {layout:'layout2'});
                        signedin = docs._id;
                    }
                    else {
                        res.status(200).render('signin.hbs');
                    }
                })
            }
        }
    })
})
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
    User.findById(req.body.Email, (err,docs) => {
        if(docs == null) {
            bcrypt.hash(password,10).then (hash => {
                const data = new User ({
                    "_id": email,
                    "name": name,
                    "password": hash
                })
                try {
                    data.save()
                    res.status(200).render('signin.hbs');    
                    fs.mkdir('data/'+signedin,(error) => {
                        if (error) {
                            console.log(error);
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }) 
        }
        else {
            res.status(200).render('signin.hbs');
        }
    })
    
})
app.all('*', (req, res) => {
    if(signedin == false) {
        res.status(404).render('404.hbs');    
    }
    else {
        res.status(404).render('404.hbs', {layout:'layout2'});
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at Port ${port}`));