var WineTableCostumer = function (opts) {
	this.$template = $(opts.template);
	this.data = opts.data;
	this.otherData = opts.otherData;
	if(	typeof WineIng.cache.c.filtersActive === 'undefined'){
		WineIng.cache.c.filtersActive =[];
	}

};
WineTableCostumer.prototype.compileIt = function () {


	if(typeof WineIng.cache.c.filters === 'undefined'){
		var filters = this.generateFilters(this.data);
		WineIng.cache.c.filters = filters;
	}

	var that = this;



	var $tableRow = this.$template.find('.tableRow');
	var tableRowHtml = $tableRow.html();
	var $tableBody = this.$template.find('.tableBody');

	// replace each placeholder
	$.each(this.data, function (key, array) {
		$.each(array, function (k, wine) {

			var newTr = tableRowHtml.replace(/%%NAME%%/g, wine.name);
			newTr = newTr.replace(/%%KIND%%/g, wine.art);
			newTr = newTr.replace(/%%REGION%%/g, wine.region);
			newTr = newTr.replace(/%%MAKER%%/g, wine.winzer);
			newTr = newTr.replace(/%%TYPE%%/g, wine.typ);
			newTr = newTr.replace(/%%PRICE%%/g, wine.preis + '€');
			newTr = newTr.replace(/%%ID%%/g, wine.id);

			// add the new table row to the table body

			$tableBody.append("<tr>" + newTr + "</tr>");
		});
	});

	var newTemplate = this.$template;
	newTemplate.find('.tableBody').html($tableBody.html());
	$.each(WineIng.cache.c.filters, function (key, filter) {
		var div = $(document.createElement('div'));
		div.addClass('filter');
		div.append(filter);
		newTemplate.siblings('.filters').append(div);
	});
	newTemplate.find('.dummy').remove();

	//newTemplate.find('.dummy').remove();
	var temp = "";
	$.each(newTemplate, function(k, obj){
			temp += $(obj).html();
	});
	$.each(WineIng.cache.c.filtersActive, function(key, value){
		var div = $(document.createElement('div'));
		div.attr('class', 'activeFilter');
		div.append(value);
		newTemplate.siblings('.activeFilters').append(div);

	});
	return newTemplate;
};

WineTableCostumer.prototype.generateFilters = function (objList) {

	var filters = [];
	var $inputField = $(document.createElement('input'));

	var $dropdown = $(document.createElement('select'));

	var name = [];
	var art = [];
	var region = [];
	var winzer = [];
	var typ = [];
	var preis = [];

	$.each(objList.ArrayList, function (key, obj) {
		name.push(obj.name);
		art.push(obj.art);
		region.push(obj.region);
		winzer.push(obj.winzer);
		typ.push(obj.typ);
		preis.push(obj.preis);

	});
	art = this.checkForDoubles(art);
	region = this.checkForDoubles(region);
	winzer = this.checkForDoubles(winzer);
	typ = this.checkForDoubles(typ);
//	checkForDoubles(preis);

	filters.push(this.createCheckbox('Art', 'artDropdown', art, ''));
	filters.push(this.createCheckbox('Region', 'regionDropdown', region, ''));
	filters.push(this.createCheckbox('Winzer', 'winzerDropdown', winzer, ''));
	filters.push(this.createCheckbox('Typ', 'typDropdown', typ, ''));
//	filters.push(createSelectField('Preis', 'preis', preis, ''));

	return filters;

};

WineTableCostumer.prototype.checkForDoubles = function(list){
	var newList = [];
	$.each(list,function(key, value){
		if($.inArray(value, newList) === -1){
			newList.push(value);
		}
	});
	return newList;
};

WineTableCostumer.prototype.createCheckbox = function createCheckbox(lableText, selectName, values, selected){

	var parent = $(document.createElement('div'));
	var $labels = $(document.createElement('lable'));
	$labels.text(lableText );
	parent.append($labels);
	var that = this;
	$.each(values, function(key, value){
		var div =  $(document.createElement('div'));

		var $label = $(document.createElement('lable'));
		$label.attr('for', selectName);
		$label.text(value );

		var $checkbox = $(document.createElement('input'));
		$checkbox.attr('type', 'checkbox');
		$checkbox.attr('name', selectName);
		$checkbox.attr('value', value);
		$checkbox.attr('id', key);
		$checkbox.change(function(){
			console.log('change');
			that.filterNow(this);
		});

		div.append($checkbox);
		div.append($label);
		parent.append(div);
	});
	return parent;

};

WineTableCostumer.prototype.filterNow = function filterNow(filter){
var that = this;
	if(filter.checked){
		if(WineIng.cache.c.filtersActive.indexOf(filter.value) == -1){
			WineIng.cache.c.filtersActive.push(filter.value);

		}
	}else{
		WineIng.cache.c.filtersActive.splice(WineIng.cache.c.filtersActive.indexOf(filter.value), 1);
	}


	WineIng.action.filterList();

};

