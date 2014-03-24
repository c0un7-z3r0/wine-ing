package com.wine.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wine.crud.Wine;
import com.wine.crud.WineDao;

public class Routing extends HttpServlet {
	
	
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,
        IOException {
		WineDao wd = new WineDao(request);
		
		if(request.getParameter("action").equals("add")){
			wd.addWine(request.getParameter("name"), request.getParameter("type"));
		}
		if(request.getParameter("action").equals("search")){
			List<Wine> result = wd.searchWine(request.getParameter("search"), request.getParameter("value"));
			request.getSession().setAttribute("wineList", result);
			request.getRequestDispatcher("/displayResults.jsp").forward(request, response);
		}	
    }
 
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
        IOException {
    }

}
