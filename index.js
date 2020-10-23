var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");
var cors = require("cors");
var port = 8000;
var app = express();
var mongo_uri = "mongodb://vamsi:try2open@ds137596.mlab.com:37596/test-23";

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes'));
app.use(express.static('./uploads'));
mongoose.connect(mongo_uri, { useNewUrlParser: true }).
    then(() => console.log('Db Connection Successfull')).
    catch((err) => console.log('Error while connecting db', err));

app.listen(port, function (err) {
    if (err) {
        console.log('Error while listening server at port', port);
        return;
    }
    console.log('Server listening to port', port);
});