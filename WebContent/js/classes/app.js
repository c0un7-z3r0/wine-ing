var WineIng = {}

WineIng.action = new Actions();
WineIng.cache = new Cache();
WineIng.request = new RequestCtrl();
WineIng.cart = new Cart();

/**
 * Starting page
 */
WineIng.action.getAllWine('costumer');
