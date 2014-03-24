package com.wine.crud;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Attr;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * WineDao = Wine Data Access Object C R U D
 * 
 * Methods: addWine(wineName, wineType) = adds a wine to the xml file to add
 * more nodes to a wine add them here if return is true everything worked
 * 
 * searchWine(search, value) = find in wine where search == value returns a List
 * or if something went wrong null
 * 
 * @author David
 * 
 */
public class WineDao {

	private ServletContext context;
	private String path;
	private File file;

	public WineDao(HttpServletRequest request) {
		context = request.getServletContext();
		path = context.getRealPath("xml");
		file = new File(path + "/wine.xml"); 
	}

	/**
	 * Adds a new node to the xml file more parameters can be added her if
	 * needed
	 * 
	 * @param wineName
	 * @param wineType
	 * @return if true everything worked
	 */
	public boolean addWine(String wineName, String wineType) {
		if (wineName == null || wineName.isEmpty())
			return false;

		Document doc = parseXml();
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

			writeInXml(doc);

			System.out.println("File saved!");
			return true;

	}

	

	/**
	 * Searches for the matching wines in xml and returns a list with wine
	 * objects
	 * 
	 * @param search
	 * @param value
	 * @return List containing Wine Objects
	 */
	public List<Wine> searchWine(String search, String value) {
		List<Wine> wineList = new ArrayList<Wine>();
		if (value.isEmpty() || search == null || value == null
				|| search.isEmpty())
			return null;
		/**
		 * search expression
		 */
		String expression = "/wine-ing/wine[" + search + "='" + value
				+ "']";

		wineList = getWineList(expression);

		return wineList;
	}


	public List<Wine> getAllWine()  {
		
		List<Wine> wineList = new ArrayList<Wine>();
		/**
		 * search expression
		 */
		String expression = "/wine-ing/wine";

		wineList = getWineList(expression);

		return wineList;

	}


	public void updateWine() {

	}

	public void deleteWine() {

	}
	
	/**
	 * Writes in the doc
	 * @param doc
	 * @throws TransformerFactoryConfigurationError
	 * @throws TransformerConfigurationException
	 * @throws TransformerException
	 */
	private void writeInXml(Document doc) {
		try {
		// write the content into xml file
		TransformerFactory transformerFactory = TransformerFactory
				.newInstance();
		Transformer transformer;

			transformer = transformerFactory.newTransformer();
		
		DOMSource source = new DOMSource(doc);

		StreamResult results = new StreamResult(file);

		transformer.transform(source, results);
		} catch (TransformerConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * Parses the xml to type Document
	 * 
	 * @return
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws IOException
	 */
	private Document parseXml() {
		try {
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory
					.newInstance();

			DocumentBuilder builder;

			builder = builderFactory.newDocumentBuilder();
			Document xmlDocument = builder.parse(file);
			return xmlDocument;
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
		}
	}
	
	/**
	 * generates a list of wine objects from the XPath search expression
	 * @param expression
	 * @return
	 */
	private List<Wine> getWineList(String expression) {
		List<Wine> wineList = new ArrayList<Wine>();
		Document doc = parseXml();
		if(doc == null)
			return wineList;
		try {
			XPath xPath = XPathFactory.newInstance().newXPath();
			NodeList nodeList;

			nodeList = (NodeList) xPath.compile(expression).evaluate(doc,
					XPathConstants.NODESET);

			// the list of all found wines
			List<Map<String, String>> nodes = new ArrayList<Map<String, String>>();

			/**
			 * Create a List of Nodes 'nodes' and there children
			 */
			int len = (nodeList != null) ? nodeList.getLength() : 0;
			for (int i1 = 0; i1 < len; i1++) {
				NodeList children = nodeList.item(i1).getChildNodes();

				Map<String, String> childMap = new HashMap<String, String>();

				for (int j = 0; j < children.getLength(); j++) {
					Node child = children.item(j);
					if (child.getNodeType() == Node.ELEMENT_NODE)
						childMap.put(child.getNodeName(),
								child.getTextContent());
				}
				nodes.add(childMap);
			}

			/**
			 * Create from the List nodes the wine objects and add them to the
			 * List wine
			 */
			int nodeLen = (nodes != null) ? nodes.size() : 0;
			for (int j = 0; j < nodeLen; j++) {
				Wine wine = new Wine();
				wine.setName(nodes.get(j).get("name"));
				wine.setType(nodes.get(j).get("type"));
				wineList.add(wine);
			}
			return wineList;

		} catch (XPathExpressionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return wineList;
		}
	}
}
