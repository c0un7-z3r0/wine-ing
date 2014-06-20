var RequestCtrl = function RequestCtrl() {


};

/**
 * creates a request to the backend and calls the callback
 * @param action get,post
 * @param name 
 * @param passThroughObj object to passed to backend
 * @param cacheable if it should be placed in cache
 * @param callback 
 * @param forceCache forces to replace the cache
 */
RequestCtrl.prototype.create = function (action, name, passThroughObj, cacheable, callback, forceCache) {
	var jsonObj = {};
	jsonObj.action = action;
	
	if (passThroughObj !== '') {
		$.each(passThroughObj, function (key, obj) {
			jsonObj[key] = obj;
		});
	}
	console.log(jsonObj);
	//if the request is existing in cache
	var cacheObj = WineIng.cache.get(action, name);
	if (cacheObj && !forceCache) {
		callback(cacheObj.json);
	} else {
		$.getJSON('WineController', jsonObj).done(function (json) {
			if (cacheable) {
				WineIng.cache.add(action, name, json);
			}
			callback(json);
		}).fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.error("Request " + action + " Failed: " + err);
		});
	}
};