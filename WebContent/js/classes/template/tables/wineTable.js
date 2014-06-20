var WineTable = function (opts) {
	this.template = opts.template;
	this.data = opts.data;
	this.otherData = opts.otherData;
}

WineTable.prototype.compileIt = function () {
	//get template table row to replace
	var $tableRow = $(this.template).find('.tableRow');
	var tableRowHtml = $tableRow.html();
	//get table body to add new rows
	var $tableBody = $(this.template).find('.tableBody');

	// replace each placeholder
	$.each(this.data, function (key, array) {
		$.each(array, function(k, wine){
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
	var newTemplate = $(this.template);
	newTemplate.find('.tableBody').html($tableBody.html());
	//remove the dummy div
	newTemplate.find('.dummy').remove();
	newTemplate.find('table').attr('cellspacing',0);
	newTemplate.find('table').attr('cellpadding', 0);
	return newTemplate;
}
