<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.wine.crud.WineDao"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Wine'ing</title>
</head>
<body>
	<h1>Wine'ing</h1>
	<h2>"All we done is wine"</h2>
	<hr>
	<form method="get" action="routing">


		<h3>Add wine</h3>
		<input type="submit" name="addWineForm" value="Add Wine">
		<h3>Search the wine list</h3>
		<input type="text" name="search" placeholder="Enter search here">
		<input type="submit" name="searchWineForm" value="Search">
		<h3>Get a list of all wine</h3>
		<input type="submit" name="getAllWine" value="Get all">

	</form>




</body>
</html>