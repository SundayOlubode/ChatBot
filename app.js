const express = require('express')
const app = express()
require('dotenv').config()
const http = require('http')
const server = http.createServer(app)
const io = require('./socket').init(server)
const session = require('express-session')
const chatRoute = require('./routes/chatRoute')
const socketController = require('./controllers/socketController')
const CORS = require('cors')

app.use(
    CORS({
      credentials: true,
      origin: [
      'http://localhost:3300',,
      'https://chatbot-vka0.onrender.com' 
    ]
    })
  );

const PORT = process.env.PORT

// PARSE REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//VIEWS
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("views"));


// SESSION
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
})
);

app.use(socketController)
app.use('/', chatRoute)

server.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})