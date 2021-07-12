const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

const Item = require('../models/Item');
const Delivery = require('../models/Delivery');

// @route     GET api/items
// @desc      Get all items
// @access    Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}); //.sort({id: -1});
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     GET api/items/getitemById
// @desc      Get all available items
// @access    Public
router.get('/getItemById/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/items
// @desc      Add new item
// @access    Private
// @body      {
//              "name": "Small Rubber Pizza",
//              "description": "Seamless grid-enabled approach",
//              "weight": 11,
//              "available": true,
//              "postcode": "3000"
//             }
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must be a string').isString(),
    check('description', 'Description is required').not().isEmpty(),
    check('description', 'Description must be a string').isString(),
    check('weight', 'Weight is required').not().isEmpty(),
    check('weight', 'Weight must be a decimal').isDecimal(),
    check('available', 'Available is required').not().isEmpty(),
    check('available', 'Available must be true or false').isBoolean(),
    check('postcode', 'Postcode is required').not().isEmpty(),
    check('postcode', 'Must be a valid Australian postcode').isPostalCode("AU")
    //check('cost', 'Cost must be a number').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, description, weight, available, postcode} = req.body;

    try {
        const newItem = new Item({
            name,
            description,
            weight,
            available,
            postcode
        });

        // alternative syntax
        //await Item.create(newItem).then(item => res.json(item));

        const item = await newItem.save();
        res.json(item);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;