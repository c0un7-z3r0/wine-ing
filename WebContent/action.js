/**
 * 
 */

function addWine() {
	var name = $('.name').val();
	var kind = $('.kind').val();
	var region = $('.region').val();
	var wineMaker = $('.wineMaker').val();
	var wineType = $('.wineType').val();
	var price = $('.price').val();
	var jsonObj = {
		'addWineToXML' : true,
		'name' : name,
		'kind' : kind,
		'region' : region,
		'winemaker' : wineMaker,
		'type' : wineType,
		'price' : price

	};
	console.log(jsonObj);
	$.getJSON('routing', jsonObj).done(function(json) {

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

	// TODO: send to Routing

}

function includePage(pageName) {
	$('.content').load(pageName);
}
function generateWineTable(json) {
	var table = '<table class="wineTable">';
	var headRow = '<thead><tr>' + '<th>Name</th>' + '<th>Kind</th>'
			+ '<th>Region</th>' + '<th>Winemaker</th>' + '<th>Type</th>'
			+ '<th>Price</th>' + '</tr>' + '</thead>' + '<tbody>';
	table += headRow;
	$.each(json.wineList, function(index, item) {
		console.log(index + item['kind']);
		row = '<tr>';
		row += '<td>' + item['name'] + '</td>';
		row += '<td>' + item['kind'] + '</td>';
		row += '<td>' + item['region'] + '</td>';
		row += '<td>' + item['winemaker'] + '</td>';
		row += '<td>' + item['type'] + '</td>';
		row += '<td>' + (item['price']).toFixed(2) + '&euro;' + '</td>';
		row += '</tr>';

		table += row;
	});
	table += '</tbody></table>';
	return table;
}
function wineForm() {
	$.getJSON('routing', {
		addWineForm : true
	}).done(function(json) {
		$('.content').html(generateWineForm(json));
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

}

function generateWineForm(json) {
	var formElem = [];

	var form = '';
	form += '<table>';
	form += '<tr><td>Name:</td><td> <input class="name" type="text" name="name"></td></tr>';
	$.each(json.formElements, function(key, items) {
		var formElemName = {};
		formElemName = items[0];

		var elements = [];
		$.each(items, function(k, data) {
			if (items[0] !== data)
				elements.push(data);
		});
		formElem[formElemName] = elements;
	});
	for ( var key in formElem) {
		var select = '<tr><td>' + key + ':</td><td> <select class="' + key
				+ '" name="' + key + '">';
		for ( var value in formElem[key]) {
			select += '<option value="' + formElem[key][value] + '">'
					+ formElem[key][value] + '</option>';
		}
		select += '</select></td></tr>';
		form += select;
	}
	form += '<tr><td>Price:</td><td> <input class="price" type="text" name="price"></td></tr>';
	form += '<tr><td colspan="2"><input type="submit" value="Add" onClick="addWine()"/></td></tr>';
	form += '</table>';

	return form;
}

function getAllWine() {
	$.getJSON('routing', {
		getAllWine : true
	}).done(function(json) {
		$('.content').html(generateWineTable(json));
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}
function searchWine() {
	var searchTerm = $('.searchTerm').val();
	$.getJSON('routing', {
		searchWineForm : true,
		search : searchTerm
	}).done(function(json) {
		// TODO: add table sorting
		$('.content').html(generateWineTable(json));

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}
