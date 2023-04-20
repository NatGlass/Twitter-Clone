const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
    res.status(200).render('register');
});

router.post('/', async (req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if (firstName && lastName && username && email && password) {
        // check that the user exists
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch(error => {
            console.log(error);
            payload.errorMessage = "Something went wrong";
            return res.status(200).render('register', payload); // <-- move inside the catch block
        });

        if (user == null) {
            // no user found, insert it into the database
            var data = req.body;

            data.password = await bcrypt.hash(password, 10);

            console.log(data);

            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect('/');
            })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Error creating user";
                return res.status(200).render('register', payload); // <-- move inside the catch block
            });
        }
        else if (user === user.email) {
             // user found
            payload.errorMessage = "Email already in use"
            return res.status(200).render('register', payload); // <-- move inside the if block
        }
        else {
            payload.errorMessage = "Username already in use"
            return res.status(200).render('register', payload); // <-- move inside the else block
        }
    }
    else {
        payload.errorMessage = "All fields required";
        return res.status(200).render('register', payload); // <-- move inside the else block
    }
});

module.exports = router;