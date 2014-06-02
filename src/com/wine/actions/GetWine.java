package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineSpecific;

public class GetWine implements Actions<ArrayList<Wine>> {

	@Override
	public ArrayList<Wine> execute(Object paramIn)  throws Exception {

		XStreamTranslator xStreamTranslatorInst; 
		xStreamTranslatorInst = XStreamTranslator.getInstance(); 
		File xml = new File(
		"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		
		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);


		
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml, classesToUse);
		
		

		return wineIng.getWineList();
	}

}
