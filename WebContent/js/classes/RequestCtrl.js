var RequestCtrl = function RequestCtrl() {


};

RequestCtrl.prototype.create = function (action, name, passThroughObj, cacheable, callback, forceCache) {
	var jsonObj = {};
	jsonObj.action = action;
	if (passThroughObj !== '') {
		$.each(passThroughObj, function (key, obj) {
			jsonObj[key] = obj;
		});
	}
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
			console.log("Request " + action + " Failed: " + err);
		});
	}
};