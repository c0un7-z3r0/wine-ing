package com.wine.actions;

import java.io.File;
import java.util.Map;

import com.wine.helper.WineHelpers;
import com.wine.translator.JsonTranslator;
import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;

public class AddWine implements Actions<String> {

	@SuppressWarnings("unchecked")
	@Override
	public String execute(File file, Object jsonIn) throws Exception {
		// parse json to wine
		Wine wine = (Wine) JsonTranslator
				.jsonToObject((Map<String, String[]>) jsonIn);
		// generate a random id for the wine
		wine.setId(WineHelpers.generateId("ID_"));
		// get the xStream instance
		XStreamTranslator xStreamTranslatorInst;
		xStreamTranslatorInst = XStreamTranslator.getInstance();

		// read the from xml
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);
		// add the wine to wineList
		wineIng.addToWineList(wine);
		// write
		xStreamTranslatorInst.toXMLFile(wineIng, file.getAbsolutePath());

		return "added wine to xml";
	}

}
