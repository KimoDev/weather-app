const express = require('express');
const app = express();
const serverless = require('serverless-http');

const router = express.Router();

const DARKSKY_KEY = process.env.DARKSKY_KEY;
const GMAP_KEY = process.env.GMAP_KEY;

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/.netlify/functions/server', router);

router.get('/', (req, res) => {
    console.log("root hit");
    res.send({
        "hello": "hi world"
    })
})
router.post('/', async (req, res) => {
    try {
        const {lat, lng } = req.body.location;
        const forecast = await axios.get(`https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`);
        const address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAP_KEY}`);
        
        return res.send({forecast: forecast.data, address: address.data}); 
    } catch (err) {
        console.log("err", err);
    }
})

router.post('/geo', async (req, res) => {
    try {
        const inputAddress = req.body.location;
        const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${GMAP_KEY}`);
        console.log(location.data);
        const {lat, lng } = location.data.results[0].geometry.location;
    
        const address = location.data.results[0].formatted_address
        
        const forecast = await axios.get(`https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`);
        return res.send({forecast: forecast.data, address});
    } catch (err) {
        console.log("err", err)
    }
    
})


module.exports.handler = serverless(app);

