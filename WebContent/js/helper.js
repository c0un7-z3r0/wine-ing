var oderOfElemInForm = [ 'Name', 'Region', 'Maker' ];

/**
 * "Compiles" a template
 * @param templateName
 * @param obj
 * @param divToReplace (standart is .content)
 * @returns will add the template to the div
 */
function generateFromTemplate(templateName, obj, divToReplace, otherObj) {
	if((typeof divToReplace === 'undefined') ||divToReplace === ''){
		divToReplace = '.content';
	}

	$.get("template/" + templateName + ".html", function(respons) {
		//get the template
		var $template = $(respons);
		
		/**
		 * Generate a wine table from Template
		 */
		if (templateName === 'wineTable') {

			var $tableRow = $template.find('.tableRow');
			var tableRowHtml = $tableRow.html();
			$tableRow.remove();
			var $tableBody = $template.find('.tableBody');
			
			//replace each placeholder
			$.each(obj, function(key, wine) {
				var newTr = tableRowHtml.replace(/%%NAME%%/g, wine.name);
				newTr = newTr.replace(/%%KIND%%/g, wine.kind);
				newTr = newTr.replace(/%%REGION%%/g, wine.region);
				newTr = newTr.replace(/%%MAKER%%/g, wine.maker);
				newTr = newTr.replace(/%%TYPE%%/g, wine.type);
				newTr = newTr.replace(/%%PRICE%%/g, wine.price + '€');
				newTr = newTr.replace(/%%ID%%/g, wine.id);

				//add the new table row to the table body
				$tableBody.append("<tr>" + newTr + "</tr>");
			});
			
		}
		/**
		 * Generate the wine specifics table from Template
		 */
		else if(templateName === 'specificTable'){

			var $tableRow = $template.find('.tableRow');
			var tableRowHtml = $tableRow.html();
			$tableRow.remove();
			var $tableBody = $template.find('.tableBody');
			
			//replace each placeholder
			$.each(obj, function(key, specific){
				var categories = 'none';
				console.log(specific);
				var newTr = tableRowHtml.replace(/%%NAME%%/g, specific.name);	
				//if it has categeories then add them to a string and 
				//add them to the table otherwise it shows "none"
				if(typeof specific.categories !== 'undefined'){
					$.each(specific.categories, function(key, value){
						if(categories === 'none'){
							categories = value;
						}else{
							categories += ',' + value;
						}
					});
				}
				//add the categories to the table otherwise it shows "none"
				newTr = newTr.replace(/%%CATEGORIES%%/g, categories);	
				//add the new table row to the table body
				$tableBody.append("<tr>" + newTr + "</tr>");

			});
		}
		/**
		 * Generate the wine form which is used to add a new wine
		 * or change a wine or change specifics
		 */
		else if(templateName === 'wineForm'){
			var $inputForm = $template.find('.inputForm');
			var $textbox = $template.find('.textboxWrapper');
            var textboxTemplate = $textbox.html();
            $textbox.remove();
			var $dropdown = $template.find('.dropdownWrapper');
			var $newDropdown = $dropdown;
			$dropdown.remove();
            var dropdownTemplate = $dropdown.html();
        	var sortedObj = [];

        	//sort the elements in the form according to the array
        	//set in the beginning of the document
        	$.each(oderOfElemInForm,function(k,v){
        		 $.each(obj, function(index, value){
        			 if(v === value.name){
        				 sortedObj.push(value);
        			 }
                 });
        	});
        	
           
        	//replace the placeholder
			$.each(sortedObj, function(index, item){
				//if the obj doesnt have categories assume it is a input field text
				if(typeof item.categories === 'undefined'){
					var text = findInArray(otherObj, item.name.toLowerCase()) ;
					var newTextBox = textboxTemplate.replace(/%%NAME%%/g,item.name);
                                        newTextBox = newTextBox.replace(/%%VALUE%%/g,text);
                                        $inputForm.append(newTextBox);
				}
				// otherwise it is a dropdown
				else{
					var $newDropdown = $(dropdownTemplate.replace(/%%NAME%%/g,item.name));
					var selected = findInArray(otherObj, item.name.toLowerCase()) ;

					$.each(item.categories, function(k, v) {   
						$newDropdown.find('.actualDropdown')
					          .append($('<option>', { value : v })
					          .text(v)); 
					});
					$newDropdown.find('.actualDropdown').find('option').each(function( i, opt ) {
					    if( opt.value === selected ) 
					        $(opt).attr('selected', 'selected');
					});
					$inputForm.append($newDropdown);
				}
				
				
			});
			
		}
		//add "compiled" template to website
		$('.content').html($template.html());

	});

}
function findInArray(haystack, needle){
	var returnValue = '';
	$.each(haystack, function(key, value){
		if(typeof value[needle] !== 'undefined'){
			returnValue = value[needle];
		}
	});
	return returnValue;
}

