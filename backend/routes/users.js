const router = require('express').Router();
let User = require('../models/user.models');

router.route('/').get((req, res) => { // vår första route som haterar http get request från /users url
    User.find()
    .then(users => res.json(users)) //resultaten hämtas i json format
    .catch(err => res.status(400).json('Error: ' + err)); //visar error
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username}); //sparar den nya användaren

    newUser.save()  //när den är sparad, ger den respons om den är sparad elr error
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;