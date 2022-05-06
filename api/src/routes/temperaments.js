const { Router } = require('express');
const axios = require('axios');
const { conn }= require('../db');

const router = Router();

const {  Temperament } = conn.models;

router.get('/temperament', async (req, res, next) => {

    try {
        let resdb = await Temperament.findAll()
        res.json(resdb)
    } catch (err) {
        next(err)
    }
});

module.exports = router;