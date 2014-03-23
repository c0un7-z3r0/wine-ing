package com.wine.crud;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * WineDao = Wine Data Access Object C R U D
 * 
 * Methods: 
 * addWine(wineName, wineType)	=	adds a wine to the xml file to add
 * 									more nodes to a wine add them here
 * 									if return is true everything worked
 * 	
 * searchWine(search, value)	=	find in wine where search == value
 * 									returns a List or if something
 * 									went wrong null
 * 
 * @author David
 * 
 */
public class WineDao {

	private ServletContext app;
	// private String path = app.getRealPath("/");
	private String path = "/Users/david/Projects/berufsschule/wine-ing/";
	private File file = new File(path + "wine.xml");

	/**
	 * pass the application from the jsp
	 * 
	 * @param app
	 */
	public WineDao(ServletContext app) {
		this.app = app;
	}

	/**
	 * Adds a new node to the xml file more parameters can be added her if
	 * needed
	 * @param wineName
	 * @param wineType
	 * @return if true everything worked 
	 */
	public boolean addWine(String wineName, String wineType) {
		if(wineName == null || wineName.isEmpty() )
			return false;
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse(file);

			// get root element
			Element elem = doc.getDocumentElement();

			// create new node
			Node newWineNode = doc.createElement("wine");
			elem.appendChild(newWineNode);

			// create elements for new node
			// e.g. Element nameOfElement =
			// doc.createElement("nameOfElementInXML");
			Element name = doc.createElement("name");
			Element type = doc.createElement("type");

			// fill those elements with a value from the parameter passed over
			name.appendChild(doc.createTextNode(wineName));
			type.appendChild(doc.createTextNode(wineType));

			// add the elements to parent (wine)
			newWineNode.appendChild(name);
			newWineNode.appendChild(type);

			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory
					.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);

			StreamResult results = new StreamResult(file);

			transformer.transform(source, results);

			System.out.println("File saved!");
			return true;

		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
			return false;
		} catch (TransformerConfigurationException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
			return false;

		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
			return false;

		} catch (SAXException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
			return false;

		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
			return false;

		}

	}

	/**
	 * searches the xml for where the "search" == "value" returns a list with a
	 * hashMap of the found elements
	 * 
	 * @param search
	 *            = the element we are looking for
	 * @param value
	 *            = the value of the search element
	 * @return List<Map<String, String>>
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws IOException
	 * @throws XPathExpressionException
	 */
	public List<Map<String, String>> searchWine(String search, String value) {
		if(value.isEmpty() || search == null || value == null || search.isEmpty())
			return null;
		try {
			// the list of all found wines
			List<Map<String, String>> wineList = new ArrayList<Map<String, String>>();
			// the hashMap of a single found wine is getting copied into to the
			// List
			Map<String, String> tempMap = new HashMap<String, String>();

			DocumentBuilderFactory builderFactory = DocumentBuilderFactory
					.newInstance();

			DocumentBuilder builder;
			builder = builderFactory.newDocumentBuilder();

			Document xmlDocument = builder.parse(file);

			XPath xPath = XPathFactory.newInstance().newXPath();

			// search term
			String expression = "/wine-ing/wine[" + search + "='" + value + "']/*";
			// uncomment for debug purpose
			// System.out.println(expression);

			// compiles the search term expression and find the values searched
			// for and return a NodeList
			NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(
					xmlDocument, XPathConstants.NODESET);
			if(nodeList == null)
				return null;
			if(nodeList.getLength() <= 0)
				return null;
			
			// add this values of the nodelist to the hashmap and then to the
			// list
			for (int i = 0; i < nodeList.getLength(); i++) {
				String key = nodeList.item(i).getNodeName();
				String nodeValue = nodeList.item(i).getFirstChild()
						.getNodeValue();

				// if key is name add hashMap to list and start a new HashMap
				if (key.equals("name")) {
					wineList.add(tempMap);
					tempMap.clear();
				}

				tempMap.put(key, nodeValue);
				// for debug
				// System.out.println(nodeList.item(i).getNodeName() + " - " +
				// nodeList.item(i).getFirstChild().getNodeValue());
			}

			return wineList;
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;

		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;

		} catch (XPathExpressionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;

		}
	}

	public void getAllWine() {

	}

	public void updateWine() {

	}

	public void deleteWine() {

	}

}
