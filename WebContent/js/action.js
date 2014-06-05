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
	var name = $('.input.Name').val();
	var art = $('.input.Art').val();
	var region = $('.input.Region').val();
	var winzer = $('.input.Winzer').val();
	var typ = $('.input.Typ').val();
	var preis = $('.input.Preis').val();

	if (name === "") {
		$('.content').html("Name ist Leer!");
		return;
	}
	if (preis === "") {
		preis = 0;
	}

	
	$.getJSON('WineController', {
		'action' : 'add',
		'name' : name,
		'art' : art,
		'region' : region,
		'winzer' : winzer,
		'typ' : typ,
		'preis' : preis

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

		$('.content').html(showWineTable(json));

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
		search : searchTerm,
		searchType : 'wine'
	}).done(function(json) {

		$('.content').html(showWineTable(json));

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}

function editSpecific(specificsName) {
	var searchTerm = specificsName;
	if (searchTerm == "") {
		return;
	}
	$.getJSON('routing', {
		action : 'search',
		search : searchTerm,
		searchType : 'specific'
	}).done(function(jsonContent) {
		$('.content').html(showSpecificsForm(jsonContent, 'specific'));

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
		search : searchTerm,
		searchType : 'wine'
	}).done(function(jsonContent) {

		$.getJSON('routing', {
			action : 'getAllSpecific'
		}).done(function(json) {
			$('.content').html(showWineForm(json, 'wine', jsonContent));
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}
function saveEditWine(id){
	
}
function wineForm() {
	$.getJSON('routing', {
		action : 'getAllSpecific'
	}).done(function(json) {
		$('.content').html(showWineForm(json));
	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});

}

function getAllSpecific() {
	$.getJSON('WineController', {
		action : "getAllSpecific"
	}).done(function(json) {
		$('.content').html(showSpecificTable(json));

	}).fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}
function saveSpecific() {
	var categories = $('.category.input');
	var name = $('.inputname');
	var jsonName = '"name":"' + name.val() + '"';

	if (categories !== '') {
		var jsonCat = '"categories": [';

		var pos = 0;
		$.each(categories, function(key, value) {
			if (pos !== 0) {
				jsonCat += ',';
			}
			jsonCat += '"' + $(value).val() + '"';
			pos++;
		});
		jsonCat += ']';

		var json = '{' + jsonName + ',' + jsonCat + '}';
	} else {
		var json = '{' + jsonName + '}';

	}

	console.log(json);

}