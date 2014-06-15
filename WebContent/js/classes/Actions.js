var Actions = function Actions() {


};
/**
 *  Searches the xml for the wine and prints the output as a table
 **/
Actions.prototype.searchWine = function () {
	var searchTerm = $('.searchTerm').val();

	var obj = {
		search: searchTerm,
		searchType: 'wine'
	};
	WineIng.request.create('search', 'search', obj, false, function (json) {
		if (json.ArrayList.length === 0) {
			$('.content').html('Konnte kein Wein mit"' + searchTerm + '" finden');

		} else {
			var templater = new Templater('wineTable', json, '', function (content) {
				$('.content').html(content);

			});
		}
	});
}

Actions.prototype.editWine = function (wineId) {
	var searchTerm = wineId;


	var obj = {
		search: searchTerm,
		searchType: 'wine'
	};

	WineIng.request.create('search', 'search', obj, false, function (wineContent) {
		WineIng.request.create('getAllSpecific', 'specific', '', true, function (specificContent) {
			var templater = new Templater('wineForm', specificContent, wineContent, function (content) {
				$('.content').html(content);

			});
		});
	});
}

Actions.prototype.saveWine = function (wineId) {
	var name = $('.input.Name').val();
	var art = $('.input.Art').val();
	var region = $('.input.Region').val();
	var winzer = $('.input.Winzer').val();
	var typ = $('.input.Typ').val();
	var preis = $('.input.Preis').val();
	preis = preis.replace(/[^\d.-]/g, '');
	if (name === "") {
		$('.content').html("Name ist Leer!");

	}
	if (preis === "") {
		preis = 0;
	}

	var obj = {
		'id': wineId,
		'name': name,
		'art': art,
		'region': region,
		'winzer': winzer,
		'typ': typ,
		'preis': preis
	};

	WineIng.request.create('editWine', '', obj, false, function (json) {
		WineIng.action.getAllWine('admin');

		console.log('done : ' + JSON.stringify(json));
	});
}
Actions.prototype.getWineForm = function (callback) {
	WineIng.request.create('getAllSpecific', 'specifics', '', true, function (json) {
		var templater = new Templater('wineForm', json, '', function (content) {
			$('.content').html(content);

		});
	});
}
Actions.prototype.getAllWine = function (view, callback) {


	if (view === 'admin') {
		WineIng.request.create('getAll', 'wineList', '', true, function (json) {
			var templater = new Templater('wineTable', json, '', function (content) {
				$('.content').html(content);

			});
		}, true);
	}
	else if (view === 'costumer') {
		WineIng.request.create('getAll', 'wineList', '', true, function (json) {
			var templater = new Templater('wineTableCostumer', json, '', function (content) {
				$('.content').html(content);

			});
		}, false);
	} else {
		WineIng.request.create('getAll', 'wineList', '', true, function (json) {
			if (typeof callback !== 'undefined') {
				callback(json);
			}
		}, false);

	}


}

//Actions.prototype.imageToBase64 = function(image, callback){
//	var files = [];
//
//	$.each(image[0].files, function(index, file) {
//		var reader = new FileReader();
//		reader.onload = function(event) {
//			object = {};
//			object.filename = file.name;
//			object.data = event.target.result;
//			files.push(object);
//			callback(files);
//		};
//		reader.readAsDataURL(file);
//	});
//};

Actions.prototype.addWine = function () {
	var name = $('.input.Name').val();
	var art = $('.input.Art').val();
	var region = $('.input.Region').val();
	var winzer = $('.input.Winzer').val();
	var typ = $('.input.Typ').val();
	var preis = $('.input.Preis').val();
	preis = preis.replace(/[^\d.-]/g, '');
//	var image = $('.imageUpload')
	if (name === "") {
		$('.content').html("Name ist Leer!");
		return;
	}
	if (preis === "") {
		preis = 0;
	}
//	this.imageToBase64(image, function(files){
		var data = {
			'name': name,
			'art': art,
			'region': region,
			'winzer': winzer,
			'typ': typ,
			'preis': preis
		};

		WineIng.request.create('add', '', data, false, function (json) {
			WineIng.action.getAllWine('admin');
			console.log('done : ' + JSON.stringify(json));

		});




//	});

};

Actions.prototype.deleteWine = function (wineId) {
	var data = {
		'id': wineId
	};
	WineIng.request.create('delete', '', data, false, function (json) {
		WineIng.action.getAllWine('admin');
		console.log('done : ' + JSON.stringify(json));


	});


};

Actions.prototype.filterList = function filterList(wineList) {
	var filters = WineIng.cache.c.filtersActive;


	var searchResult = [];

	var wineList = '';


	if (WineIng['cache']['c']['getAll/wineList']) {
		wineList = WineIng['cache']['c']['getAll/wineList'];
	}

	$.each(wineList.json.ArrayList, function (key, wine) {
		if (filters.length === 0) {
			searchResult.push(wine);
		} else {
			var check = [];
			$.each(filters, function (k, filter) {
				if(typeof filter.min !== 'undefined'){
					if(wine.price > filter.min && wine.price < filter.max){
						check.push(wine)
					}
				}

			});
			$.each(wine, function (m, wineValue) {
				var insert = false;
				$.each(filters, function (k, filter) {
					if (filter === wineValue) {
						check.push(wine)
					}

				});

			});
			if (check.length === filters.length) {
				searchResult.push(wine);
			}
		}
	});

	var data = {};
	data.ArrayList = searchResult;
	return data;
	

};


