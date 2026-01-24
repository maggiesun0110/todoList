//import stuff
const express = require('express');
const cors = require('cors');

//init app
const app = express();

app.use(cors());
app.use(express.json());

//routes
const path = require('path');
app.use(express.static(path.join(__dirname, "..", "public")));

