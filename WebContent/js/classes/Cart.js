var Cart = function Cart() {
	this.cartList = [];
	this.writeInSession = function () {
		var jsonString = JSON.stringify(this.cartList);
		sessionStorage.setItem('wineCart', jsonString);
	}
};
Cart.prototype.getCartList = function () {
	this.cartList = JSON.parse(sessionStorage.getItem('wineCart')) || [];

};
Cart.prototype.addToCart = function (wineId, refresh) {


	this.getCartList();

	var wineObj = {};
	wineObj.wineId = wineId;
	wineObj.amount = 1;
	var that = this;
	newWine = true;

	if (this.cartList.length > 0) {
		$.each(that.cartList, function (key, obj) {
			if (obj.wineId === wineId) {
				obj.amount++;
				newWine = false;

			}
		});
	}
	if (newWine) {
		this.cartList.push(wineObj);
	}

	this.writeInSession();
	if(refresh){
		this.getCart();
	}
};

Cart.prototype.removeFromCart = function (wineId) {
	this.getCartList();
	var that = this;
	var newCartList = [];
	if (this.cartList.length > 0) {
		$.each(this.cartList, function (key, obj) {
			if (obj.wineId === wineId) {
				obj.amount--;

				if (obj.amount > 0) {
					newCartList.push(obj);
				}
			} else {
				newCartList.push(obj);

			}
		});
	}
	this.cartList = newCartList;
	this.writeInSession();
	this.getCart();


};

Cart.prototype.getCart = function () {
	this.getCartList();
	var wineList = null;
	var results = [];

	var that = this;
	WineIng.action.getAllWine('', function (json) {
		wineList = json.ArrayList;


		$.each(wineList, function (key, wine) {
			$.each(that.cartList, function (k, v) {
				if (wine.id === v.wineId) {
					var resultObj = {};
					resultObj.wine = wine;
					resultObj.amount = v.amount;
					results.push(resultObj);
				}
			});
		});

		if (results.length === 0) {
			$('.content').html('Ihr Warenkorb ist leer!');

		} else {

			new Templater('cartTable', results, '', function (content) {
				$('.content').html(content);

			});
		}
	});

};


