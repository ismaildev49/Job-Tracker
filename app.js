const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

//view engine
app.set('view engine', 'ejs')


// Database Connection
const dbURI = 'mongodb+srv://ismaelbentatou:blabla123@cluster0.pnvb5it.mongodb.net/jobTracker';
mongoose.connect(dbURI,)
  .then((result) => app.listen(PORT, (err, data) => {
    console.log('listening to port ' + PORT);
  }))
  .catch((err) => console.log(err));


//routes

app.use(routes)