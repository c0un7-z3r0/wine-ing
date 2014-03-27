<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="action.js"></script>

</head>
<body>
<div class="menu">
	<input type="button" name="add" value="Add Wine" onclick="includePage('addWine.jsp')"/>
	<input type="text" class="searchTerm" name="searchTerm" />
	<input type="button" name="add" value="Search" onclick="searchWine()"/>
	
</div>
<div class="content"></div>
</body>
</html>