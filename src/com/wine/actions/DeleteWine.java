package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineSpecific;



public class DeleteWine implements Actions<String> {

	@Override
	public String execute(Object paramIn) throws Exception {
		Map<String, String[]> jsonIn = (Map<String, String[]>) paramIn;
		
		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);
		
		XStreamTranslator xStreamTranslatorInst = XStreamTranslator.getInstance();
		
		
		File xml = new File(
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml, classesToUse);
		
		
		ArrayList<Wine> wineList = wineIng.getWineList();
		ArrayList<Wine> wineResult = new ArrayList<Wine>();
		
		for(Wine wineInList : wineList){
			
			if(!wineInList.getId().equals(jsonIn.get("id")[0])){
				wineResult.add(wineInList);
			}
			
		}
		wineIng.setWineList(wineResult);
		xStreamTranslatorInst.toXMLFile(wineIng, "/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		
		return "Wine has been deleted";
	}

}
