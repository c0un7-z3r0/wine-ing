package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wine.translator.XStreamTranslator;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineOrder;
import com.wine.xml.WineSpecific;

public class DeleteOrder implements Actions<String> {

	@Override
	public String execute(Object param) throws Exception {
		Map<String, String[]> jsonIn = (Map<String, String[]>) param;

		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);
		classesToUse.add(WineOrder.class);


		XStreamTranslator xStreamTranslatorInst = XStreamTranslator
				.getInstance();

		File xml = new File(
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml,
				classesToUse);

		ArrayList<WineOrder> orderList = wineIng.getWineOrder();
		ArrayList<WineOrder> orderResult = new ArrayList<WineOrder>();

		for (WineOrder orderInList : orderList) {

			if (!orderInList.getOrderNumber().equals(jsonIn.get("orderNumber")[0])) {
				orderResult.add(orderInList);
			}

		}
		wineIng.setWineOrder(orderResult);
		xStreamTranslatorInst.toXMLFile(wineIng,
				"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");

		return "Order has been deleted";
	}

}
