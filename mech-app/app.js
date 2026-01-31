const express = require('express');
const app = express();
const port = 4000;
require('./db');


app.set('view engine','ejs');
app.use(express.static('public'));

//Routes
app.use(require('./routes/preLogin.routes'));

app.listen(port,()=>{
    console.log('Mechanic app is working');
})