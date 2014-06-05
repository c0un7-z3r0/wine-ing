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

public class EditWine implements Actions<String> {

	@Override
	public String execute(Object paramIn) throws Exception {
		Wine wine = (Wine) JsonTranslator
				.jsonToObject((Map<String, String[]>) paramIn);

		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);

		XStreamTranslator xStreamTranslatorInst = XStreamTranslator
				.getInstance();

		File xml = new File(
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml,
				classesToUse);

		ArrayList<Wine> wineList = wineIng.getWineList();

		for (Wine wineInList : wineList) {

			if (wineInList.getId().equals(wine.getId())) {
				wineInList = wine;
			}

		}

		wineIng.setWineList(wineList);
		xStreamTranslatorInst.toXMLFile(wineIng,
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		return "Wine has been updated";
	}

}
