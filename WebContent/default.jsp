<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="action.js"></script>

</head>
<body>
<div class="menu">
	<input type="button" name="add" value="Add Wine" onclick="wineForm()"/>
	<input type="text" class="searchTerm" name="searchTerm" />
	<input type="button" name="search" value="Search" onclick="searchWine()"/>
	<input type="button" name="getAll" value="Get All" onclick="getAllWine()"/>
	
</div>
<div class="content"></div>
</body>
</html>