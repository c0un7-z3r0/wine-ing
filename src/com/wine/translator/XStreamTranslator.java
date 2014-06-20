package com.wine.translator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.wine.xml.Wine;
import com.wine.xml.WineIng;
import com.wine.xml.WineOrder;
import com.wine.xml.WineSpecific;

public final class XStreamTranslator {

	private XStream xstream = null;
	private List<Class<?>> classesToUse = new ArrayList<Class<?>>();

	private XStreamTranslator() {
		xstream = new XStream(new DomDriver());
		classesToUse.add(Wine.class);
		classesToUse.add(WineSpecific.class);
		classesToUse.add(WineIng.class);
		classesToUse.add(WineOrder.class);
		// xstream.ignoreUnknownElements();
		// xstream.autodetectAnnotations(true);
	}

	/**
	 * Convert a any given Object to a XML String
	 * 
	 * @param object
	 * @return
	 */
	public String toXMLString(Object object) {
		return xstream.toXML(object);
	}

	/**
	 * Convert given XML to an Object
	 * 
	 * @param xml
	 * @return
	 */
	public Object toObject(String xml) {
		return xstream.fromXML(xml);
	}

	/**
	 * return this class instance
	 * 
	 * @return
	 */
	public static XStreamTranslator getInstance() {
		return new XStreamTranslator();
	}

	/**
	 * convert to Object from given File
	 * 
	 * @param xmlFile
	 * @return
	 * @throws IOException
	 */
	public Object toObject(File xmlFile) throws IOException {
		for (Class<?> clazz : classesToUse) {
			xstream.processAnnotations(clazz);
		}
		xstream.setMode(XStream.NO_REFERENCES);
		return xstream.fromXML(xmlFile);
	}

	/**
	 * create XML file from the given object with custom file name
	 * 
	 * @param fileName
	 * @param file
	 * @throws IOException
	 */
	public void toXMLFile(Object objTobeXMLTranslated, String fileName)
			throws IOException {
		FileWriter writer = new FileWriter(fileName);
		System.out.println("filename: " + fileName);
		xstream.toXML(objTobeXMLTranslated, writer);
		writer.close();
	}

	public void toXMLFile(Object objTobeXMLTranslated, String fileName,
			List<?> omitFieldsRegXList) throws IOException {
		xstreamInitializeSettings(objTobeXMLTranslated, omitFieldsRegXList);
		toXMLFile(objTobeXMLTranslated, fileName);
	}

	/**
	 * @ *
	 * 
	 * @param objTobeXMLTranslated
	 */
	public void xstreamInitializeSettings(Object objTobeXMLTranslated,
			List<?> omitFieldsRegXList) {
		if (omitFieldsRegXList != null && omitFieldsRegXList.size() > 0) {
			Iterator<?> itr = omitFieldsRegXList.iterator();
			while (itr.hasNext()) {
				String omitEx = (String) itr.next();
				xstream.omitField(objTobeXMLTranslated.getClass(), omitEx);
			}
		}
	}

	/**
	 * create XML file from the given object, file name is generated
	 * automatically (class name)
	 * 
	 * @param objTobeXMLTranslated
	 * @throws IOException
	 * @throws XStreamTranslateException
	 */
	public void toXMLFile(Object objTobeXMLTranslated) throws IOException {
		toXMLFile(objTobeXMLTranslated, objTobeXMLTranslated.getClass()
				.getName() + ".xml");
	}

	/**
	 * public WineIng fromXml(){
	 * 
	 * WineIng wineIng = new WineIng();
	 * 
	 * xstream.alias("wineSpecific", WineSpecific.class);
	 * 
	 * xstream.alias("wineIng", WineIng.class);
	 * 
	 * xstream.processAnnotations(Wine.class);
	 * 
	 * xstream.addImplicitCollection(WineSpecific.class, "categories", "String",
	 * String.class);
	 * 
	 * File xml = new File(
	 * "/Users/david/Projects/berufsschule/wine-ing/xml/wine.xml");
	 * xstream.setMode(XStream.NO_REFERENCES);
	 * 
	 * wineIng = (WineIng) xstream.fromXML(xml);
	 * 
	 * return wineIng;
	 * 
	 * 
	 * }
	 * 
	 * public void toXml(WineIng wineIng){
	 * 
	 * 
	 * 
	 * 
	 * 
	 * }
	 */
}
