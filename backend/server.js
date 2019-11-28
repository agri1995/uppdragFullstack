const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); //öppna en server
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection; //connection till databas
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const uppdragRouter = require('./routes/uppdrag');
const userRouter = require('./routes/users');

app.use('/uppdrag', uppdragRouter); //laddar upp uppdrag när man /uppdrag i url
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});