const express = require('express');
const app = express();
const config = require('../config');

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


// eslint-disable-next-line
const PORT = 8080;

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
    try {
        const {lat, lng } = req.body.location;
        const forecast = await axios.get(`https://api.darksky.net/forecast/${config.DARKSKY_KEY}/${lat},${lng}`);
        const address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.GMAP_KEY}`);
        
        return res.send({forecast: forecast.data, address: address.data}); 
    } catch (err) {
        console.log("err", err);
    }
})

app.post('/geo', async (req, res) => {
    const inputAddress = req.body.location;

    const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${config.GMAP_KEY}`);
    console.log(location.data);
    const {lat, lng } = location.data.results[0].geometry.location;

    const address = location.data.results[0].formatted_address
    
    const forecast = await axios.get(`https://api.darksky.net/forecast/${config.DARKSKY_KEY}/${lat},${lng}`);
    return res.send({forecast: forecast.data, address});
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

