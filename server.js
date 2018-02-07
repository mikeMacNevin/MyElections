var express = require("express");
var path = require('path');
//var handlebars = require('handlebars');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine','hbs');



app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
    res.render('home');
})



app.listen(app.get('port'), function() {
    console.log('server started ' +app.get('port'));
});



/* serves main page */
// app.get("/", function(req, res) {
//    res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// app.listen(5000);