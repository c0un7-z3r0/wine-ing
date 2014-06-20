var CartTable = function (opts) {
	this.template = opts.template;
	this.data = opts.data;
	this.otherData = opts.otherData;
}

CartTable.prototype.compileIt = function () {
	//get template table row to replace
	var $tableRow = $(this.template).find('.tableRow');
	var tableRowHtml = $tableRow.html();
	//get table body to add new rows
	var $tableBody = $(this.template).find('.tableBody');
	var grandTotal = 0;
	// replace each placeholder
	$.each(this.data, function (key, array) {
		var newTr = tableRowHtml;

			newTr = newTr.replace(/%%NAME%%/g, array.wine.name);
			newTr = newTr.replace(/%%KIND%%/g, array.wine.art);
			newTr = newTr.replace(/%%REGION%%/g, array.wine.region);
			newTr = newTr.replace(/%%MAKER%%/g, array.wine.winzer);
			newTr = newTr.replace(/%%TYPE%%/g, array.wine.typ);
			newTr = newTr.replace(/%%PRICE%%/g, (Math.round((array.wine.preis) * 100)/100).toFixed(2) + '€');
			newTr = newTr.replace(/%%ID%%/g, array.wine.id);

		newTr = newTr.replace(/%%AMOUNT%%/g, array.amount);
		var totalCost =	(Math.round((array.wine.preis * array.amount) * 100)/100).toFixed(2);
		newTr = newTr.replace(/%%TOTALPRICE%%/g, totalCost + '€');
		grandTotal = (Math.round((+grandTotal + +totalCost) * 100)/100).toFixed(2);

		// add the new table row to the table body
		$tableBody.append("<tr>" + newTr + "</tr>");

	});
	var newTemplate = $(this.template);
	newTemplate.find('.tableBody').html($tableBody.html());
	//remove the dummy div
	newTemplate.find('.dummy').remove();
	//add the grandTotal to template
	newTemplate.find('.grandTotal').html(newTemplate.find('.grandTotal').html().replace(/%%GRANDTOTAL%%/g, grandTotal + '€'));
	return newTemplate;
}
