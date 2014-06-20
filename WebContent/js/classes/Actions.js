/**
 * Actions to interact with frontend and backend
 */
var Actions = function Actions() {

};

/**
 * not used anymore
 */
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

/**
 * Will get the wine to be edited through searching the wineId
 * it will fill the wineForm.html template and display it.
 * @param wineId
 */
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
};
/**
 * Saves the edidet wine in xml and then display the winetable
 * @param wineId
 */
Actions.prototype.saveWine = function (wineId) {
	var name = encodeURIComponent($('.input.Name').val());
	var art = encodeURIComponent($('.input.Art').val());
	var region = encodeURIComponent($('.input.Region').val());
	var winzer = encodeURIComponent($('.input.Winzer').val());
	var typ = encodeURIComponent($('.input.Typ').val());
	var preis = encodeURIComponent($('.input.Preis').val());
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
		console.info('done : ' + JSON.stringify(json));
	});
};

/**
 * gets the specifics and generates from wineForm.html the form
 */
Actions.prototype.getWineForm = function () {
	WineIng.request.create('getAllSpecific', 'specifics', '', true, function (json) {
		var templater = new Templater('wineForm', json, '', function (content) {
			$('.content').html(content);
		});
	});
}
/**
 * will get all wine and display them as a table
 * the view parameter tells the templater which template to use
 * either admin or costumer
 * @param view ('admin' | 'costumer')
 */
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

/**
 * adds the wine to the xml and returns the wineTable
 * @return wineTableTemplate
 */
Actions.prototype.addWine = function () {
	var name = encodeURIComponent($('.input.Name').val());
	var art = encodeURIComponent($('.input.Art').val());
	var region = encodeURIComponent($('.input.Region').val());
	var winzer = encodeURIComponent($('.input.Winzer').val());
	var typ = encodeURIComponent($('.input.Typ').val());
	var preis = $('.input.Preis').val();
	preis = preis.replace(/[^\d.-]/g, '');
	if (name === "") {
		$('.content').html("Name ist Leer!");
		return;
	}
	if (preis === "") {
		preis = 0;
	}
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
			console.info('[Actions] adding wine: ' + JSON.stringify(json));

		});


};
/**
 * will delete the wine with the wineId given as parameter
 * @param wineId
 */
Actions.prototype.deleteWine = function (wineId) {
	var data = {
		'id': wineId
	};
	WineIng.request.create('delete', '', data, false, function (json) {
		WineIng.action.getAllWine('admin');
		console.info('[Actions] deleteing wine: ' + JSON.stringify(json));
	});


};
/**
 * Is used to filter the costumer winelist
 * @param wineList
 * @returns data (filtered wine list)
 */
Actions.prototype.filterList = function filterList(wineList) {
	
	var filters = WineIng.cache.c.filtersActive;
	var searchResult = [];
	var wineList = '';

	//if we cached already the winelist then use it
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
Actions.prototype.getOrders = function(){

	WineIng.request.create('getOrders', '', '', false, function (json) {
		WineIng.action.getAllWine('', function (wineList) {
			wines = wineList.ArrayList;
			var templater = new Templater('orderList', json, wines, function (content) {
				$('.content').html(content);

			});
		});
	});
};
Actions.prototype.generateOrderList = function(){
	var cartList = WineIng.cart.getCartList();
	var adress = {
			username: $('.username').val(),
			street: $('.street').val(),
			plz: $('.plz').val(),
			city: $('.city').val(),
			email: $('.email').val()
	};
	
	cartList.push(adress);
	
	console.log(JSON.stringify(cartList));
	var orderJson = {
			orderJson: encodeURIComponent(JSON.stringify(cartList))
	};
	WineIng.request.create('addOrder', '', orderJson, false, function (json) {
		console.info('[Actions] addOrder: ' + JSON.stringify(json));
		$('.modal-content-window').html('Bestellung wurde aufgegeben.');
		WineIng.cart.clearCart();
 
	});
};

Actions.prototype.deleteOrder = function (orderId) {
	var data = {
		'orderNumber': orderId
	};
	WineIng.request.create('deleteOrder', '', data, false, function (json) {
		WineIng.action.getOrders();
		console.info('[Actions] deleting order: ' + JSON.stringify(json));
	});


};
