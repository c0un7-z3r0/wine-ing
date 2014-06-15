///**
// * Sorting the table on click
// */
//
//function deleteWine(wineId) {
//
//	var jsonObj = {
//		'action' : 'delete',
//		'id' : wineId
//	};
//
//	$.getJSON('routing', jsonObj).done(function(json) {
//		getAllWine();
//	}).fail(function(jqxhr, textStatus, error) {
//		var err = textStatus + ", " + error;
//		console.log("Request Failed: " + err);
//	});
//
//}
//
//// function addWine() {
//	// var name = $('.input.Name').val();
//	// var art = $('.input.Art').val();
//	// var region = $('.input.Region').val();
//	// var winzer = $('.input.Winzer').val();
//	// var typ = $('.input.Typ').val();
//	// var preis = $('.input.Preis').val();
//  //
//	// if (name === "") {
//	// 	$('.content').html("Name ist Leer!");
//	// 	return;
//	// }
//	// if (preis === "") {
//	// 	preis = 0;
//	// }
//  //
//	// $.getJSON('WineController', {
//	// 	'action' : 'add',
//	// 	'name' : name,
//	// 	'art' : art,
//	// 	'region' : region,
//	// 	'winzer' : winzer,
//	// 	'typ' : typ,
//	// 	'preis' : preis
//  //
//	// }).done(function(json) {
//	// 	$.each(json.messages, function(index, item) {
//	// 		$('.content').html(item['message']);
//	// 	});
//  //
//	// }).fail(function(jqxhr, textStatus, error) {
//	// 	var err = textStatus + ", " + error;
//	// 	console.log("Request Failed: " + err);
//	// });
//
//// }
//
//function includePage(pageName) {
//	$('.content').load(pageName);
//}
//
//// function getAllWine(view, addToTemplate) {
////
//// 	request('getAll', 'wineList', '', true, function(json) {
//// 		if (addToTemplate == true || typeof addToTemplate === 'undefined') {
//// 			$('.content').html(showWineTable(json, view));
//// 		} else {
//// 			return json;
//// 		}
//// 	});
//// }
//
//// function searchWine() {
////
//// 	var searchTerm = $('.searchTerm').val();
//// 	if (searchTerm == "") {
//// 		return;
//// 	}
//// 	var obj = {
//// 		search : searchTerm,
//// 		searchType : 'wine'
//// 	};
////
//// 	request('search', 'search', obj, false, function(json) {
//// 		$('.content').html(showWineTable(json));
//// 	});
//// }
//
//// function editWine(wineId) {
//// 	var searchTerm = wineId;
//// 	if (searchTerm == "") {
//// 		return;
//// 	}
////
//// 	var obj = {
//// 		search : searchTerm,
//// 		searchType : 'wine'
//// 	};
////
//// 	request('search', 'search', obj, false, function(json) {
//// 		request('getAllSpecific', 'specific', '', true, function(jsonContent) {
//// 			$('.content').html(showWineForm(json, 'wine', jsonContent));
//// 		});
//// 	});
//// }
//
//function filterList() {
//	var filters = cache['filtersActive'];
//	// filters.art = $('.artDropdown').val();
//	// filters.region = $('.regionDropdown').val();
//	// filters.winzer = $('.winzerDropdown').val();
//	// filters.typ = $('.typDropdown').val();
//	// filters.preis = $('.preisDropdown').val();
//
//	var searchResult = [];
//
//	var wineList = '';
//
//	if (cache['getAll/wineList']) {
//		wineList = cache['getAll/wineList'];
//	}
//
//	$.each(wineList.json.ArrayList, function(key, wine) {
//		if (filters.length === 0) {
//			searchResult.push(wine);
//		} else {
//			var check = [];
//
//			$.each(wine, function(m, wineValue) {
//
//				$.each(filters, function(k, filter) {
//					console.log(wineValue + ' = ' + filter);
//					if (filter === wineValue) {
//						check.push(wine)
//						console.log('found match');
//					}
//
//				});
//
//			});
//			if (check.length === filters.length) {
//				searchResult.push(wine);
//			}
//		}
//	});
//	generateFromTemplate('wineTableCostumer', searchResult);
//
//}
//
//// function saveEditWine(id) {
//// 	var name = $('.input.Name').val();
//// 	var art = $('.input.Art').val();
//// 	var region = $('.input.Region').val();
//// 	var winzer = $('.input.Winzer').val();
//// 	var typ = $('.input.Typ').val();
//// 	var preis = $('.input.Preis').val();
////
//// 	if (name === "") {
//// 		$('.content').html("Name ist Leer!");
//// 		return;
//// 	}
//// 	if (preis === "") {
//// 		preis = 0;
//// 	}
////
//// 	var obj = {
//// 		'id' : id,
//// 		'name' : name,
//// 		'art' : art,
//// 		'region' : region,
//// 		'winzer' : winzer,
//// 		'typ' : typ,
//// 		'preis' : preis
//// 	};
////
//// 	request('editWine', '', obj, false, function(json) {
//// 		// $('.content').html(showWineForm(json, 'wine', jsonContent));
//// 	});
////
//// 	// $.getJSON('WineController', {
//// 	// 'action' : 'editWine',
//// 	// 'id' : id,
//// 	// 'name' : name,
//// 	// 'art' : art,
//// 	// 'region' : region,
//// 	// 'winzer' : winzer,
//// 	// 'typ' : typ,
//// 	// 'preis' : preis
//// 	//
//// 	// }).done(function(json) {
//// 	// $.each(json.messages, function(index, item) {
//// 	// $('.content').html(item['message']);
//// 	// });
//// 	//
//// 	// }).fail(function(jqxhr, textStatus, error) {
//// 	// var err = textStatus + ", " + error;
//// 	// console.log("Request Failed: " + err);
//// 	// });
////
//// }
//// function wineForm() {
////
//// 	request('getAllSpecific', 'specifics', '', true, function(json) {
//// 		$('.content').html(showWineForm(json));
//// 	});
//// 	//
//// 	// $.getJSON('routing', {
//// 	// action : 'getAllSpecific'
//// 	// }).done(function(json) {
//// 	// $('.content').html(showWineForm(json));
//// 	// }).fail(function(jqxhr, textStatus, error) {
//// 	// var err = textStatus + ", " + error;
//// 	// console.log("Request Failed: " + err);
//// 	// });
////
//// }
//
//// function getAllSpecific() {
//// 	$.getJSON('WineController', {
//// 		action : "getAllSpecific"
//// 	}).done(function(json) {
//// 		$('.content').html(showSpecificTable(json));
////
//// 	}).fail(function(jqxhr, textStatus, error) {
//// 		var err = textStatus + ", " + error;
//// 		console.log("Request Failed: " + err);
//// 	});
//// }
//// function saveSpecific() {
//// 	var categories = $('.category.input');
//// 	var name = $('.inputname');
//// 	var jsonName = '"name":"' + name.val() + '"';
////
//// 	if (categories !== '') {
//// 		var jsonCat = '"categories": [';
////
//// 		var pos = 0;
//// 		$.each(categories, function(key, value) {
//// 			if (pos !== 0) {
//// 				jsonCat += ',';
//// 			}
//// 			jsonCat += '"' + $(value).val() + '"';
//// 			pos++;
//// 		});
//// 		jsonCat += ']';
////
//// 		var json = '{' + jsonName + ',' + jsonCat + '}';
//// 	} else {
//// 		var json = '{' + jsonName + '}';
////
//// 	}
////
//// 	console.log(json);
////
//// }
//
//function addToBasket(id) {
//	var storage = sessionStorage.getItem('wine_cart');
//	var wineObj = {
//		id : id,
//		total : 1
//	};
//	var newWine = true;
//	if (storage === null) {
//		var jsObj = {};
//		jsObj.wineList = [];
//	} else {
//		var jsObj = JSON.parse(storage);
//		$.each(jsObj.wineList, function(key, value) {
//			if (value.id === wineObj.id) {
//				value.total++;
//				newWine = false;
//			}
//		});
//	}
//
//	if (newWine) {
//		jsObj.wineList.push(wineObj);
//	}
//	sessionStorage.setItem('wine_cart', JSON.stringify(jsObj));
//
//}
//function getBasket() {
//	var storage = sessionStorage.getItem('wine_cart');
//	generateFromTemplate('basketTable', storage)
//
//
//
//}
