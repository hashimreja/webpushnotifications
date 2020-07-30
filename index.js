const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
const path = require('path');
app.use(express.static(path.join(__dirname,"public")));
const webpush = require('web-push');
const keys = require('./utils');

webpush.setVapidDetails('mailto:hashimreja2@gmail.com',keys.keys.publicKey,keys.keys.privateKey);

app.get('/test',(req,res) =>{
    res.json('hashim')
});
//creating a  subscribe post call which recieves subscription from front end
// and send the payload to client

app.post('/subscribe',(req,res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({title : "this is awesome dudee"});
    webpush.sendNotification(subscription,payload).catch(err => console.error(err));

})



app.listen(3000, () => {
    console.log('Listening on port 3000');
})






