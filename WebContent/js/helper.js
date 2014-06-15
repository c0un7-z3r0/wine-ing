//
///**
// * "Compiles" a template
// *
// * @param templateName
// * @param obj
// * @param divToReplace
// *            (standart is .content)
// * @returns will add the template to the div
// */
//function generateFromTemplate(templateName, obj, divToReplace, otherObj) {
//	if ((typeof divToReplace === 'undefined') || divToReplace === '') {
//		divToReplace = '.content';
//	}
//
//	$.get("template/" + templateName + ".html", function(respons) {
//		// get the template
//		var $template = $(respons);
//
//		/**
//		 * Generate a wine table from Template
//		 */
//		if (templateName === 'wineTable') {
//
//			var $tableRow = $template.find('.tableRow');
//			var tableRowHtml = $tableRow.html();
//			$tableRow.remove();
//			var $tableBody = $template.find('.tableBody');
//
//			// replace each placeholder
//			$.each(obj, function(key, wine) {
//				var newTr = tableRowHtml.replace(/%%NAME%%/g, wine.name);
//				newTr = newTr.replace(/%%KIND%%/g, wine.art);
//				newTr = newTr.replace(/%%REGION%%/g, wine.region);
//				newTr = newTr.replace(/%%MAKER%%/g, wine.winzer);
//				newTr = newTr.replace(/%%TYPE%%/g, wine.typ);
//				newTr = newTr.replace(/%%PRICE%%/g, wine.preis + '€');
//				newTr = newTr.replace(/%%ID%%/g, wine.id);
//
//				// add the new table row to the table body
//				$tableBody.append("<tr>" + newTr + "</tr>");
//			});
//
//		}else if(templateName === 'wineTableCostumer'){
//			if(typeof cache.filters === 'undefined'){
//				var filters = generateFilters(obj);
//				cache.filters = filters;
//			}
//			$.each(cache.filters, function(key, filter){
////				filter.change(function(){
////					filterList($(this).find('select').val());
////				});
//				$template.siblings('.filters').append(filter);
//			});
//
//			var $tableRow = $template.find('.tableRow');
//			var tableRowHtml = $tableRow.html();
//			$tableRow.remove();
//			var $tableBody = $template.find('.tableBody');
//
//			// replace each placeholder
//			$.each(obj, function(key, wine) {
//				var newTr = tableRowHtml.replace(/%%NAME%%/g, wine.name);
//				newTr = newTr.replace(/%%KIND%%/g, wine.art);
//				newTr = newTr.replace(/%%REGION%%/g, wine.region);
//				newTr = newTr.replace(/%%MAKER%%/g, wine.winzer);
//				newTr = newTr.replace(/%%TYPE%%/g, wine.typ);
//				newTr = newTr.replace(/%%PRICE%%/g, wine.preis + '€');
//				newTr = newTr.replace(/%%ID%%/g, wine.id);
//
//				// add the new table row to the table body
//				$tableBody.append("<tr>" + newTr + "</tr>");
//			});
//		}
//		/**
//		 * Generate the wine specifics table from Template
//		 */
//		else if (templateName === 'specificTable') {
//
//			var $tableRow = $template.find('.tableRow');
//			var tableRowHtml = $tableRow.html();
//			$tableRow.remove();
//			var $tableBody = $template.find('.tableBody');
//
//			// replace each placeholder
//			$.each(obj, function(key, specific) {
//				var categories = 'none';
//				console.log(specific);
//				var newTr = tableRowHtml.replace(/%%NAME%%/g, specific.name);
//				// if it has categeories then add them to a string and
//				// add them to the table otherwise it shows "none"
//				if (typeof specific.categories !== 'undefined') {
//					$.each(specific.categories, function(key, value) {
//						if (categories === 'none') {
//							categories = value;
//						} else {
//							categories += ',' + value;
//						}
//					});
//				}
//				// add the categories to the table otherwise it shows "none"
//				newTr = newTr.replace(/%%CATEGORIES%%/g, categories);
//				// add the new table row to the table body
//				$tableBody.append("<tr>" + newTr + "</tr>");
//
//			});
//		}
//		/**
//		 * Generate the wine form which is used to add a new wine or change a
//		 * wine or change specifics
//		 */
//		else if (templateName === 'wineForm') {
//			var $inputForm = $template.find('.inputForm');
//			var $textbox = $template.find('.textboxWrapper');
//			var textboxTemplate = $textbox.html();
//			$textbox.remove();
//			var $dropdown = $template.find('.dropdownWrapper');
//			var $newDropdown = $dropdown;
//			$dropdown.remove();
//			var dropdownTemplate = $dropdown.html();
//
//
//
//			var sortedObj = [];
//
//			// sort the elements in the form according to the array
//			// set in the beginning of the document
//			$.each(oderOfElemInForm, function(k, v) {
//				$.each(obj, function(index, value) {
//					if (v === value.name) {
//						sortedObj.push(value);
//					}
//				});
//			});
//
//			// replace the placeholder
//			$.each(sortedObj, function(index, item) {
//				// if the obj doesnt have categories assume it is a input field
//				// text
//				if (typeof item.categories === 'undefined') {
//					var text = '';
//					if (typeof otherObj !== 'undefined') {
//						text = findInArray(otherObj, item.name.toLowerCase());
//					}
//					var newTextBox = textboxTemplate.replace(/%%NAME%%/g,
//							item.name);
//					newTextBox = newTextBox.replace(/%%VALUE%%/g, text);
//					$inputForm.append(newTextBox);
//				}
//				// otherwise it is a dropdown
//				else {
//					var $newDropdown = $(dropdownTemplate.replace(/%%NAME%%/g,
//							item.name));
//
//					$.each(item.categories, function(k, v) {
//						$newDropdown.find('.actualDropdown').append(
//								$('<option>', {
//									value : v
//								}).text(v));
//					});
//					if (typeof otherObj !== 'undefined') {
//						var selected = findInArray(otherObj, item.name
//								.toLowerCase());
//						$newDropdown.find('.actualDropdown').find('option')
//								.each(function(i, opt) {
//									if (opt.value === selected)
//										$(opt).attr('selected', 'selected');
//								});
//					}
//					if (typeof otherObj !== 'undefined') {
//						$.each(otherObj, function(i, opt){
//							$template.find('.button.save').attr('onclick','saveEditWine("'+opt.id+'")');
//						});
//					}else{
//						$template.find('.button.save').attr('onclick','addWine()');
//					}
//
//					$inputForm.append($newDropdown);
//				}
//
//			});
//
//		}else if(templateName === 'specificForm') {
//			$.each(obj, function(key, value){
//				$template.find('.textbox.inputname').val(value.name);
//				var categories = $template.find('.textboxes.category');
//				if(typeof value.categories !== 'undefined'){
//					$.each(value.categories, function(k,item){
//						var categoryDiv = addInputField(true, item);
//						categories.append(categoryDiv);
//
//					});
//				}
//			});
//		}
//		// add "compiled" template to website
//		$('.content').html($template.html(obj.name));
//
//
//	});
//
//}
//
//
//
//function generateFilters(objList){
//	var filters = [];
//	var $inputField = $(document.createElement('input'));
//
//	var $dropdown = $(document.createElement('select'));
//
//
//	var name = [];
//	var art = [];
//	var region = [];
//	var winzer = [];
//	var typ = [];
//	var preis = [];
//
//
//	$.each(objList, function(key, obj){
//		name.push(obj.name);
//		art.push(obj.art);
//		region.push(obj.region);
//		winzer.push(obj.winzer);
//		typ.push(obj.typ);
//		preis.push(obj.preis);
//
//	});
//	art = checkForDoubles(art);
//	region = checkForDoubles(region);
//	winzer = checkForDoubles(winzer);
//	typ = checkForDoubles(typ);
////	checkForDoubles(preis);
//
//
//
//	filters.push(createCheckbox('Art', 'artDropdown', art, ''));
//	filters.push(createCheckbox('Region', 'regionDropdown', region, ''));
//	filters.push(createCheckbox('Winzer', 'winzerDropdown', winzer, ''));
//	filters.push(createCheckbox('Typ', 'typDropdown', typ, ''));
////	filters.push(createSelectField('Preis', 'preis', preis, ''));
//
//
//
//
//
//	return filters;
//}
//cache.filtersActive =[];
//function filterNow(filter){
//
//	if(filter.checked){
//		if(cache.filtersActive.indexOf(filter.value) == -1){
//			cache.filtersActive.push(filter.value);
//
//		}
//	}else{
//		cache.filtersActive.splice(cache.filtersActive.indexOf(filter.value), 1);
//	}
//	filterList();
//
//}
//
//
//
//
//function createCheckbox(lableText, selectName, values, selected){
//	var parent = $(document.createElement('div'));
//	var $labels = $(document.createElement('lable'));
//	$labels.text(lableText );
//	parent.append($labels);
//
//	$.each(values, function(key, value){
//		var div =  $(document.createElement('div'));
//
//		var $label = $(document.createElement('lable'));
//		$label.attr('for', selectName);
//		$label.text(value );
//
//		var $checkbox = $(document.createElement('input'));
//		$checkbox.attr('type', 'checkbox');
//		$checkbox.attr('name', selectName);
//		$checkbox.attr('value', value);
//		$checkbox.attr('id', key);
//		$checkbox.change(function(){
//			filterNow(this);
//		});
//
//
//
//
//
//
//		div.append($checkbox);
//		div.append($label);
//		parent.append(div);
//	});
//	return parent;
//
//}
//function createInputField(lableText, inputName, inputValue) {
//	var $nameLable = $(document.createElement('lable'));
//	$nameLable.attr('for', inputName);
//	$nameLable.text(lableText + ": ");
//	var $nameInput = $(document.createElement('input'));
//	$nameInput.attr('type', 'text');
//	$nameInput.attr('class', inputName);
//	$nameInput.attr('id', inputName);
//	if (inputValue !== null) {
//		// $nameInput.attr('value', inputValue);
//		$nameInput.val(decodeURIComponent(inputValue));
//	}
//	var $inputTr = $(document.createElement('tr'));
//	var $inputTdLable = $(document.createElement('td'));
//	var $inputTdInput = $(document.createElement('td'));
//
//	$inputTdLable.append($nameLable);
//	$inputTdInput.append($nameInput);
//
//	$inputTr.append($inputTdLable);
//	$inputTr.append($inputTdInput);
//
//	return $inputTr;
//}
//
//function checkForDoubles(list){
//	var newList = [];
//	$.each(list,function(key, value){
//		if($.inArray(value, newList) === -1){
//			newList.push(value);
//		}
//	});
//	return newList;
//}
//

