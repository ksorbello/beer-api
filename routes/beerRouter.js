const express = require('express');
const Beer = require('../models/beer');
const beerRouter = express.Router();



beerRouter.get('/', (req,res) =>{
    
    Beer.find((err, beers)=>{
        if(err){
            res.status(500);
            res.send(err);
        }
        res.json(beers);
     })
});
beerRouter.put('/:beer_id',(req, res) =>{
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
beerRouter.delete('/:beer_id',(req,res) =>{
    Beer.findByIdAndDelete(req.params.beer_id, (err, beer) =>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            res.send(`Success deleted ${beer.name}`)
        }
    })
})
beerRouter.get('/:beer_id', (req,res) => {
    Beer.findById(req.params.beer_id, (err, beer) =>{
        if(err){
            res.status(400);
            res.send(err);
        }else{
            res.json(beer);
        }
        
    })
})
beerRouter.post('/', (req,res) =>{
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


module.exports = beerRouter;