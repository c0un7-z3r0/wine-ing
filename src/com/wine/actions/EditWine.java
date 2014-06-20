package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.wine.translator.JsonTranslator;
import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;

public class EditWine implements Actions<String> {

	@SuppressWarnings("unchecked")
	@Override
	public String execute(File file, Object paramIn) throws Exception {
		Wine wine = (Wine) JsonTranslator
				.jsonToObject(((Map<String, String[]>) paramIn));

		XStreamTranslator xStreamTranslatorInst = XStreamTranslator
				.getInstance();

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);

		ArrayList<Wine> wineList = wineIng.getWineList();
		ArrayList<Wine> newWineList = new ArrayList<Wine>();
		for (Wine wineInList : wineList) {

			if (wineInList.getId().equals(wine.getId())) {
				wineInList = wine;
			}
			newWineList.add(wineInList);

		}

		wineIng.setWineList(newWineList);
		xStreamTranslatorInst.toXMLFile(wineIng, file.getAbsolutePath());
		return "Wine has been updated";
	}

}