//
//function showWineTable(json, view) {
//
//	var wineList = jsonToWine(json);
//	if(typeof view === 'undefined' || view === null || view === ''){
//		generateFromTemplate('wineTable', wineList);
//	}else{
//		generateFromTemplate('wineTableCostumer', wineList);
//	}
//
//}
//
//function showSpecificTable(json) {
//	var list = jsonToSpecific(json);
//
//	generateFromTemplate('specificTable', list);
//
//}
//function showSpecificsForm(json, type, content) {
//	if (json === '') {
//		generateFromTemplate('specificForm', '', '');
//	}else{
//		var list = jsonToSpecific(json);
//		generateFromTemplate('specificForm', list);
//	}
//
//}
//
//function showWineForm(json, type, content) {
//	var list = jsonToSpecific(json);
//
//	if (type === 'wine') {
//		var wineList = jsonToWine(content);
//		generateFromTemplate('wineForm', list, '', wineList);
//	} else if (type === 'specifics') {
//		var specificsList = jsonToSpecific(content);
//		generateFromTemplate('wineForm', list, '', specificsList);
//	} else {
//		generateFromTemplate('wineForm', list);
//	}
//}
//
//
///**
// * generates a array of specifics objects
// *
// * @param json
// * @returns {Array}
// */
//function jsonToSpecific(json) {
//	var specifics = [];
//
//	$.each(json.ArrayList, function(index, item) {
//		var specific = {};
//		var categories = [];
//		console.log(item.name);
//		specific.name = item.name;
//
//		if (typeof item.categories !== 'undefined') {
//			$.each(item.categories, function(key, value) {
//				categories.push(value);
//			});
//			specific.categories = categories;
//		}
//		specifics.push(specific);
//	});
//	console.log(specifics);
//	return specifics;
//}
//
///**
// * generates a array of wine objects
// *
// * @param json
// * @returns {array}
// */
//function jsonToWine(json) {
//	var wineList = [];
//	$.each(json.ArrayList, function(index, item) {
//		var wine = {};
//		wine.id = decodeURIComponent(item['id']);
//		wine.name = decodeURIComponent(item['name']);
//		wine.art = decodeURIComponent(item['art']);
//		wine.region = decodeURIComponent(item['region']);
//		wine.winzer = decodeURIComponent(item['winzer']);
//		wine.typ = decodeURIComponent(item['typ']);
//		wine.preis = decodeURIComponent(item['preis']);
//		wineList.push(wine);
//	});
//	return wineList;
//}
//
//
//
//function tableSort(sorter) {
//	$('tbody tr').sort(sorter).appendTo('tbody');
//	invert = !invert;
//
//}
//var invert = false;
//
//function sortIt(elem, type) {
//	var search = 0;
//	var tableHeads = $('th');
//
//	$.each(tableHeads, function(k, v) {
//		if ($.trim($(v).text()).toLowerCase() === $(elem).text().toLowerCase()
//				.toLowerCase()) {
//			search = k + 1;
//		}
//	});
//
//	tableSort(function(a, b) {
//		if (type === "string") {
//			var a = $(a).find('td:nth-child(' + search + ')').text();
//			var b = $(b).find('td:nth-child(' + search + ')').text();
//		}
//		if (type === "number") {
//			var a = parseFloat(
//					$(a).find('td:nth-child(' + search + ')').text(), 10);
//			var b = parseFloat(
//					$(b).find('td:nth-child(' + search + ')').text(), 10);
//		}
//
//		if (a === b)
//			return 0;
//		if (invert) {
//			return a > b ? -1 : 1;
//
//		} else {
//			return a > b ? 1 : -1;
//		}
//
//	});
//};
//
//function generateWineForm(json, content) {
//	// var fromElem = [];
//	var $form = $(document.createElement('form'));
//	var $table = $(document.createElement('table'));
//
//	var tableRows = {};
//	$.each(json.ArrayList, function(key, value) {
//		var fieldName = value.name;
//		var dropdownOptions = [];
//		if (typeof value.categories !== 'undefined') {
//			$.each(value.categories, function(k, content) {
//				dropdownOptions.push(content);
//			});
//			if (typeof content === 'undefined') {
//				tableRows[fieldName] = createSelectField(fieldName, fieldName,
//						dropdownOptions);
//			} else {
//				tableRows[fieldName] = createSelectField(fieldName, fieldName,
//						dropdownOptions, content['ArrayList'][0][fieldName
//								.toLowerCase()]);
//			}
//		} else {
//			if (typeof content === 'undefined') {
//				tableRows[fieldName] = createInputField(fieldName, fieldName);
//			} else {
//				tableRows[fieldName] = createInputField(fieldName, fieldName,
//						content['ArrayList'][0][fieldName.toLowerCase()]);
//			}
//		}
//
//	});
//
//	$.each(oderOfElemInForm, function(key, value) {
//		console.log(value);
//		$table.append(tableRows[value]);
//
//	});
//	var submitBtn = $(document.createElement('input'));
//
//	submitBtn.attr('name', 'save');
//	submitBtn.attr('type', 'button');
//	if (typeof content !== 'undefined') {
//		// submitBtn.attr('onclick', 'updateWine(\''
//		// + content['wineList'][0]['id'] + '\')');
//		submitBtn.prop('disabled', true);
//	} else {
//		// submitBtn.attr('onclick', 'addWine()');
//		submitBtn.prop('disabled', true);
//	}
//	submitBtn.addClass('saveBtn');
//	submitBtn.val('Save');
//
//	var cancelBtn = $(document.createElement('input'));
//	cancelBtn.attr('name', 'cancel');
//	cancelBtn.attr('type', 'reset');
//	cancelBtn.addClass('cancelBtn');
//	cancelBtn.val('Cancel');
//
//	$form.append($table);
//	$form.append(submitBtn);
//	$form.append(cancelBtn);
//
//	return $form;
//
//}
//function createSelectField(lableText, selectName, options, selected) {
//	var $selectLable = $(document.createElement('lable'));
//	$selectLable.attr('for', selectName);
//	$selectLable.text(lableText + ": ");
//
//	var $select = $(document.createElement('select'));
//	$select.attr('class', selectName);
//	$select.attr('id', selectName);
//	$(options).each(function() {
//		var $option = $(document.createElement('option'));
//		$option.val(this.trim());
//		$option.text(this);
//
//		$select.append($option);
//	});
//	$select.val(decodeURIComponent(selected));
//	var $inputDiv = $(document.createElement('div'));
//	var $inputDivLable = $(document.createElement('div'));
//	var $inputDivInput = $(document.createElement('div'));
//	$inputDivInput.attr('class', 'dropdownFilter');
//
//	$inputDivLable.append($selectLable);
//	$inputDivInput.append($select);
//
//	$inputDiv.append($inputDivLable);
//	$inputDiv.append($inputDivInput);
//
//	return $inputDiv;
//
//}
//function createInputField(lableText, inputName, inputValue) {
//	var $nameLable = $(document.createElement('lable'));
//	$nameLable.attr('for', inputName);
//	$nameLable.text(lableText + ": ");
//	var $nameInput = $(document.createElement('input'));
//	$nameInput.attr('type', 'text');
//	$nameInput.attr('class', inputName);
//	$nameInput.attr('id', inputName);
//	if (inputValue !== null) {
//		// $nameInput.attr('value', inputValue);
//		$nameInput.val(decodeURIComponent(inputValue));
//	}
//	var $inputTr = $(document.createElement('tr'));
//	var $inputTdLable = $(document.createElement('td'));
//	var $inputTdInput = $(document.createElement('td'));
//
//	$inputTdLable.append($nameLable);
//	$inputTdInput.append($nameInput);
//
//	$inputTr.append($inputTdLable);
//	$inputTr.append($inputTdInput);
//
//	return $inputTr;
//}
//
//
//function addInputField(returnIt, content){
//
//	var textboxesDiv = $('.textboxes');
//
//	var $div = $(document.createElement('div'));
//	$div.attr('class', 'textbox');
//
//	var $nameInput = $(document.createElement('input'));
//	$nameInput.attr('type', 'text');
//	$nameInput.attr('class', 'category input');
//
//	if(typeof content !== 'undefined'){
//		$nameInput.val(content);
//	}
//
//
//	var $icon = $(document.createElement('i'));
//	$icon.attr('class','fa fa-minus-circle fa-1x');
//	$icon.attr('onclick', 'removeInputField(this)')
//	$icon.attr('title', 'delete category');
//
//	$div.append($icon);
//	$div.append($nameInput);
//	if(typeof returnIt === 'undefined' || !returnIt ){
//		textboxesDiv.append($div);
//	}else{
//		return $div;
//	}
//
//}
//
//function removeInputField(elem){
//	elem.parentElement.remove();
//}
//
//
//
//
//
//
//
//
//
//
//
//
//// function generateWineForm(json, content) {
//// var formElem = [];
////
//// var $form = $(document.createElement('form'));
//// var $table = $(document.createElement('table'))
////
//// if (typeof content !== 'undefined') {
//// $table.append(createInputField('Name', 'name',
//// content['wineList'][0]['name']));
//// } else {
//// $table.append(createInputField('Name', 'name'));
//// }
//// $.each(json.formElements, function(key, items) {
//// var formElemName = {};
//// formElemName = items[0];
////
//// var elements = [];
//// $.each(items, function(k, data) {
//// if (items[0] !== data)
//// elements.push(data);
//// });
//// formElem[formElemName] = elements;
//// });
//// for ( var key in formElem) {
//// if (typeof content !== 'undefined') {
//// $table.append(createSelectField(key, key, formElem[key],
//// content['wineList'][0][key]));
//// } else {
//// $table.append(createSelectField(key, key, formElem[key]));
//// }
////
//// }
//// if (typeof content !== 'undefined') {
////
//// $table.append(createInputField('Price', 'price',
//// content['wineList'][0]['price']));
//// } else {
//// $table.append(createInputField('Price', 'price'));
////
//// }
//// var submitBtn = $(document.createElement('input'));
////
//// submitBtn.attr('name', 'save');
//// submitBtn.attr('type', 'button');
//// if (typeof content !== 'undefined') {
//// submitBtn.attr('onclick', 'updateWine(\''
//// + content['wineList'][0]['id'] + '\')');
//// } else {
//// submitBtn.attr('onclick', 'addWine()');
////
//// }
//// submitBtn.addClass('saveBtn');
//// submitBtn.val('Save');
////
//// var cancelBtn = $(document.createElement('input'));
//// cancelBtn.attr('name', 'cancel');
//// cancelBtn.attr('type', 'reset');
//// cancelBtn.addClass('cancelBtn');
//// cancelBtn.val('Cancel');
////
//// $form.append($table);
//// $form.append(submitBtn);
//// $form.append(cancelBtn);
////
//// return $form;
//// }
//
