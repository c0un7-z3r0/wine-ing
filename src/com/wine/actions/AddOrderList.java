package com.wine.actions;

import java.io.File;
import java.util.Map;

import com.wine.helper.WineHelpers;
import com.wine.translator.JsonTranslator;
import com.wine.translator.XStreamTranslator;
import com.wine.xml.WineIng;
import com.wine.xml.WineOrder;

public class AddOrderList implements Actions<String> {

	@SuppressWarnings("unchecked")
	@Override
	public String execute(File file, Object param) throws Exception {

		// parse json to wineOrder
		WineOrder wineOrder = (WineOrder) JsonTranslator
				.jsonToObject((Map<String, String[]>) param);
		// and set the orderNumber as random
		wineOrder.setOrderNumber(WineHelpers.generateId(""));

		// get the xStream instance
		XStreamTranslator xStreamTranslatorInst;
		xStreamTranslatorInst = XStreamTranslator.getInstance();

		// read the from xml
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);
		// add the wineOrder to wineOrder
		wineIng.addToWineOrder(wineOrder);
		// write to xml
		xStreamTranslatorInst.toXMLFile(wineIng, file.getAbsolutePath());

		return "added wineOrder to xml";
	}

}
