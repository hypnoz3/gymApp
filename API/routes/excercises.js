const express = require('express');
const router = express.Router();
const Excercises = require('../models/excercises')

// Getting all
router.get('/', async (req, res) => {
    try {
        const excercises = await Excercises.find()
        res.json(excercises)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
// Getting One
router.get('/:id', (req, res) => {
    
})
// Creating one
router.post('/', async (req, res) => {
    
})
// Updating One
router.patch('/:id', (req, res) => {
    
})
//Deleting One
router.delete('/:id', (req, res) => {
    
})

module.exports = router