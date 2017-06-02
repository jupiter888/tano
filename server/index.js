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
app.get('/', function(req,res) {
        res.render('home');
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