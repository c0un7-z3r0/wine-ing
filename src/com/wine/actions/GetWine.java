package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.wine.Actions;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineSpecific;
import com.wine.xml.XStreamTranslator;

public class GetWine implements Actions {

	@Override
	public String execute(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		XStreamTranslator xStreamTranslatorInst; 
		xStreamTranslatorInst = XStreamTranslator.getInstance(); 
		File xml = new File(
		"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		
		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);


		
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml, classesToUse);
		
		

		return wineIng.wineListToJson();
	}

}
