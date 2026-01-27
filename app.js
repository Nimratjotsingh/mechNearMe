const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const connectDB = require('./db');

require('dotenv').config();


connectDB();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false
}));

app.use(require('./middleware/setUser').setUser);

app.use(require('./routes/normalpage.routes'));

app.use(require('./routes/postLogin.routes'));

app.use(require('./routes/auth.routes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});