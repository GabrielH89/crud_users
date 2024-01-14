const express = require('express');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server running at port " + process.env.PORT);
})