/**
 * Generate the template
 */
var Templater = function(template, obj, otherObj, callback) {
	this.jsonObj = obj;
	this.otherObj = otherObj;
	this.templateName = template;
	this.template = null;
	var that = this;
	if (typeof this.jsonObj.ArrayList !== 'undefined') {
		// decode every value
		$.each(this.jsonObj.ArrayList,function(key, obj) {
			$.each(obj,	function(k, value) {
					if(typeof value === 'object'){
						$.each(value, function(ke, val){
							that['jsonObj']['ArrayList'][key][k][ke] = decodeURIComponent(val);

						});
					}else{
						that['jsonObj']['ArrayList'][key][k] = decodeURIComponent(value);
					}
				});

		});
	}else{
		$.each(this.jsonObj,function(key, obj) {
			$.each(	obj.wine,function(k, value) {
					that['jsonObj'][key]['wine'][k] = decodeURIComponent(value);
				});

		});
	}
	var that = this;

	$.get("template/" + this.templateName + ".html?3221", function(response) {
		that.template = response;
		if (that.templateName === 'wineTable') {
			var finished = new WineTable({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if (that.templateName === 'cartTable') {
			var finished = new CartTable({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if (that.templateName === 'wineTableCostumer') {
			var finished = new WineTableCostumer({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if (that.templateName === 'wineForm') {
			var finished = new WineForm({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if (that.templateName === 'orderList') {
			var finished = new OrderList({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		callback(finished);

	});

};
