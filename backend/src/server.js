const express = require('express');
require('dotenv').config();
const router = require('./routes/routes');
const app = express();
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3700, () => {
    console.log("Server running at port " + process.env.PORT);
})