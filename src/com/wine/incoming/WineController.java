package com.wine.incoming;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wine.actions.Actions;
import com.wine.translator.JsonTranslator;

/**
 * Servlet implementation class WineController
 */
@SuppressWarnings("serial")
@WebServlet("/WineController")
public class WineController extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * Processes the requests and returns to frontend a json
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	private void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		new ActionFactory();
		/**
		 * Change path depending which xml to use to use the user.dir it needs
		 * to be configured right Eclipse: Run Configurations... -> Arguments ->
		 * Working Directory -> Other -> Workspace -> e.g. wine-ing
		 */
		// String xmlPath =
		// request.getSession().getServletContext().getRealPath("/");
		String xmlPath = System.getProperty("user.dir")
				+ System.getProperty("file.separator") + "WebContent";

		File xmlFile = new File(xmlPath + System.getProperty("file.separator")
				+ "xml" + System.getProperty("file.separator") + "wine.xml");

		// get request map
		Map<String, String[]> data = request.getParameterMap();
		// get method
		String methode = request.getMethod();
		// get the class for the action and method
		Actions<?> action = ActionFactory.getAction(methode,
				data.get("action")[0]);
		// execute the action and give it the xml and the mapped json
		// will return a object
		Object result = action.execute(xmlFile, data);
		// this object is getting changed to json to send it of to the frontend
		String jsonReturn = JsonTranslator.listToJson(result);
		response.setContentType("application/json");
		// send of
		response.getWriter().write(jsonReturn);

	}

}
