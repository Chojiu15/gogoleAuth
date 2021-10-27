const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')
const cookieSession = require('cookie-session')
const PORT = 3002
require('./passport-setup')
require('dotenv').config()


app.use(cors())
app.use(cookieSession({
    name : 'google',
    keys  : ['key1', 'key2']
}))


// loggedIn route
// google route : passport authenticate
// google callback
// logout


app.use(passport.initialize())
app.use(passport.session())

const isLoggedIn = (req, res, next) => {
    if(req.user){
        next()
    }
    else{
        res.status(401).send('There is no user')
    }
}

app.get('/', (req, res) => res.send('You are not logged in'))
app.get('/failed', (req, res) => res.send('Failed to login'))
app.get('/loggedIn', isLoggedIn, (req, res) => {
    console.log(req.user)
    res.send(`Welcome user ${req.user.displayName} email ${req.user.emails[0].value}`)
})

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/loggedIn');
  });






app.listen(PORT, () => console.log(`Server running on port ${PORT}`))