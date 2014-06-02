/**
 * Sorting the table on click
 */

function deleteWine(wineId) {

	var jsonObj = {
		'deleteWine' : true,
		'wineId' : wineId
	};

	$.getJSON('routing', jsonObj).done(function(json) {
		getAllWine();
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

}

function updateWine(wineId) {
	var name = encodeURIComponent($('.name').val());
	var kind = encodeURIComponent($('.kind').val());
	var region = encodeURIComponent($('.region').val());
	var wineMaker = encodeURIComponent($('.winemaker').val());
	var wineType = encodeURIComponent($('.winetype').val());
	var price = encodeURIComponent($('.price').val());
	var jsonObj = {
		'updateWineInXML' : true,
		'wineId' : wineId,
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
		getAllWine();
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

}

function addWine() {

	// var name = encodeURIComponent($('.name').val());
	//
	// var kind = encodeURIComponent($('.kind').val());
	// var region = encodeURIComponent($('.region').val());
	// var wineMaker = encodeURIComponent($('.winemaker').val());
	// var wineType = encodeURIComponent($('.winetype').val());
	// var price = encodeURIComponent($('.price').val());
	//
	// if (name === "") {
	// $('.content').html("Name is empty!");
	// return;
	// }
	// if (price === "") {
	// price = 0;
	// }
	// // var name = escape($('.name').val());
	// // var kind = escape($('.kind').val());
	// // var region = escape($('.region').val());
	// // var wineMaker = escape($('.winemaker').val());
	// // var wineType = escape($('.winetype').val());
	// // var price = escape($('.price').val());
	// var jsonObj = {
	// 'action' : "add",
	// 'name' : name,
	// 'kind' : kind,
	// 'region' : region,
	// 'winemaker' : wineMaker,
	// 'type' : wineType,
	// 'price' : price
	//
	// };

	var params = [];

	$.getJSON('WineController', {
		action : 'add',
		name : 'wineNaasdasdasdasdasdasdsame',
		kind : 'wineKind',
		region : 'wineregion',
		winemaker : 'winemaker',
		type : 'wineType',
		price : '323.12'
	}).done(function(json) {
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

function editWine(wineId) {
	searchWineInternal(wineId.toString());

}
function searchWineInternal(searchTerm) {
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

/* --------------------------------------------------------------------------------------------------------- */

function getAllWine() {
	$.getJSON('WineController', {
		action : "getAll"
	}).done(function(json) {
		console.log(json);

		$('.content').html(generateWineTable(json));

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
		action : 'search',
		search : searchTerm
	}).done(function(json) {

		$('.content').html(generateWineTable(json));

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}

function editWine(wineId) {
	var searchTerm = wineId;
	if (searchTerm == "") {
		return;
	}

	$.getJSON('routing', {
		action : 'search',
		search : searchTerm
	}).done(function(jsonContent) {

		$.getJSON('routing', {
			action : 'specific'
		}).done(function(json) {
			$('.content').html(generateWineForm(json, jsonContent));
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}

function wineForm() {
	$.getJSON('routing', {
		action : 'specific'
	}).done(function(json) {
		$('.content').html(generateWineForm(json));
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

}

function wineSpecificForm(){

}
