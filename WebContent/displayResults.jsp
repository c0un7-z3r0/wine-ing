<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:setLocale value="de_DE"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Wine'Ing Results</title>
</head>
<body>
	<table>
		<tr>
			<th>name</th>
			<th>kind</th>
			<th>region</th>
			<th>winemaker</th>
			<th>type</th>
			<th>price</th>
		</tr>
		<c:forEach items="${wineList}" var="item">
			<tr>
				<td><c:out value="${item.getName()}" /></td>
				<td><c:out value="${item.getKind()}" /></td>
				<td><c:out value="${item.getRegion()}" /></td>
				<td><c:out value="${item.getWinemaker()}" /></td>
				<td><c:out value="${item.getType()}" /></td>
				<td><fmt:formatNumber minFractionDigits="2" value="${item.getPrice()}" currencySymbol="&euro;" type="currency"  /></td>
			</tr>
		</c:forEach>
	</table>


</body>
</html>