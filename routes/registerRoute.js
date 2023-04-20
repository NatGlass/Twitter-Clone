const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
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
            payload.errorMessage = "Something went wrong"
            res.status(200).render('register', payload);
        });

        if (user == null) {
            // no user found, insert it into the database
            var data = req.body;
            console.log(data);
            User.create(data)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
                payload.errorMessage = "Error creating user";
                res.status(200).render('register', payload);
            })
        }
        else if (user === user.email) {
             // user found
                payload.errorMessage = "Email already in use"
            }
            else {
                payload.errorMessage = "Username already in use"
            }
            res.status(200).render('register', payload);
        }
});

module.exports = router;