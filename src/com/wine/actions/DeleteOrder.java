package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.WineIng;
import com.wine.xml.WineOrder;

public class DeleteOrder implements Actions<String> {
	@SuppressWarnings("unchecked")
	@Override
	public String execute(File file, Object param) throws Exception {
		Map<String, String[]> jsonIn = (Map<String, String[]>) param;

		XStreamTranslator xStreamTranslatorInst = XStreamTranslator
				.getInstance();

		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(file);

		ArrayList<WineOrder> orderList = wineIng.getWineOrder();
		ArrayList<WineOrder> orderResult = new ArrayList<WineOrder>();

		// dont add the wineOrder which is meant to be deleted
		for (WineOrder orderInList : orderList) {

			if (!orderInList.getOrderNumber().equals(
					jsonIn.get("orderNumber")[0])) {
				orderResult.add(orderInList);
			}

		}
		// add the new wineOrder
		wineIng.setWineOrder(orderResult);
		xStreamTranslatorInst.toXMLFile(wineIng, file.getAbsolutePath());

		return "Order has been deleted";
	}

}
