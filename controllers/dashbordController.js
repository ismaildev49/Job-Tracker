// The Dashboard page is the Home page that is accessible only when the user is logged in. If he isn't logged in, he will be redirected to the login page by the *checkUser* function (see app.js file).

module.exports.get = (req, res) => {
    res.render('dashboard')
}