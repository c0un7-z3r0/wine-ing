package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;

public class DeleteWine implements Actions<String> {
	@SuppressWarnings("unchecked")
	@Override
	public String execute(File file, Object paramIn) throws Exception {
		Map<String, String[]> jsonIn = (Map<String, String[]>) paramIn;

		XStreamTranslator xStreamTranslatorInst = XStreamTranslator
				.getInstance();

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);

		ArrayList<Wine> wineList = wineIng.getWineList();
		ArrayList<Wine> wineResult = new ArrayList<Wine>();

		// dont add the wine to the new list
		for (Wine wineInList : wineList) {
			if (!wineInList.getId().equals(jsonIn.get("id")[0])) {
				wineResult.add(wineInList);
			}
		}
		// set the new list as wineList
		wineIng.setWineList(wineResult);
		xStreamTranslatorInst.toXMLFile(wineIng, file.getAbsolutePath());

		return "Wine has been deleted";
	}

}
