/**
 * The Cache...
 */
var Cache = function Cache(){
	//the holy cache
	this.c = {};
	//max time existing in cache
	this.maxTime = 18000000;
};


/**
 * get from the cache or it will return false
 * @param action
 * @param name
 * @returns {obj | Boolean}
 */
Cache.prototype.get = function(action, name){
	this.checkTimeStamps();
	var objName = action + '/' + name;
	return this[objName] || false;
};
/**
 * add the json to cache
 * @param action
 * @param name
 * @param json
 */
Cache.prototype.add = function(action, name, json){
	var objName = action + '/' + name;
	var obj = {};
	obj.json = json;
	obj.timestemp = (new Date).getTime();
	this['c'][objName] = obj;
};
/**
 * check if cache is old and trigger getting new one
 */
Cache.prototype.checkTimeStamps = function(){
	var now = (new Date).getTime();

	$.each(this['c'], function(key, action) {
		var diff = now - action.timestemp;
		if (diff >= this['maxTime']) {
			this.not(action);
		}

	});
};

