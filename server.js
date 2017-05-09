var path = require('path');
var pug  = require('pug');
var express=require('express');
var app = express();
const ROOT = "./public";

app.set('view engine', 'pug');

app.get("/:type/exercise", function(req,res){
	var exercise = require("./modules/" + req.params.type);
	var render   = pug.compileFile("./views/" + req.params.type + "/render.pug");
	res.status(200).send(exercise.create(render));
});

app.use(express.static(ROOT));

app.listen(2406,function(){console.log("Express server listening on port 2406");});
