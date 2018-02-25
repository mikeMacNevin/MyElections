
var express = require('express');

var app = express();
var path = require('path');
var bodyParser = require('body-parser');



app.use(express.static(__dirname + '/public'));



app.set('view engine', 'html');



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


  
 

app.listen(3000);





// app.use(function(req, res, next) {  
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


// if (app.get('env') === 'development') {  
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// app.use(function(err, req, res, next) {  
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

















// var express = require("express");
// var path = require('path');
// var handlebars = require('handlebars');
// var bodyParser = require('body-parser');
// var hbs = require('express-handlebars');

// var app = express();


// app.set('views', path.join(__dirname, 'views'));
// app.engine('hbs', hbs({extname: '.hbs', defaultLayout: 'main'}));
// app.set('view engine','hbs');



// app.set('port', (process.env.PORT || 3000));

// app.get('/', function(req, res) {
//     res.render('home');
// })



// app.listen(app.get('port'), function() {
//     console.log('server started ' +app.get('port'));
// });


// app.get('/', function(req, res) {
//     res.sendFile("views/index.html");
// });


// app.listen(app.get('port'), function() {
//     console.log('server started ' +app.get('port'));
// });







/* serves main page */
// app.get("/", function(req, res) {
//    res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// app.listen(5000);