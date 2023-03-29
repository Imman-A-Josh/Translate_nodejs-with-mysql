const translate = require('translate-google');

const User = require('../model/translate');

exports.newuser = (async (req, res) => {

    var user = new User({
        state: req.body.state,
        district: req.body.district,
        city: req.body.city,
        status: req.body.status || false
    });

    User.create(req.body,(req,res))
})


exports.getall = async (req, res) => {
   
    User.get(req.query.from, req.query.skip).then(async data => {
        
        translate(data.map(data =>  { return { id: data.id, city: data.city, state: data.state, district: data.district } }), { to: req.query.to })
            .then((DATA) => {
                res.status(201).send(DATA);
            })
            .catch((err) => {
                res.send('sorry ');
            });
    }).catch(err => res.status(400).send(err))



};