package com.wine.incoming;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.wine.Actions;
import com.wine.actions.*;

public class ActionFactory {

	public static Map<String, Actions> controllers = new HashMap<String, Actions>();
	
	public static void init(){
		
		controllers.put("POST/delete", new DeleteWine());
		controllers.put("POST/edit", new EditWine());
		controllers.put("GET/getAll", new GetWine());		
		controllers.put("GET/search", new SearchWine());
		controllers.put("GET/add", new AddWine());

	}
	
	public static Actions getAction(HttpServletRequest request) {
		
		String actionString = request.getMethod() + "/" + request.getParameter("action");
		System.out.print(actionString);
	    return controllers.get(actionString);
	}
	
}
