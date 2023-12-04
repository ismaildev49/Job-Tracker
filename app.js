require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const app = express()
const PORT = process.env.PORT || 3001
const dbURI = process.env.MONGODB_URI || process.env.DBURI;

// Middleware
// app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//view engine
app.set('view engine', 'ejs')


// Database Connection

mongoose.connect(process.env.dbURI)
  .then((result) => app.listen(PORT, (err, data) => {
    console.log('listening to port ' + PORT);
  }))
  .catch((err) => console.log(err));


//routes

app.use(routes)