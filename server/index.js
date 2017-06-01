var express= require('express');
var app= express();
var dirSite= __dirname + "/../site";



app.set('port', process.env.PORT ||3000);


// 404 handler
app.use(function(req,res) {
    res.type('text/html'); 
    res.status(404);
    res.sendFile(dirSite + '/404.html'); 
});


// 500 handler
app.use(function(req,res) {
    console.error(err.stack);
    res.type('text/html'); 
    res.status(505);
    res.sendFile(dirSite + '/500.html'); 
});



app.listen(process.env.PORT || 3000, function(){
  console.log('Server is up');
});