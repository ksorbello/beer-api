const express = require('express');
const mongoose = require('mongoose');
const Beer = require('./models/beer');
const app = express();


// app.use('/hello',(req, res) => {
//     console.log('Got a request');
//     res.send('<h1>hello</>')
// });

app.use(express.urlencoded({extended: true}));

app.get('/beers', (req,res) =>{
    
    Beer.find((err, beers)=>{
        if(err){
            res.status(500);
            res.send(err);
        }
        res.json(beers);
     })
});
app.put('/beers/:beer_id',(req, res) =>{
    Beer.findById(req.params.beer_id, (err,beer) =>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            beer.name = req.body.name;
            beer.rating = req.body.rating;
            beer.save((err,beer)=>{
                if(err){
                    res.status(400);
                    res.send(err);
                }else{
                    res.send(beer);
                }
            })
        }
    })
})
app.delete('/beers/:beer_id',(req,res) =>{
    Beer.findByIdAndDelete(req.params.beer_id, (err, beer) =>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            res.send(`Success deleted ${beer.name}`)
        }
    })
})
app.get('/beers/:beer_id', (req,res) => {
    Beer.findById(req.params.beer_id, (err, beer) =>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            res.json(beer);
        }
        
    })
})
app.post('/beers', (req,res) =>{
    let beer = new Beer();
    beer.name = req.body.name;
    beer.rating = req.body.rating;
    beer.save((err, beer)=>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            res.send(`Saved your ${beer}`);
        }
    });
})
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

