const express = require('express');
const mongoose = require('mongoose');
const beerRouter = require('./routes/beerRouter');
const app = express();


app.use(express.urlencoded({extended: true}));

app.use('/api/v1/beers', beerRouter);




mongoose.connect('mongodb://localhost:27017/beers', {
    userNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>{
    console.log('connected to beers database');
    app.listen(4444, () => {
        console.log('Listening on 4444...')
    
    })
})
mongoose.connection.on('error', () =>{
    console.log('error connecting to beer db');
    process.exit(1);
})

