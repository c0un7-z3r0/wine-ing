package com.wine.crud;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
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

import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONArray;
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

	private String path;
	private File file;

	public WineDao(HttpServletRequest request) throws MalformedURLException {
		path = "/Users/david/Projects/berufsschule/wine-ing/xml";

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
	public String addWine(Map<String, String[]> resultMap) {
		String returnMsg = "Adding Wine to XML"+ "</br>";
		Document doc = parseXml();
		if (doc == null) {
			return returnMsg = "Error: No document found please try again!";
		}
		// get root element
		Element elem = doc.getDocumentElement();

		// create new node
		Node newWineNode = doc.createElement("wine");
		elem.appendChild(newWineNode);
		returnMsg += "create new wine in XML"+ "</br>";

		for (Map.Entry<String, String[]> entry : resultMap.entrySet()) {
			System.out.println(entry.getKey() + " - " + entry.getValue()[0]);
			if (!entry.getKey().equals("addWineToXML")) {
				Element childElem = doc.createElement(entry.getKey());
				childElem.appendChild(doc.createTextNode(entry.getValue()[0].trim()));
				newWineNode.appendChild(childElem);
				returnMsg += entry.getKey() + ": " + entry.getValue()[0].trim() + "</br>";
			}
		}
		writeInXml(doc);
		return returnMsg += "Wine has been saved in XML";

	}

	/**
	 * Searches for the matching wines in xml and returns a list with wine
	 * objects
	 * 
	 * @param search
	 * @param value
	 * @return List containing Wine Objects
	 * @throws JSONException
	 * @throws DOMException
	 */
	public List<Wine> searchWine(String search) throws DOMException,
			JSONException {
		List<Wine> wineList = new ArrayList<Wine>();
		// System.out.println("----------->-------------------<---------------- "
		// + search);
		if (search == null || search.isEmpty())
			return wineList;
		/**
		 * search expression
		 */
		String expression = "//wine-ing/wine[contains(., '" + search + "')]";
		List<Map<String, String>> nodeList = getNodeList(expression);
		List<JSONObject> json = getNodeListJSON(expression);
		wineList = getWineList(nodeList);

		return wineList;
	}

	public List<String> getWineSpecificList(String listName, String expression) {
		List<String> kindList = new ArrayList<String>();
		kindList.add(listName);
		// String expression = "/wine-ing/wineKind/kind";
		List<Map<String, String>> nodeList = getNodeList(expression);
		for (int i = 0; i < nodeList.size(); i++) {
			Map<String, String> valueMap = nodeList.get(i);
			for (Map.Entry<String, String> entry : valueMap.entrySet()) {
				kindList.add(entry.getValue());
			}

		}

		return kindList;

	}

	public List<Wine> getAllWine() {

		List<Wine> wineList = new ArrayList<Wine>();
		/**
		 * search expression
		 */
		String expression = "/wine-ing/wine";
		List<Map<String, String>> nodeList = getNodeList(expression);
		wineList = getWineList(nodeList);

		return wineList;

	}

	public void updateWine() {

	}

	public void deleteWine() {

	}

	/**
	 * Writes in the doc
	 * 
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
			// System.out.println(source.toString());
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

		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private List<Map<String, String>> getNodeList(String expression) {

		Document doc = parseXml();
		List<Map<String, String>> nodes = new ArrayList<Map<String, String>>();

		if (doc == null)
			return nodes;
		try {
			XPath xPath = XPathFactory.newInstance().newXPath();
			NodeList nodeList;
			nodeList = (NodeList) xPath.compile(expression).evaluate(doc,
					XPathConstants.NODESET);
			// the list of all found wines

			/**
			 * Create a List of Nodes 'nodes' and there children
			 */
			int len = (nodeList != null) ? nodeList.getLength() : 0;
			// System.out.println("!!!!!!!!!!!!!!!!!!!!! ----- " + len);

			for (int i1 = 0; i1 < len; i1++) {
				NodeList children = nodeList.item(i1).getChildNodes();

				Map<String, String> childMap = new HashMap<String, String>();

				for (int j = 0; j < children.getLength(); j++) {
					// System.out.println(">>>>>>>>>>>>>>>>> " +
					// children.getLength() + ">>>>>>>>>>>>>>>>>");
					Node child = children.item(j);
					if (child.getNodeType() == Node.ELEMENT_NODE) {
						// System.out.println("child " + child.getNodeName() +
						// " - " + child.getTextContent());
						childMap.put(child.getNodeName(),
								child.getTextContent());
					}
					// System.out.println("<<<<<<<<<<<<<<<<<< " +
					// children.getLength() + "<<<<<<<<<<<<<<<");

				}
				// System.out.println("childMap " + childMap);
				nodes.add(childMap);
			}
			return nodes;
		} catch (XPathExpressionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	private List<JSONObject> getNodeListJSON(String expression)
			throws DOMException, JSONException {

		Document doc = parseXml();
		// List<Map<String, String>> nodes = new ArrayList<Map<String,
		// String>>();

		if (doc == null)
			return null;
		try {
			XPath xPath = XPathFactory.newInstance().newXPath();
			NodeList nodeList;
			nodeList = (NodeList) xPath.compile(expression).evaluate(doc,
					XPathConstants.NODESET);
			// the list of all found wines
			List<JSONObject> nodes = new ArrayList<JSONObject>();

			/**
			 * Create a List of Nodes 'nodes' and there children
			 */
			int len = (nodeList != null) ? nodeList.getLength() : 0;
			// System.out.println("!!!!!!!!!!!!!!!!!!!!! ----- " + len);
			for (int i1 = 0; i1 < len; i1++) {
				JSONObject wineJson = new JSONObject();

				NodeList children = nodeList.item(i1).getChildNodes();

				Map<String, String> childMap = new HashMap<String, String>();

				for (int j = 0; j < children.getLength(); j++) {
					// System.out.println(">>>>>>>>>>>>>>>>> " +
					// children.getLength() + ">>>>>>>>>>>>>>>>>");
					Node child = children.item(j);
					if (child.getNodeType() == Node.ELEMENT_NODE) {
						// System.out.println(j + ". child " +
						// child.getNodeName() + " - " +
						// child.getTextContent());
						wineJson.put(child.getNodeName(),
								child.getTextContent());

					}

				}
				// System.out.println(">>>>>>>>>>>>>>>>> " +
				// children.getLength() + ">>>>>>>>>>>>>>>>>");

				// System.out.println("wineJson " + wineJson);

				nodes.add(wineJson);
				// System.out.println("nodes " + nodes);

			}
			return nodes;
		} catch (XPathExpressionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	/**
	 * generates a list of wine objects from the XPath search expression
	 * 
	 * @param List
	 *            <Map<String, String>>
	 * @return
	 */
	private List<Wine> getWineList(List<Map<String, String>> nodes) {
		List<Wine> wineList = new ArrayList<Wine>();

		/**
		 * Create from the List nodes the wine objects and add them to the List
		 * wine
		 */
		int nodeLen = (nodes != null) ? nodes.size() : 0;
		for (int j = 0; j < nodeLen; j++) {
			Wine wine = new Wine();
			wine.setName(nodes.get(j).get("name"));
			wine.setKind(nodes.get(j).get("kind"));
			wine.setRegion(nodes.get(j).get("region"));
			wine.setWinemaker(nodes.get(j).get("winemaker"));
			wine.setType(nodes.get(j).get("type"));
			// System.out.println(nodes.get(j));
			try {
				wine.setPrice(Double.parseDouble(nodes.get(j).get("price")));
			} catch (NullPointerException e) {
				wine.setPrice(0.00d);
			}
			wineList.add(wine);

		}
		return wineList;

	}
}
