package com.wine.incoming;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

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

	private static final Logger logger = Logger.getLogger(WineController.class
			.getName());

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ActionFactory.init();

		Map<String, String[]> data = request.getParameterMap();
		String methode = request.getMethod();

		Actions<?> action = ActionFactory.getAction(methode,
				data.get("action")[0]);
		Object result = action.execute(data);

		String jsonReturn = JsonTranslator.listToJson(result);
		logger.info(jsonReturn);
		// return JsonConverter.toJson(result);

		// Annotations
		// Generic classes
		// Dependency Injection

		response.setContentType("application/json");
		response.getWriter().write(jsonReturn);

	}

}
