const express = require('express');
const app = express();
const port = 4000;
require('./db');
const session = require('express-session');

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: 'mechNearMeSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//Routes
app.use(require('./routes/preLogin.routes'));

app.listen(port,()=>{
    console.log('Mechanic app is working');
})