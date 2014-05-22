package com.wine.old.servlet;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.xpath.XPathExpressionException;

import com.wine.Wine;
import com.wine.crud.WineDao;

import org.json.simple.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.w3c.dom.DOMException;

public class Routing extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		WineDao wd = new WineDao(request);
		
		if(request.getParameter("deleteWine") != null){
			String returnMessage = wd.deleteWine(request.getParameter("wineId"));
			List<String> returnMessagesList = new ArrayList<String>();
			returnMessagesList.add(returnMessage);
			try {
				returnJson(response, returnMessagesList);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		if(request.getParameter("updateWineInXML") != null){
			String returnString = "";
			try {
				returnString = wd.updateWine(request.getParameterMap(),request.getParameter("wineId") );
			} catch (XPathExpressionException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			List<String> returnMessagesList = new ArrayList<String>();
			returnMessagesList.add(returnString);
			try {
				returnJson(response, returnMessagesList);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		if (request.getParameter("addWineToXML") != null) {
			String returnString = "";
			returnString = wd.addWine(request.getParameterMap());
			List<String> returnMessagesList = new ArrayList<String>();
			returnMessagesList.add(returnString);
			try {
				returnJson(response, returnMessagesList);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if (request.getParameter("searchWineForm") != null) {
			List<Wine> result;
			try {
				result = wd.searchWine(request.getParameter("search"));
				
				if(result.isEmpty()){
					String returnMessage = "Could not find "+request.getParameter("search")+" in XML!";
					List<String> returnMessagesList = new ArrayList<String>();
					returnMessagesList.add(returnMessage);
					returnJson(response, returnMessagesList);

				}else{
					returnJson(response, result);
				}
				

			} catch (JSONException jse) {
				jse.getStackTrace();
			}

			//

		}
		if (request.getParameter("addWineForm") != null) {
			List<List<String>> formElements = new ArrayList<List<String>>();

			List<String> kind = wd
					.getWineSpecificList("kind","/wine-ing/wineSpecifics/wineKind/kind");
//			request.getSession().setAttribute("kind", kind);

			List<String> region = wd
					.getWineSpecificList("region","/wine-ing/wineSpecifics/wineRegion/region");
//			request.getSession().setAttribute("region", region);

			List<String> wineMaker = wd
					.getWineSpecificList("winemaker","/wine-ing/wineSpecifics/wineMaker/maker");
//			request.getSession().setAttribute("wineMaker", wineMaker);

			List<String> wineType = wd
					.getWineSpecificList("winetype","/wine-ing/wineSpecifics/wineType/type");
//			request.getSession().setAttribute("wineType", wineType);

//			request.getRequestDispatcher("/addWine.jsp").forward(request,
//					response);
			formElements.add(kind);
			formElements.add(region);
			formElements.add(wineMaker);
			formElements.add(wineType);
			
			try {
				returnJson(response, formElements);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		if (request.getParameter("getAllWine") != null) {
			List<Wine> result = wd.getAllWine();
			try {
				if(result.isEmpty()){
					String returnMessage = "Empty Wine List!";
					List<String> returnMessagesList = new ArrayList<String>();
					returnMessagesList.add(returnMessage);
					returnJson(response, returnMessagesList);

				}else{
					returnJson(response, result);
				}
			} catch (JSONException jse) {
				jse.getStackTrace();
			}
		}
	}



	/**
	 * @param response
	 * @param result
	 * @throws JSONException
	 * @throws IOException
	 */
	private void returnJson(HttpServletResponse response, List<?> result)
			throws JSONException, IOException {

		JSONObject json = new JSONObject();
		org.json.JSONArray jsonArray = new org.json.JSONArray();
		JSONObject jsonObj;
		String jsonName = "error";

		for (Object object : result) {
			int id = 0;
			jsonObj = new JSONObject();
			if(object instanceof String){
				jsonName = "messages";
				jsonObj.put("message", object.toString());
			}
			if(object instanceof List<?>){
				jsonName="formElements";
				for (Object obj : (List<?>)object){
					if(obj instanceof String){
						jsonObj.put( Integer.toString(id), obj.toString().replaceAll("[\r\n]", "") );
						id++;
					}
				}
			}
			if (object instanceof Wine) {
				jsonName = "wineList";
				jsonObj.put("id", ((Wine) object).getId());
				jsonObj.put("name", ((Wine) object).getName());
				jsonObj.put("kind", ((Wine) object).getKind());
				jsonObj.put("region", ((Wine) object).getRegion());
				jsonObj.put("winemaker", ((Wine) object).getWinemaker());
				jsonObj.put("winetype", ((Wine) object).getType());
				jsonObj.put("price", ((Wine) object).getPrice());
			}
			jsonArray.put(jsonObj);
		}

		json.put(jsonName, jsonArray);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
