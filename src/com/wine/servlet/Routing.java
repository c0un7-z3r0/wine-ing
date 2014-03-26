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

public class Routing extends HttpServlet {
	
	
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,
        IOException {
		WineDao wd = new WineDao(request);
		
		if(request.getParameter("addWineToXML") != null){
			wd.addWine(request.getParameterMap());
		}
		if(request.getParameter("searchWineForm") != null){
			List<Wine> result = wd.searchWine(request.getParameter("search"));
			request.getSession().setAttribute("wineList", result);
			request.getRequestDispatcher("/displayResults.jsp").forward(request, response);
		}	
		if(request.getParameter("addWineForm") != null){
			
			List<String> kind = wd.getWineSpecificList("/wine-ing/wineKind/kind");
			request.getSession().setAttribute("kind", kind);
			
			List<String> region = wd.getWineSpecificList("/wine-ing/wineRegion/region");
			request.getSession().setAttribute("region", region);
			
			List<String> wineMaker = wd.getWineSpecificList("/wine-ing/wineMaker/maker");
			request.getSession().setAttribute("wineMaker", wineMaker);
			
			List<String> wineType = wd.getWineSpecificList("/wine-ing/wineType/type");
			request.getSession().setAttribute("wineType", wineType);
			
			request.getRequestDispatcher("/addWine.jsp").forward(request, response);
		}
		if(request.getParameter("getAllWine") != null){
			List<Wine> result = wd.getAllWine();
			request.getSession().setAttribute("wineList", result);
			request.getRequestDispatcher("/displayResults.jsp").forward(request, response);
		}	
    }
 
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
        IOException {
    }

}
