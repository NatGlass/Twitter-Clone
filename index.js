const express = require('express');
const app = express();
const port = 8000;
const middleware = require('./middleware');

const server = app.listen(port, () => console.log('listening on port 8000'));

app.set('view engine', 'pug');
app.set('views', 'views');

// ROUTES
const loginRoute = require('./routes/loginRoute');

app.use('/login', loginRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: 'Home'
    }

    res.status(200).render('home', payload);
});