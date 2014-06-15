var Cache = function Cache(){
	this.c = {};
	this.maxTime = 18000000;
};



Cache.prototype.get = function(action, name){
	this.checkTimeStamps();
	var objName = action + '/' + name;
	return this[objName] || false;
};

Cache.prototype.add = function(action, name, json){
	var objName = action + '/' + name;
	var obj = {};
	obj.json = json;
	obj.timestemp = (new Date).getTime();
	this['c'][objName] = obj;
};
Cache.prototype.checkTimeStamps = function(){
	var now = (new Date).getTime();

	$.each(this['c'], function(key, action) {
		var diff = now - action.timestemp;
		if (diff >= this['maxTime']) {
			this.not(action);
		}

	});
};
Cache.prototype.removeItem = function(itemName){

//	this['c'.not(this[itemName]);

};
