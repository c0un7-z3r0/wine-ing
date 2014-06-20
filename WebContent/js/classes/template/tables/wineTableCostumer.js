var WineTableCostumer = function (opts) {
	this.$template = $(opts.template);
	this.data = opts.data;
	this.otherData = opts.otherData;
	if (typeof WineIng.cache.c.filtersActive === 'undefined') {
		WineIng.cache.c.filtersActive = [];
	}

};
WineTableCostumer.prototype.compileIt = function () {

	//if filters already exist use them
	if (typeof WineIng.cache.c.filters === 'undefined') {
		var filters = this.generateFilters(this.data);
		WineIng.cache.c.filters = filters;
	}

	var that = this;


	var $tableRow = this.$template.find('.tableRow');
	var tableRowHtml = $tableRow.html();
	var $tableBody = this.$template.find('.tableBody');
	if (WineIng.cache.c.filtersActive.length > 0) {
		this.data = WineIng.action.filterList(this.data);
	}
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
	
	//add all the filters to template
	$.each(WineIng.cache.c.filters, function (key, filter) {
		$.each(filter.children().siblings('.singleFilter').find('.filterCheckBox'), function (k, filterVal) {
			$.inArray(WineIng.cache.c.filtersActive, $(filterVal).val());
		});

		var div = $(document.createElement('div'));
		div.addClass('filter');
		div.append(filter);
		newTemplate.find('.filters').append(div);
	});
	newTemplate.find('.dummy').remove();

	var temp = "";
	$.each(newTemplate, function (k, obj) {
		temp += $(obj).html();
	});
	
	//add the filters which are already active
	$.each(WineIng.cache.c.filtersActive, function (key, value) {
		var $div = $(document.createElement('div'));
		$div.attr('class', 'activeFilter');

		var $i = $(document.createElement('i'));
		$i.attr('class', 'fa fa-times-circle')


		var $link = $(document.createElement('a'));
		$link.attr('href', '#');
		$link.on('click', function () {
			console.log(this);
			that.filterNow(this);
		});
		$link.addClass('filterLinkActive');
		$link.text(value);

		//on click remove it
		$i.on('click', function () {
			console.debug('[wineTableCostumer] compileIt: clicked on filterNow to remove the Link');
			that.filterNow($link);
		});
		$div.append($i);

		$div.append($link);
		newTemplate.find('.activeFilters').append($div);

	});
	$.each(newTemplate.find('.filterLink'), function (key, div) {

		if ($.inArray(div.text, WineIng.cache.c.filtersActive) > -1) {
			$(div).parent().css('display', 'none');
		} else {
			$(div).parent().css('display', 'inherit');

		}


	});
	newTemplate.find('.cartBadge').text(WineIng.cart.getTotal());
	return newTemplate;
};

/**
 * generate from wineList the possible filters
 * @param objList
 * @returns {Array}
 */
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

	filters.push(this.createLink('Art', art));
	filters.push(this.createLink('Region', region));
	filters.push(this.createLink('Winzer', winzer));
	filters.push(this.createLink('Typ', typ));

	return filters;

};

/**
 * check if there are any double entries in the list
 * @param list
 * @returns {Array}
 */
WineTableCostumer.prototype.checkForDoubles = function (list) {
	var newList = [];
	$.each(list, function (key, value) {
		if ($.inArray(value, newList) === -1) {
			newList.push(value);
		}
	});
	return newList;
};

/**
 * create the link for the filters 
 * @param name
 * @param values
 * @returns
 */
WineTableCostumer.prototype.createLink = function (name, values) {

	var $parent = $(document.createElement('div'));
	var $labels = $(document.createElement('lable'));
	$labels.text(name);
	$labels.prepend('<i class="fa fa-filter"></i>   ');
	$parent.append($labels);

	var that = this;
	$.each(values, function (key, value) {
		var $childDiv = $(document.createElement('div'));
		$childDiv.addClass('singleFilter');

		var $link = $(document.createElement('a'));
		$link.attr('href', '#');
		$link.on('click', function () {
			console.debug('[WineTableCostumer] createLink: clicked filterNow');
			that.filterNow(this);
		});
		$link.addClass('filterLink');
		$link.text(value);
		$childDiv.append($link);
		$parent.append($childDiv);


	});
	return $parent;

};


/**
 * function to filter the wineList
 */
WineTableCostumer.prototype.filterNow = function filterNow(filter) {

	//if wine doesnt exists in active filters add it
	if (WineIng.cache.c.filtersActive.indexOf($(filter).text()) == -1) {
		WineIng.cache.c.filtersActive.push($(filter).text());

	} else { //remove it now
		var index = WineIng.cache.c.filtersActive.indexOf($(filter).text());
		WineIng.cache.c.filtersActive.splice(index, 1);
	}

	//do the filtering
	var data = WineIng.action.filterList();
	//add it to the wineTableCostumer
	new Templater('wineTableCostumer', data, '', function (content) {
		$('.content').html(content);

	});
};

