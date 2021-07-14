const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

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
    check('postcode', 'Must be a valid Australian postcode').isPostalCode("AU"),
    check('cost', 'Cost is required').not().isEmpty(),
    check('cost', 'Cost must be a decimal').isDecimal()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, description, weight, available, postcode, cost} = req.body;

    try {
        const newItem = new Item({
            name,
            description,
            weight,
            available,
            postcode,
            cost
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

// @route     POST api/items/getItemsDeliveryCostByPostcodeAndID
// @desc      get item/s by id and postcode with calculated delivery cost
// @access    Private
// @body:
// {
//      "postcode": 3000,
//      "itemids": ["60e95a19a4b8af30b8e325c3", "60e95af6d64ec75b4831734f", "60e9abdb08bf3a349c29b9aa"]
//  }
// (note) could use query params, object is more scalable
router.post('/getItemsDeliveryCostByPostcodeAndID', [
    check('postcode', 'Postcode is required').not().isEmpty(),
    check('postcode', 'Must be a valid Australian postcode').isPostalCode("AU"),
    check('itemids', 'itemids is required').not().isEmpty(),
    check('itemids', 'itemdds must be array').isArray(),
    check('itemids').custom((items) => {
        if (!items.every(i => (typeof i === "string"))) throw new Error('Array does not contain Strings'); // check that contains strings
        return true;
    })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {postcode, itemids} = req.body;

        // get delivery costs by postcode
        const deliveriesByPostcode = await Delivery.find({postcode: postcode}).sort({weight: '1'});

        // get items by ids
        const itemsById = await Item.find({'_id': {$in: itemids}});

        // iterate through items and update costs
        let results = [];
        for (let i = 0; i < itemsById.length; i++) {
            for (let d = deliveriesByPostcode.length - 1; d > 0; d--) {
                if (itemsById[i].postcode === deliveriesByPostcode[d].postcode) {
                    if (itemsById[i].weight <= deliveriesByPostcode[d].weight) {
                        itemsById[i].cost = deliveriesByPostcode[d].cost;
                    }
                }
            }
            if (itemsById[i].weight > deliveriesByPostcode[deliveriesByPostcode.length - 1].weight)
                 itemsById[i].cost = deliveriesByPostcode[deliveriesByPostcode.length - 1].cost;
            results.push(itemsById[i]);
        }

        let totalDeliveryCost = null;
        results.forEach((item, index) =>{
                totalDeliveryCost += item.cost
            }
        );
        results.push({"totalDeliveryCost": totalDeliveryCost});

        res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})
;


module.exports = router;