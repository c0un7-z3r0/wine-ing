package com.wine.actions;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Map;

import com.wine.xml.Wine;


public class SearchWine implements Actions<ArrayList<Wine>> {

	@Override
	public ArrayList<Wine> execute(Object paramIn)  throws Exception {
		String searchTerm = ((Map<String, String[]>)paramIn).get("search")[0];
		
		
		GetWine getWine = new GetWine();
		ArrayList<Wine> wineList = getWine.execute(paramIn);
		ArrayList<Wine> wineResult = new ArrayList<Wine>();
		for(Wine wine : wineList){
			Field[] fields = wine.getClass().getDeclaredFields();
			
			for(Field field : fields){
				field.setAccessible(true);
				if(searchTerm.equals(field.get(wine).toString())){
					wineResult.add(wine);
				}

			}
		}
		
		
		return wineResult;
	}



}
