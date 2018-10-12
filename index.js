const express = require('express');
const cors = require('cors');
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');
const port = 7000;

const server = express();
server.use(express.json());

server.get('/', (req,res) => {
    res.send("Welcome to your new project");
})











server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})