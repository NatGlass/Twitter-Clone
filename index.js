const express = require('express');
const app = express();
const port = 8000;
const middleware = require('./middleware');
const path  = require('path');

const server = app.listen(port, () => console.log('listening on port 8000'));

app.set('view engine', 'pug');
app.set('views', 'views');

// direct server to access css files in the public folder
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: 'Home'
    }

    res.status(200).render('home', payload);
});