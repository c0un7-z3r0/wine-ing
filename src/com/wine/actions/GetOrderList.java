package com.wine.actions;

import java.io.File;
import java.util.ArrayList;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.WineIng;
import com.wine.xml.WineOrder;

public class GetOrderList implements Actions<ArrayList<WineOrder>> {

	@Override
	public ArrayList<WineOrder> execute(File file, Object param)
			throws Exception {
		XStreamTranslator xStreamTranslatorInst;
		xStreamTranslatorInst = XStreamTranslator.getInstance();

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);

		return wineIng.getWineOrder();
	}

}
