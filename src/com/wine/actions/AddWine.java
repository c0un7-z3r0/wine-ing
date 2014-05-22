package com.wine.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.wine.Actions;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineSpecific;
import com.wine.xml.XStreamTranslator;

public class AddWine implements Actions {

	@Override
	public String execute(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String jsonInput = "{\"name\":\"wine\",\"kind\":\"trocken\",\"region\":\"Frankreich\",\"winemaker\":\"Bob%20der%20Baumeister\",\"type\":\"Rotwein\",\"price\":\"30.0\"}";
		
		Wine wine = new Wine();
		wine.jsonToWine(jsonInput);
		
		XStreamTranslator xStreamTranslatorInst; 
		xStreamTranslatorInst = XStreamTranslator.getInstance(); 
		File xml = new File(
		"/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		
		List<Class<?>> classesToUse = new ArrayList<Class<?>>();
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);


		
		WineIng wineIng = (WineIng) xStreamTranslatorInst.toObject(xml, classesToUse);
		
		wineIng.addToWineList(wine);
		
//		wineIng = new WineIng();
//		wineIng.addToWineList(wine);
//		ArrayList<WineSpecific> spec = new ArrayList<WineSpecific>();;
//		WineSpecific ws = new WineSpecific();
//		ws.setName("Test");
//		ArrayList<String> categories = new ArrayList<String>();
//		categories.add("bob");
//		categories.add("asdtestd");
//		ws.setCategories(categories);
//		spec.add(ws);
//		
//		wineIng.setWineSpecifics(spec);
		xStreamTranslatorInst.toXMLFile(wineIng, "/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
		

		
		
		
		
		return "done";
	}

}
