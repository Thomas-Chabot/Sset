var path = require('path');
var pug  = require('pug');
var express=require('express');
var app = express();
const ROOT = "./public";

app.set('view engine', 'pug');
var ssetExercise = require("./modules/sset.js");
var ssetPug      = pug.compileFile("./views/sset/sset.pug");

app.get("/ssetExercise", function(req,res){
	res.status(200).send(ssetExercise.create(ssetPug));
});

app.use(express.static(ROOT));

app.listen(2406,function(){console.log("Express server listening on port 2406");});
