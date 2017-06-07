var express= require('express');
//automatically uses main as default layout 
var handlebars= require("express-handlebars").create({
    defaultLayout: "main"
});

var app= express();

app.engine("handlebars", handlebars.engine);
app.set("port",process.env.PORT || 3000);
app.set("view engine", "handlebars");

app.set('port', process.env.PORT ||3000);

//when getting home route, uses hbars engine to 
//render the view of home
//home page
app.get('/', function(req,res) {
        res.render('home');
});



//about page
app.get('/about', function(req,res) {
        res.render('about');
});

//beliefs
app.get('/beliefs', function(req,res) {
        res.render('beliefs');
});

//terms of service
app.get('/tos', function(req,res) {
        res.render('tos');
});

//privacy policy
app.get('/privacy', function(req,res) {
        res.render('privacy');
});

//donate
app.get('/donate', function(req,res) {
        res.render('donate');
});

//submissions
app.get('/submit', function(req,res) {
        res.render('submit');
});

//art
app.get('/art', function(req,res) {
        res.render('art');
});

//music
app.get('/music', function(req,res) {
        res.render('music');
});

//writings
app.get('/writings', function(req,res) {
        res.render('writings');
});

//education
app.get('/education', function(req,res) {
        res.render('education');
});

//events
app.get('/events', function(req,res) {
        res.render('events');
});

//contact
app.get('/contact', function(req,res) {
        res.render('contact');
});

//404
app.get('/404', function(req,res) {
        res.render('404');
});

//500
app.get('/500', function(req,res) {
        res.render('500');
});






//below is to map static assets for the theme i chose
app.use(
    '/assets/', 
    express.static(__dirname + "/public"));


// 404 handler
app.use(function(req,res) { 
    res.status(404);
    res.render('404'); 
});


// 500 handler
app.use(function(req,res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



app.listen(app.get("port"), function(){
  console.log(
           'Express Server is now started at: http://localhost:' +
        app.get('port') +
        '/ ; press ctrl-c to terminate or just throw the laptop in some water'
    );
});