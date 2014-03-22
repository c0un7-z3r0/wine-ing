<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.wine.crud.WineDao" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
	WineDao wd = new WineDao(application);
	if(request.getParameter("action").equals("add")){
		wd.addWine(request.getParameter("name"), request.getParameter("type"));
	}	
 %>
</body>
</html>