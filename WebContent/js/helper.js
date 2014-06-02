var oderOfElemInForm = [ 'Name', 'Region' ];
//function generateWineTable(json) {
//	var template;
//	$.get("template/wineTable.html", function(respons) {
//	     var $template = $(respons);
//	     $template[0].innerHtml = $template.html().replace(/%%NAME%%/g, 'TEST');
//	     $('.content').html($template.html().replace(/%%NAME%%/g, 'TEST'));
//
//	});
//	
//}
function generateWineTable(json) {

	var table = '<table class="wineTable">';
	var headRow = '<thead><tr>'
			+ '<th onclick="sortIt(this,\'string\')" >Name</th>'
			+ '<th onclick="sortIt(this,\'string\')" >Kind</th>'
			+ '<th onclick="sortIt(this,\'string\')" >Region</th>'
			+ '<th onclick="sortIt(this,\'string\')" >Winemaker</th>'
			+ '<th onclick="sortIt(this,\'string\')">Type</th>'
			+ '<th onclick="sortIt(this,\'number\')">Price</th>' + '</tr>'
			+ '</thead>' + '<tbody>';
	table += headRow;
	$
			.each(
					json.ArrayList,
					function(index, item) {
						var row = '<tr>';
						// row += '<td>' + item['id'] + '</td>';
						row += '<td>' + decodeURIComponent(item['name'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['kind'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['region'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['winemaker'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['type'])
								+ '</td>';
						row += '<td>' + decodeURIComponent(item['price'])
								+ '&euro;' + '</td>';
						row += '<td><input type="button" value="edit wine" name="edit" onclick="editWine(\''
								+ item['id'] + '\')" /></td> ';
						row += '<td><input type="button" value="delete wine" name="delete" onclick="deleteWine(\''
								+ item['id'] + '\')" /></td> ';
						row += '</tr>';

						table += row;
					});
	table += '</tbody></table>';
	return table;
}

function tableSort(sorter) {
	$('tbody tr').sort(sorter).appendTo('tbody');
	invert = !invert;

}
var invert = false;

function sortIt(elem, type) {
	var search = 0;
	var tableHeads = $('th');
	/**
	 * find the column which needs sorting
	 */
	$.each(tableHeads, function(k, v) {
		if ($.trim($(v).text()).toLowerCase() == $(elem).text().toLowerCase()
				.toLowerCase()) {
			search = k + 1;
		}
	});

	tableSort(function(a, b) {
		if (type == "string") {
			var a = $(a).find('td:nth-child(' + search + ')').text();
			var b = $(b).find('td:nth-child(' + search + ')').text();
		}
		if (type == "number") {
			var a = parseFloat(
					$(a).find('td:nth-child(' + search + ')').text(), 10);
			var b = parseFloat(
					$(b).find('td:nth-child(' + search + ')').text(), 10);
		}

		if (a == b)
			return 0;
		if (invert) {
			return a > b ? -1 : 1;

		} else {
			return a > b ? 1 : -1;
		}

	});
};

function generateWineForm(json, content) {
//	var fromElem = [];
	var $form = $(document.createElement('form'));
	var $table = $(document.createElement('table'));

	var tableRows = {};
	$.each(json.ArrayList, function(key, value) {
		var fieldName = value.name;
		var dropdownOptions = [];
		if (typeof value.categories !== 'undefined') {
			$.each(value.categories, function(k, content) {
				dropdownOptions.push(content);
			});
			if (typeof content === 'undefined') {
				tableRows[fieldName] = createSelectField(fieldName, fieldName,
						dropdownOptions);
			} else {
				tableRows[fieldName] = createSelectField(fieldName, fieldName,
						dropdownOptions, content['ArrayList'][0][fieldName.toLowerCase()]);
			}
		} else {
			if (typeof content === 'undefined') {
				tableRows[fieldName] = createInputField(fieldName, fieldName);
			} else {
				tableRows[fieldName] = createInputField(fieldName, fieldName, content['ArrayList'][0][fieldName.toLowerCase()]);
			}
		}

	});

	$.each(oderOfElemInForm, function(key, value) {
		console.log(value);
		$table.append(tableRows[value]);

	});
	var submitBtn = $(document.createElement('input'));

	submitBtn.attr('name', 'save');
	submitBtn.attr('type', 'button');
	if (typeof content !== 'undefined') {
		// submitBtn.attr('onclick', 'updateWine(\''
		// + content['wineList'][0]['id'] + '\')');
		submitBtn.prop('disabled', true);
	} else {
		// submitBtn.attr('onclick', 'addWine()');
		submitBtn.prop('disabled', true);
	}
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

// function generateWineForm(json, content) {
// var formElem = [];
//
// var $form = $(document.createElement('form'));
// var $table = $(document.createElement('table'))
//
// if (typeof content !== 'undefined') {
// $table.append(createInputField('Name', 'name',
// content['wineList'][0]['name']));
// } else {
// $table.append(createInputField('Name', 'name'));
// }
// $.each(json.formElements, function(key, items) {
// var formElemName = {};
// formElemName = items[0];
//
// var elements = [];
// $.each(items, function(k, data) {
// if (items[0] !== data)
// elements.push(data);
// });
// formElem[formElemName] = elements;
// });
// for ( var key in formElem) {
// if (typeof content !== 'undefined') {
// $table.append(createSelectField(key, key, formElem[key],
// content['wineList'][0][key]));
// } else {
// $table.append(createSelectField(key, key, formElem[key]));
// }
//
// }
// if (typeof content !== 'undefined') {
//
// $table.append(createInputField('Price', 'price',
// content['wineList'][0]['price']));
// } else {
// $table.append(createInputField('Price', 'price'));
//
// }
// var submitBtn = $(document.createElement('input'));
//
// submitBtn.attr('name', 'save');
// submitBtn.attr('type', 'button');
// if (typeof content !== 'undefined') {
// submitBtn.attr('onclick', 'updateWine(\''
// + content['wineList'][0]['id'] + '\')');
// } else {
// submitBtn.attr('onclick', 'addWine()');
//
// }
// submitBtn.addClass('saveBtn');
// submitBtn.val('Save');
//
// var cancelBtn = $(document.createElement('input'));
// cancelBtn.attr('name', 'cancel');
// cancelBtn.attr('type', 'reset');
// cancelBtn.addClass('cancelBtn');
// cancelBtn.val('Cancel');
//
// $form.append($table);
// $form.append(submitBtn);
// $form.append(cancelBtn);
//
// return $form;
// }

