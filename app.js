const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(require('./routes/normalpage.routes'));

app.use(require('./routes/auth.routes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});