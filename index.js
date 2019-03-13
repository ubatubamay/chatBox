const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const mongoose = require('./database');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'})); // para quando rodar cada servidor separado server e angular

// Interface Angular
app.use(express.static(path.join(__dirname, 'dist/chatbox')));
app.use('/', express.static(path.join(__dirname, 'dist/chatbox')));

// Routes
app.use('/', function(req, res, next){
    res.send('Olá');
});

module.exports = app;