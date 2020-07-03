const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/', (req, res) => { 
 res.send("<h1>Home page</h1>");
});
app.get('/photos', (req, res) => {
    axios.get('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=00ac5f70d662304b87e7da585bbdef9d&gallery_id=72157713970734808&format=json&nojsoncallback=1')
     .then(response => {
       res.send(response.data);
     });
   });
app.listen(3000, () => {
 console.log('server started on port 3000');
});