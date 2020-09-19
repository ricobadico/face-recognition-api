const express = require('express');
const { response, json } = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const knex =require('knex');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleImage, handleAPICall } = require('./controllers/image');
const { handleProfile } = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'sarah',
        password : '',
        database: 'smart-brain'
    }
});

// //SELECT ALL functionality
// db.select('*').from('users')
// .then(data => console.log(data));

const app = express();
app.use(cors());
app.use(express.json());


// Sign in //
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

// Register //
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});

// Get profile (not implemented) //
app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)});

// Update image count //
app.put('/image', (req, res) => {handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {handleAPICall(req, res)});

app.listen(3000, ()=> {
    console.log("app online on port 3000");
});
 