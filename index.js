const express = require('express');  
const app = express();  
const db  = require('./db/db');

const port = 4000;

db.ensureSchema();

app.listen(port);  
console.log("Listening on port", port);