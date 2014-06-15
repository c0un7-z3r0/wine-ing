var Templater = function(template, obj, otherObj, callback){
    this.jsonObj = obj;
	this.otherObj = otherObj;
	this.templateName = template;
	this.template = null;

	var that = this;

    $.get("template/" + this.templateName + ".html?3221", function(response) {
      that.template = response;
		if(that.templateName === 'wineTable'){
			var finished =  new WineTable({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if(that.templateName === 'cartTable'){
			var finished =  new CartTable({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if(that.templateName === 'wineTableCostumer'){
			var finished =  new WineTableCostumer({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		if(that.templateName === 'wineForm'){
			var finished =  new WineForm({
				template : that.template,
				data : that.jsonObj,
				otherData : that.otherObj
			}).compileIt();
		}
		callback(finished);

	});

};
