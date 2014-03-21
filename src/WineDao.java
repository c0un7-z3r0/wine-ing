import java.io.File;

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

import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * WineDao = Wine Data Access Object
 * C R U D
 * @author david
 *
 */
public class WineDao {

	private ServletContext app;
	private String path = app.getRealPath("/");
	private File file = new File(path + "wine.xml");
	
	public WineDao(ServletContext app){
		this.app = app;
	}
	
	public void addWine(){
		//will how this works out
//		try {
//			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
//			DocumentBuilder db = dbf.newDocumentBuilder();
//			
//			//root element
//			Document dc = db.newDocument();
//			Element rootElement = dc.createElement("wine-ing");
//			
//			//wine element
//			Element wineElement = dc.createElement("wine");
//			rootElement.appendChild(wineElement);
//			
//			//name of wine element
//			Element wineNameElement = dc.createElement("name");
//			wineElement.appendChild(wineNameElement);
//			
//			// write the content into xml file
//			TransformerFactory transformerFactory = TransformerFactory.newInstance();
//			Transformer transformer = transformerFactory.newTransformer();
//			DOMSource source = new DOMSource(dc);
//
//			// Output to console for testing
//			StreamResult result = new StreamResult(System.out);
//			
//			StreamResult results = new StreamResult(file);
//			
//			transformer.transform(source, result);
//			 
//			System.out.println("File saved!");
//			
//			
//		} catch (ParserConfigurationException e) {
//			// TODO Auto-generated catch block
//			System.out.print("Add Wine faild");
//			e.printStackTrace();
//		} catch (TransformerConfigurationException e) {
//			// TODO Auto-generated catch block
//			System.out.print("Add Wine faild");
//			e.printStackTrace();
//		} catch (TransformerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
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
