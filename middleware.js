// if the user is not logged in, redirect to the login
exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    }
    else {
        return res.redirect('/login')
    }
}