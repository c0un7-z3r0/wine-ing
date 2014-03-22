package com.wine.crud;
import java.io.File;
import java.io.IOException;

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

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
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

	public WineDao(ServletContext app){
		this.app = app;
	}
	
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
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void getWine(){
		
	}
	
	public void getAllWine(){
		
	}
	
	public void updateWine(){
		
	}
	
	public void deleteWine(){
		
	}
	
}
