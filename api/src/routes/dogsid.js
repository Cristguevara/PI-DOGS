const { Router } = require('express');
const axios = require('axios');
const { conn }= require('../db');


const router = Router();

const { Dog, Temperament } = conn.models;

router.get('/dogs/:idRaza', async (req, res, next) => {
    const { idRaza } = req.params
    try {
        if(Number(idRaza)){
            let resaxios= await axios.get(`https://api.thedogapi.com/v1/breeds`)
            let dogsfilter=[]
            resaxios.data.forEach(d=> dogsfilter.push({
                id:d.id, 
                name:d.name, 
                weight: d.weight.metric , 
                height:d.height.metric , 
                image:d.image.url , 
                life_span:d.life_span,
                temperament:d.temperament, 
                })
            )
            let dogfilter=dogsfilter.filter(d => d.id===Number(idRaza))
            if(dogfilter.length===0){
                res.send('El id de la raza de perro no existe')
            }else{
                res.json(dogfilter)
            }
        }else{
            let idmodifiqued=idRaza.split('-').join('').split('').map(n=> parseInt(n,16))
            let UUIDvalidator=idmodifiqued.filter(n => n>=0 && n<=15).length
            if(UUIDvalidator!==32 || idRaza.length!==36){
                res.send('El id de la raza de perro no existe')
            }else{
            let resdb= await Dog.findAll({
                where:{id: idRaza},
                include: [{
                  model: Temperament,
                  attributes:['name'],
                  through: {
                    attributes: []
                  }
                 }],
              })
              if(resdb.length===0){
                res.send('El id de la raza de perro no existe')
              }else{
                  let resdbmodifiqued=[]
                  resdb.forEach(d=>{
                    resdbmodifiqued.push({
                        id:d.id, 
                        name:d.name, 
                        weight: d.weight , 
                        height:d.height , 
                        image:d.image , 
                        life_span:d.life_span,
                        temperament:d.temperaments.map( p => p=p.name).join(', ')
                    })
                  })
                  res.json(resdbmodifiqued)
              }
            }
        }
        
    } catch (err) {
        next(err)
    }
});

module.exports = router;