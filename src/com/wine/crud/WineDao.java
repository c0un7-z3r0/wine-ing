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
 * WineDao = Wine Data Access Object
 * C R U D
 * @author david
 *
 */
public class WineDao {

	private ServletContext app;
//	private String path = app.getRealPath("/");
	private String path = "/Users/david/Projects/berufsschule/wine-ing/";
	private File file = new File(path + "wine.xml");
	/**
	 * pass the application from the jsp
	 * @param app
	 */
	public WineDao(ServletContext app){
		this.app = app;
	}
	
	
	/**
	 * Adds a new node to the xml
	 * @param wineName
	 * @param wineType
	 */
	public void addWine(String wineName, String wineType ){
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse(file);
			
			//get root element
			Element elem = doc.getDocumentElement();
			
			//create new node
			Node newWineNode = doc.createElement("wine");
			elem.appendChild(newWineNode);
			
			
			//create elements for new node
			Element name = doc.createElement("name");
			Element type = doc.createElement("type");
			//fill those elements
			name.appendChild(doc.createTextNode(wineName));
			type.appendChild(doc.createTextNode(wineType));
			//add the elements to parent
			newWineNode.appendChild(name);
			newWineNode.appendChild(type);

			
			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			
			StreamResult results = new StreamResult(file);
			
			transformer.transform(source, results);

			System.out.println("File saved!");
			
			
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
		} catch (TransformerConfigurationException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
		} catch (TransformerException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.print("Add Wine faild");
			e.printStackTrace();
		}
		
	}
	public List<Map<String, String>> searchWine(String search, String value) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException{
		List<Map<String, String>> wineList = new ArrayList<Map<String,String>>();
 	   Map<String, String> tempMap = new HashMap<String,String>();

		DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
        
        DocumentBuilder builder =  builderFactory.newDocumentBuilder();
         
        Document xmlDocument = builder.parse(file);

        XPath xPath =  XPathFactory.newInstance().newXPath();

        System.out.println("*************************");
        String expression = "/wine-ing/wine["+search+"='"+value+"']/*";
        System.out.println(expression);
        NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(xmlDocument, XPathConstants.NODESET);
        for (int i = 0; i < nodeList.getLength(); i++) {
           String key = nodeList.item(i).getNodeName();
           String nodeValue = nodeList.item(i).getFirstChild().getNodeValue();
           if(key.equals("name")){
        	   wineList.add(tempMap);
        	   tempMap.clear();
           }
	           tempMap.put(key , nodeValue);
	           System.out.println(nodeList.item(i).getNodeName()); 
	
	            System.out.println(nodeList.item(i).getFirstChild().getNodeValue()); 
        }
        System.out.println("*************************");

		
		return wineList;
	
	}
	
	public void getAllWine(){
		
	}
	
	public void updateWine(){
		
	}
	
	public void deleteWine(){
		
	}
	
}
