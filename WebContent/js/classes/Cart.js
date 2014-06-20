var Cart = function Cart() {
	this.cartList = [];
	this.writeInSession = function () {
		var jsonString = JSON.stringify(this.cartList);
		
		var badge = $('.cartBadge');
		if(badge){
			var count = this.getTotal(this.cartList);
			badge.text(count);
		}
		
		sessionStorage.setItem('wineCart', jsonString);
	};
};

/**
 * parses the sessionstorage wineCart to this.cartList
 * @returns {Array} CartList
 */
Cart.prototype.getCartList = function () {
	this.cartList = JSON.parse(sessionStorage.getItem('wineCart')) || [];
	
	
	return this.cartList;

};

/**
 * counts the total of wines in the cart
 * @param cartList
 * @returns {Number}
 */
Cart.prototype.getTotal = function (cartList) {
	if(typeof cartList === 'undefined'){
		cartList = this.getCartList();
	}
	var total = 0;
	$.each(cartList, function(key, value){
		total += +value.amount;
	});
	return total;

};

/**
 * adds the wineId to the cart
 * @param wineId
 * @param refresh
 */
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

/**
 * removes wine with wineId from cart
 * one at the time
 * @param wineId
 */
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
/**
 * empties out the whole cart
 */
Cart.prototype.clearCart = function(){
	this.cartList = [];
	this.writeInSession();
	this.getCart();
};
/**
 * gets the cart and fills the modal window
 */
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
			$('.modal-content-window').html('Ihr Warenkorb ist leer!');
			$('.emptyCartBtn').attr('disabled', 'true');
			$('.orderBtn').attr('disabled', 'true');
		} else {

			new Templater('cartTable', results, '', function (content) {
				$('.modal-content-window').html(content);
				$('.emptyCartBtn').removeAttr('disabled');
				$('.orderBtn').removeAttr('disabled');
			});
		}
	});

};
Cart.prototype.getWineFromId = function(wineId, data) {
	var returnWine = {};
	$.each(data, function(key, wine) {
		if (wine.id === wineId) {
			returnWine = wine
		}
	});
	return returnWine;
};

