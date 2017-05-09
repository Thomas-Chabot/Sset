function ElementArray(elements, objClass){
	this.elements    = [ ];
	this.ObjType     = objClass;

	this.init (elements);
}

ElementArray.prototype.init = function(elems){
	var eleArr = this;

	$(elems).each(function(i, d){
		var e = new eleArr.ObjType(d);
		eleArr.push (e);
	})
}

ElementArray.prototype.from = function (e){
	var elems = $(this.elements);
	var result = null;
	elems.each(function(i, r){
		var elem = r.getElem();
		if (elem.is(e)){
		  result = r;
		  return false;
		}
	});
	return result;
}

ElementArray.prototype.pushFromDOM = function(e){
	var newObj = new this.ObjType (e);
	this.elements.push (newObj);

	// normally pushing doesn't return. but in this case, it should
	return newObj;
}
ElementArray.prototype.push = function(newElem){
	this.elements.push (newElem);
}
ElementArray.prototype.each = function(f){
	$(this.elements).each(function(index, item){
		f(item);
	});
}
ElementArray.prototype.eachWithin = function(r, f){
	this.each(function(elem){
		if (DOM.contains(r, elem.getElem()))
			f(elem);
	})
}
ElementArray.prototype.get = function(i){
	return this.elements[i];
}

ElementArray.prototype.remove = function(data){
	for (var i in this.elements){
		if (this.elements[i] === data){
			this.elements.splice(i, 1);
			return true;
		}
	}
	return false;
}

ElementArray.prototype.add = function(elems){
	this.init (elems);
}


ElementArray.prototype.cleanup = function (){
	var array = this;
	array.each (function (elem){
		if (!(DOM.contains(elem)))
			array.remove (elem);
	});
}