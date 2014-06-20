package com.wine.actions;

import java.io.File;
import java.util.ArrayList;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;

public class GetWine implements Actions<ArrayList<Wine>> {

	@Override
	public ArrayList<Wine> execute(File file, Object paramIn) throws Exception {

		XStreamTranslator xStreamTranslatorInst;
		xStreamTranslatorInst = XStreamTranslator.getInstance();

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);

		return wineIng.getWineList();
	}

}
