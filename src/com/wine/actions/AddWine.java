package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wine.helper.WineHelpers;
import com.wine.translator.JsonTranslator;
import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineSpecific;

public class AddWine implements Actions<String> {

	@Override
	public String execute(Object jsonIn) throws Exception {

		Wine wine = (Wine) JsonTranslator
				.jsonToObject((Map<String, String[]>) jsonIn);
		wine.setId(WineHelpers.generateId());

		XStreamTranslator xStreamTranslatorInst;
		xStreamTranslatorInst = XStreamTranslator.getInstance();
		File xml = new File(
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");

		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml,
				classesToUse);

		wineIng.addToWineList(wine);

		
		xStreamTranslatorInst.toXMLFile(wineIng,
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");


		return "added wine to xml";
	}

}
