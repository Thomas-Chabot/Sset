var path = require('path');
var express=require('express');
var app = express();
const ROOT = "./public";

app.use(express.static(ROOT));

app.listen(2406,function(){console.log("Express server listening on port 2406");});
