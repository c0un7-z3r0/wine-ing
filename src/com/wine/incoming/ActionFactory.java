package com.wine.incoming;

import java.util.HashMap;
import java.util.Map;

import com.wine.actions.Actions;
import com.wine.actions.AddOrderList;
import com.wine.actions.AddWine;
import com.wine.actions.DeleteOrder;
import com.wine.actions.DeleteWine;
import com.wine.actions.EditWine;
import com.wine.actions.GetAllSpecific;
import com.wine.actions.GetOrderList;
import com.wine.actions.GetWine;
import com.wine.actions.SearchWine;

public class ActionFactory {

	@SuppressWarnings("rawtypes")
	public static Map<String, Actions> controllers = new HashMap<String, Actions>();

	/**
	 * Initilise the actions to add a class e.g. controllers.put(method /
	 * actionName, new ClassName());
	 */
	public ActionFactory() {

		controllers.put("GET/delete", new DeleteWine());
		controllers.put("GET/editWine", new EditWine());

		controllers.put("GET/getAll", new GetWine());
		controllers.put("GET/search", new SearchWine());

		controllers.put("GET/getAllSpecific", new GetAllSpecific());
		controllers.put("GET/add", new AddWine());

		controllers.put("GET/addOrder", new AddOrderList());
		controllers.put("GET/getOrders", new GetOrderList());
		controllers.put("GET/deleteOrder", new DeleteOrder());

	}

	/**
	 * get the action requested
	 * 
	 * @param methode
	 * @param actionName
	 * @return class
	 */
	public static Actions<?> getAction(String methode, String actionName) {

		String actionString = methode + "/" + actionName;
		System.out.print(actionString);
		return controllers.get(actionString);
	}

}