function showWineTable(json) {

	var wineList = jsonToWine(json);

	generateFromTemplate('wineTable', wineList);

}

function showSpecificTable(json){
	var list = jsonToSpecific(json);
	
	generateFromTemplate('specificTable', list);
	
}

function showWineForm(json, type, content) {
	var list = jsonToSpecific(json);
	
	if(type === 'wine'){
		var wineList = jsonToWine(content);
		generateFromTemplate('wineForm', list, '', wineList);
	}else if(type === 'specifics'){
		var specificsList = jsonToSpecific(content);
		generateFromTemplate('wineForm', list, '', specificsList);
	}else{
		generateFromTemplate('wineForm', list);
	}
}
/**
 * generates a array of specifics objects 
 * @param json
 * @returns {Array}
 */
function jsonToSpecific(json){
	var specifics = [];
	
	$.each(json.ArrayList, function(index, item){
		var specific = {};
		var categories = [];
		console.log(item.name);
		specific.name = item.name;
		
		if(typeof item.categories !== 'undefined'){
			$.each(item.categories, function(key, value){
				categories.push(value);
			});
			specific.categories = categories;
		}
		specifics.push(specific);
	});
	console.log(specifics);
	return specifics;
}

/**
 * generates a array of wine objects
 * @param json
 * @returns {array}
 */
function jsonToWine(json) {
	var wineList = [];
	$.each(json.ArrayList, function(index, item) {
		var wine = {};
		wine.id = decodeURIComponent(item['id']);
		wine.name = decodeURIComponent(item['name']);
		wine.kind = decodeURIComponent(item['kind']);
		wine.region = decodeURIComponent(item['region']);
		wine.maker = decodeURIComponent(item['winemaker']);
		wine.type = decodeURIComponent(item['type']);
		wine.price = decodeURIComponent(item['price']);
		wineList.push(wine);
	});
	return wineList;
}

function generateWineTables(json) {

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

	$.each(tableHeads, function(k, v) {
		if ($.trim($(v).text()).toLowerCase() === $(elem).text().toLowerCase()
				.toLowerCase()) {
			search = k + 1;
		}
	});

	tableSort(function(a, b) {
		if (type === "string") {
			var a = $(a).find('td:nth-child(' + search + ')').text();
			var b = $(b).find('td:nth-child(' + search + ')').text();
		}
		if (type === "number") {
			var a = parseFloat(
					$(a).find('td:nth-child(' + search + ')').text(), 10);
			var b = parseFloat(
					$(b).find('td:nth-child(' + search + ')').text(), 10);
		}

		if (a === b)
			return 0;
		if (invert) {
			return a > b ? -1 : 1;

		} else {
			return a > b ? 1 : -1;
		}

	});
};

function generateWineForm(json, content) {
	// var fromElem = [];
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
						dropdownOptions, content['ArrayList'][0][fieldName
								.toLowerCase()]);
			}
		} else {
			if (typeof content === 'undefined') {
				tableRows[fieldName] = createInputField(fieldName, fieldName);
			} else {
				tableRows[fieldName] = createInputField(fieldName, fieldName,
						content['ArrayList'][0][fieldName.toLowerCase()]);
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
	if (inputValue !== null) {
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

