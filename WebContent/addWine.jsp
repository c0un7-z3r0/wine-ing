<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Wine'ing Add Wine</title>
</head>
<body>
	Add some wine here ...
	<form method="get" action="routing">
		<table>
			<tr>
				<td>Name</td>
				<td><input type="text" name="name"></td>
			</tr>
			<tr>
				<td>Kind</td>
				<td><select name="kind">
						<c:forEach items="${kind}" var="item">
							<option value="${item}">${item}</option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<td>Region</td>
				<td><select name="region">
						<c:forEach items="${region}" var="item">
							<option value="${item}">${item}</option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<td>Winemaker</td>
				<td><select name="winemaker">
						<c:forEach items="${wineMaker}" var="item">
							<option value="${item}">${item}</option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<td>Type</td>
				<td><select name="type">
						<c:forEach items="${wineType}" var="item">
							<option value="${item}">${item}</option>
						</c:forEach>
				</select></td>
			</tr>
			<tr>
				<td>Price</td>
				<td><input type="number" step="0.01" min="0.01" name="price" placeholder="123.12" /></td>
			</tr>
		</table>
		<input
			type="submit" name="addWineToXML" value="submit" />
	</form>
</html>
</body>
</html>