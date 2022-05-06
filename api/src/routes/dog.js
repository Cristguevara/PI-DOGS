const { Router } = require('express');
const { conn }= require('../db');

const router = Router();

const { Dog, Temperament } = conn.models;

router.post('/dog', async (req, res, next) => {
    const { name, height,  weight, life_span, image, temperament  } = req.body // controlar temperament para que solo llegue el array con strings existentes
    try {
            const dogcreate= await Dog.create({
                name: name,
                height: height,
                weight: weight,
                life_span: life_span,
                image: image,
            });
            
            if(temperament){
                temperament.forEach( (t) => {
                    Temperament.findOrCreate({
                    where: {name: t},
                  })
                })

                let temperamentsfind=await Temperament.findAll({
                where:{
                    name:temperament
                }
                })
                
                await dogcreate.setTemperaments(temperamentsfind)
            }
            res.json('Raza creada correctamente')
    } catch (err) {
        next(err)
    }
});

  

module.exports = router;