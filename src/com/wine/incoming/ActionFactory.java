package com.wine.incoming;

import java.util.HashMap;
import java.util.Map;

import com.wine.actions.Actions;
import com.wine.actions.AddWine;
import com.wine.actions.DeleteWine;
import com.wine.actions.EditWine;
import com.wine.actions.GetAllSpecific;
import com.wine.actions.GetWine;
import com.wine.actions.SearchWine;

public class ActionFactory {

	@SuppressWarnings("rawtypes")
	public static Map<String, Actions> controllers = new HashMap<String, Actions>();
	
	public static void init(){
		
		controllers.put("GET/delete", new DeleteWine());
		controllers.put("POST/edit", new EditWine());
		controllers.put("GET/getAll", new GetWine());		
		controllers.put("GET/search", new SearchWine());
		controllers.put("GET/getAllSpecific", new GetAllSpecific());
		controllers.put("GET/add", new AddWine());

	}
	
	public static Actions<?> getAction(String methode, String actionName) {
		
		String actionString = methode + "/" + actionName;
		System.out.print(actionString);
	    return controllers.get(actionString);
	}
	
}
