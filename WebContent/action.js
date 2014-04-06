/**
 * 
 */

function updateWine(wineId){
	var name = encodeURIComponent($('.name').val());
	var kind = encodeURIComponent($('.kind').val());
	var region = encodeURIComponent($('.region').val());
	var wineMaker = encodeURIComponent($('.winemaker').val());
	var wineType = encodeURIComponent($('.winetype').val());
	var price = encodeURIComponent($('.price').val());
	var jsonObj = {
			'updateWineInXML' : true,
			'wineId': wineId,
			'name' : name,
			'kind' : kind,
			'region' : region,
			'winemaker' : wineMaker,
			'type' : wineType,
			'price' : price

		};
		$.getJSON('routing', jsonObj).done(function(json) {
			$.each(json.messages, function(index, item) {
				$('.content').html(item['message']);
			});

		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});

	
}

function addWine() {
	var name = encodeURIComponent($('.name').val());
	var kind = encodeURIComponent($('.kind').val());
	var region = encodeURIComponent($('.region').val());
	var wineMaker = encodeURIComponent($('.winemaker').val());
	var wineType = encodeURIComponent($('.winetype').val());
	var price = encodeURIComponent($('.price').val());

	// var name = escape($('.name').val());
	// var kind = escape($('.kind').val());
	// var region = escape($('.region').val());
	// var wineMaker = escape($('.winemaker').val());
	// var wineType = escape($('.winetype').val());
	// var price = escape($('.price').val());
	var jsonObj = {
		'addWineToXML' : true,
		'name' : name,
		'kind' : kind,
		'region' : region,
		'winemaker' : wineMaker,
		'type' : wineType,
		'price' : price

	};
	$.getJSON('routing', jsonObj).done(function(json) {
		$.each(json.messages, function(index, item) {
			$('.content').html(item['message']);
		});

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

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
	$
			.each(
					json.wineList,
					function(index, item) {
						console.log(index + item['kind']);
						row = '<tr>';
						// row += '<td>' + item['id'] + '</td>';
						row += '<td>' + decodeURIComponent(item['name'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['kind'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['region'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['winemaker'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['winetype'])
								+ '</td>';
						row += '<td>' + (item['price']).toFixed(2) + '&euro;'
								+ '</td>';
						row += '<td><input type="button" value="edit wine" name="edit" onclick="editWine(\''
								+ item['id'] + '\')" /></td> ';
						row += '</tr>';

						table += row;
					});
	table += '</tbody></table>';
	return table;
}

function editWine(wineId) {
	console.log("Wine ID: " + wineId.toString());
	searchWineInternal(wineId.toString());

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
function createInputField(lableText, inputName, inputValue) {
	var $nameLable = $(document.createElement('lable'));
	$nameLable.attr('for', inputName);
	$nameLable.text(lableText + ": ");
	var $nameInput = $(document.createElement('input'));
	$nameInput.attr('type', 'text');
	$nameInput.attr('class', inputName);
	$nameInput.attr('id', inputName);
	if (inputValue != null) {
		// $nameInput.attr('value', inputValue);
		$nameInput.val(decodeURIComponent(inputValue));
	}
	var $inputTr = $(document.createElement('tr'));
	var $inputTdLable = $(document.createElement('td'));
	var $inputTdInput = $(document.createElement('td'));

	$inputTdLable.append($nameLable);
	$inputTdInput.append($nameInput);

	$inputTr.append($inputTdLable);
	$inputTr.append($inputTdInput);

	return $inputTr;
}

function createSelectField(lableText, selectName, options, selected) {
	var $selectLable = $(document.createElement('lable'));
	$selectLable.attr('for', selectName);
	$selectLable.text(lableText + ": ");

	var $select = $(document.createElement('select'));
	$select.attr('class', selectName);
	$select.attr('id', selectName);
	$(options).each(function() {
		var $option = $(document.createElement('option'));
		$option.val(decodeURIComponent(this.trim()));
		$option.text(decodeURIComponent(this));

		$select.append($option);
	});
	$select.val(decodeURIComponent(selected));
	var $inputTr = $(document.createElement('tr'));
	var $inputTdLable = $(document.createElement('td'));
	var $inputTdInput = $(document.createElement('td'));

	$inputTdLable.append($selectLable);
	$inputTdInput.append($select);

	$inputTr.append($inputTdLable);
	$inputTr.append($inputTdInput);

	return $inputTr;

}

function generateWineForm(json, content) {
	var formElem = [];

	var $form = $(document.createElement('form'));
	var $table = $(document.createElement('table'))

	if (typeof content !== 'undefined') {
		$table.append(createInputField('Name', 'name',
				content['wineList'][0]['name']));
	} else {
		$table.append(createInputField('Name', 'name'));
	}
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
		if (typeof content !== 'undefined') {
			$table.append(createSelectField(key, key, formElem[key],
					content['wineList'][0][key]));
		} else {
			$table.append(createSelectField(key, key, formElem[key]));
		}

	}
	if (typeof content !== 'undefined') {

		$table.append(createInputField('Price', 'price',
				content['wineList'][0]['price']));
	} else {
		$table.append(createInputField('Price', 'price'));

	}
	var submitBtn = $(document.createElement('input'));

	submitBtn.attr('name', 'save');
	submitBtn.attr('type', 'button');
	submitBtn.attr('onclick', 'updateWine(\''+content['wineList'][0]['id']+'\')');
	submitBtn.addClass('saveBtn');
	submitBtn.val('Save');

	var cancelBtn = $(document.createElement('input'));
	cancelBtn.attr('name', 'cancel');
	cancelBtn.attr('type', 'reset');
	cancelBtn.addClass('cancelBtn');
	cancelBtn.val('Cancel');

	$form.append($table);
	$form.append(submitBtn);
	$form.append(cancelBtn);

	return $form;
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
function searchWineInternal(searchTerm) {
	console.log(searchTerm);
	$.getJSON('routing', {
		searchWineForm : true,
		search : searchTerm
	}).done(function(json1) {

		$.getJSON('routing', {
			addWineForm : true
		}).done(function(json2) {
			$('.content').html(generateWineForm(json2, json1));
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}
function searchWine() {

	var searchTerm = $('.searchTerm').val();
	if (searchTerm == "") {
		return;
	}
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
