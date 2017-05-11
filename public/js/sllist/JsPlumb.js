
var innerStroke = 'rgba(0, 0, 0, 1)';
var outerStroke = 'rgba(235, 235, 235, 1)';

const NODE_WIDTH = 10;
const NODE_HEIGHT = 10;

const ENDPOINT_SRC = {
	isSource:true,
	isTarget:false,
	connector: ["Straight"],
	endpointStyle:{ gradient : {stops:[[ 0, innerStroke ], [ 1, outerStroke ]], offset:17.5, innerRadius:3 }, radius:5},
    connectorOverlays: [
        [ "Arrow", { width:10, length:12, location:1, id:"arrow" } ]
    ]
};
const ENDPOINT_TARG = {
	isSource: false,
	isTarget: true,
	endpoint: ["Rectangle", {width: NODE_WIDTH, height: NODE_HEIGHT}],
	connector: ["Straight"],
	maxConnections: -1
}
const ANCHOR_SRC = ["Center"];
const ANCHOR_TARG = ["Left"];

const DRAG_OPTS = {
	containment: true,
}

function Plumbify (item, typ){
	this.item = item;
	this.src  = item.getElem();
	this.addEndpoint (this.src, typ);

	return this;
}

Plumbify.prototype.addEndpoint = function(elem, typ){
	var my = this;
	var cls = (typ === "target") ? ENDPOINT_TARG : ENDPOINT_SRC;
	var anchor = (typ === "target") ? ANCHOR_TARG : ANCHOR_SRC;

	jsPlumb.ready(function(){
		my.endpoint = jsPlumb.addEndpoint($(elem).attr("id"), { 
		  anchors: anchor
		}, cls);
	});
}

Plumbify.prototype.draggable = function(elem){
	jsPlumb.draggable ($(this.src)[0], DRAG_OPTS);
	return this;
}

Plumbify.prototype.getSource = function(){
	return this.src;
}


// static functions
function findPlumb (fromSrc){
	if (!fromSrc) return null;
	fromSrc = $(fromSrc);
	return Nodes.find(function(el){ return fromSrc.is(el.getSrc()); });
}


// event handlers
jsPlumb.bind("connection", function(evt){
	var src = evt.source;
	var p   = findPlumb (src);

	console.log(p, evt.target);
	p.setNext (evt.target);
});
jsPlumb.bind("connectionDetached", function(evt){
	var src = evt.source;
	var p   = findPlumb (src);
	p.setNext (null);
})

jsPlumb.ready(function(){
	jsPlumb.setContainer("question");
});