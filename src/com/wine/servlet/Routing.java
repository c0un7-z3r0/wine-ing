package com.wine.servlet;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.wine.crud.Wine;
import com.wine.crud.WineDao;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.DOMException;

public class Routing extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		WineDao wd = new WineDao(request);

		if (request.getParameter("addWineToXML") != null) {
			boolean returnValue = wd.addWine(request.getParameterMap());

		}
		if (request.getParameter("searchWineForm") != null) {
			List<Wine> result;
			try {
				result = wd.searchWine(request.getParameter("search"));
				returnJson(response, result);

			} catch (JSONException jse) {
				jse.getStackTrace();
			}

			//

		}
		if (request.getParameter("addWineForm") != null) {

			List<String> kind = wd
					.getWineSpecificList("/wine-ing/wineKind/kind");
			request.getSession().setAttribute("kind", kind);

			List<String> region = wd
					.getWineSpecificList("/wine-ing/wineRegion/region");
			request.getSession().setAttribute("region", region);

			List<String> wineMaker = wd
					.getWineSpecificList("/wine-ing/wineMaker/maker");
			request.getSession().setAttribute("wineMaker", wineMaker);

			List<String> wineType = wd
					.getWineSpecificList("/wine-ing/wineType/type");
			request.getSession().setAttribute("wineType", wineType);

			request.getRequestDispatcher("/addWine.jsp").forward(request,
					response);
		}
		if (request.getParameter("getAllWine") != null) {
			List<Wine> result = wd.getAllWine();
			try {
				result = wd.getAllWine();
				returnJson(response, result);

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
	private void returnJson(HttpServletResponse response, List<Wine> result)
			throws JSONException, IOException {

		JSONObject json = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObj;
		String jsonName = "error";
		
		for (Object object : result) {
			jsonObj = new JSONObject();
			
			if (object instanceof Wine) {
				jsonName = "wineList";
				jsonObj.put("name", ((Wine) object).getName());
				jsonObj.put("kind", ((Wine) object).getKind());
				jsonObj.put("region", ((Wine) object).getRegion());
				jsonObj.put("winemaker", ((Wine) object).getWinemaker());
				jsonObj.put("type", ((Wine) object).getType());
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
