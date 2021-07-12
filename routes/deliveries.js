const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

const Delivery = require('../models/Delivery');

// @route     GET api/delivers
// @desc      Get all delivers
// @access    Public
router.get('/', async (req, res) => {
    try {
        const deliveries = await Delivery.find({});
        res.json(deliveries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/delivery
// @desc      Add new delivery
// @access    Private
// @body      {
//                "weight": 10,
//                "cost": 2,
//                "postcode": "3000"
//             }
router.post('/delivery', [
    check('weight', 'Weight is required').not().isEmpty(),
    check('weight', 'Weight must be a decimal').isDecimal(),
    check('cost', 'Cost is required').not().isEmpty(),
    check('cost', 'Cost must be a decimal').isDecimal(),
    check('postcode', 'Postcode is required').not().isEmpty(),
    check('postcode', 'Must be a valid Australian postcode').isPostalCode("AU")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    const {weight, cost, postcode} = req.body;

    try {
        const newDelivery = new Delivery({
            weight,
            cost,
            postcode
        });

        const delivery = await newDelivery.save();
        res.json(delivery);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;