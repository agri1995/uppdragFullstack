const router = require('express').Router();
let Uppdrag = require('../models/uppdrag.models');

router.route('/').get((req, res) => { //http request, hämtar data om uppdrag
    Uppdrag.find()
    .then(uppdrag => res.json(uppdrag)) //skcikar tillbaka uppdrag i json format
    .catch(err => res.status(400).json('Error: ' + err)); //skickar tillbaka error
});


router.route('/add').post((req, res) => { 
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newUppdrag = new Uppdrag({ //skapa nytt uppdrag
        username,
        description,
        duration,
        date,
    });

    newUppdrag.save() //spara den i databas 
    .then(() => res.json('Uppdrag tillagd!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Uppdrag.findById(req.params.id) //hittar uppdrag genom ID
    .then(uppdrag => res.json(uppdrag)) // returnera uppdrag
    .catch(err => res.status(400).json('Error:' + err)); // retunera err
});

router.route('/:id').delete((req, res) => { //tar id från URL 
    Uppdrag.findByIdAndDelete(req.params.id) //hittar och tar bort från databas
    .then(() => res.json('Uppdrag borttagen.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { //hittar genom id i url
    Uppdrag.findById(req.params.id)
    .then(uppdrag => {
        uppdrag.username = req.body.username; //uppdaterar namn
        uppdrag.description = req.body.description; //uppdaterar description
        uppdrag.duration = Number(req.body.duration); //uppdaterar tid
        uppdrag.username = Date.parse(req.body.date); //uppdaterar datum

        uppdrag.save() //Sparar uppdateringarna
        .then(() => res.json('Uppdrag Uppdaterad!')) //Gick igenom
        .catch(err => res.status(400).json('Error: ' + err));//error
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;