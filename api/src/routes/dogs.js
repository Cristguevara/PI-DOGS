const { Router } = require('express');
const axios = require('axios');
const { conn }= require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const { Dog, Temperament } = conn.models;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res, next) => {
    const { name } = req.query
    try {
      let resaxios= await axios.get(`https://api.thedogapi.com/v1/breeds`)
      let dogsApi=[]
      resaxios.data.forEach(d=> dogsApi.push({
          id:d.id, 
          name:d.name, 
          weight: d.weight.metric ,  
          image:d.image.url , 
          temperament:d.temperament, 
        })
      )

      let resdb= await Dog.findAll({
        attributes: ['id', 'name', 'weight','image'],
        include: [{
          model: Temperament,
          attributes:['name'],
          through: {
            attributes: []
          }
         }],
      })
      let resdbmodifiqued=[]
      resdb.forEach(d=>{
        resdbmodifiqued.push({
          id:d.id,
          name: d.name,
          weight:d.weight,
          image:d.image,
          temperament:d.temperaments.map( p => p=p.name).join(', ')
        })
      })

      
      let allTemperaments=[]
      resaxios.data.forEach(d => {
          if(d.temperament){
              allTemperaments.push(...d.temperament.split(', '))
          }
      })
      let temperamentsApi=[]
      allTemperaments.forEach(t =>{
          if(!temperamentsApi.includes(t)){
              temperamentsApi.push(t)
          }
      })
      
      temperamentsApi.forEach( (t) => {
              Temperament.findOrCreate({
              where: {name: t},
            })
      })

      if(!name){
      res.status(200).json([...dogsApi,...resdbmodifiqued])
      }else{
        let filterquery=[...dogsApi.filter(d=>d.name.toLowerCase().includes(name.toLowerCase())),...resdbmodifiqued.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))]
        if(filterquery.length===0){
          res.status(200).send("No coincide con ningúna")
        }
        res.status(200).json(filterquery)
      }
    } catch (err) {
      next(err)
    }
});

module.exports = router;
