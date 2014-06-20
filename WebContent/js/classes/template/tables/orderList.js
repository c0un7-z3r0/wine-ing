var OrderList = function(opts) {
	this.$template = $(opts.template);
	this.data = opts.data;
	this.otherData = opts.otherData;

};
OrderList.prototype.compileIt = function() {
	
	
	
	var that = this;
	var wrapper = this.$template.clone();
	if(this.data.ArrayList.length === 0){
		return '<div>Keine Bestellungen vorhanden.</div>';
	}
	$.each(this.data.ArrayList, function(key, obj) {

		var container = that.$template.find('.dummyWell').clone();
		var grandTotal = 0;
		$.each(JSON.parse(obj.orderJson), function(k, v) {
			if(typeof v.username === 'undefined'){
			var tempClone = that.$template.find('.tableBody').clone().html();

			var wine = that.getWineFromId(v.wineId);
			// tempClone = tempClone.replace('%%ORDERNUMBER%%', 'tests');
			tempClone = tempClone.replace('%%NAME%%', decodeURIComponent(wine.name));
			tempClone = tempClone.replace('%%PRICE%%', wine.preis + '€');
			tempClone = tempClone.replace('%%AMOUNT%%', v.amount);
			tempClone = tempClone.replace('%%TOTALPRICE%%', (wine.preis
					* v.amount) + '€');
			tempClone = tempClone.replace('%%ORDERNUMBER%%', obj.orderNumber);

			grandTotal = (Math.round((+grandTotal + (+wine.preis* v.amount)) * 100)/100).toFixed(2);

			tempClone = $(tempClone).removeClass('dummy');

			container.find('.tableBody').append(tempClone);

			}
		});
		container = container.html().replace('%%ORDERNUMBER%%', obj.orderNumber);
		
		container = container.replace('%%GRANDTOTAL%%', grandTotal);
		container = container.replace('%%ORDERNUMBER%%', obj.orderNumber);

		var adress = JSON.parse(obj.orderJson).pop();
		container = container.replace('%%USERNAME%%', adress.username);
		container = container.replace('%%STREET%%', adress.street);
		container = container.replace('%%PLZ%%', adress.plz);
		container = container.replace('%%CITY%%', adress.city);
		container = container.replace('%%EMAIL%%', adress.email);

		var div = $(document.createElement('div'));
		div.addClass('well');
		div.append(container);
		div.append('');
		wrapper.append(div);
		
	});
	wrapper.find('.dummyWell').remove();
	wrapper.find('.dummy').remove();
	
	return wrapper;

};
OrderList.prototype.getWineFromId = function(wineId) {
	var returnWine = {};
	$.each(this.otherData, function(key, wine) {
		if (wine.id === wineId) {
			returnWine = wine
		}
	});
	return returnWine;
};