<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" %>


<%
long ts = (new Date()).getTime();
%>

	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>





<script src="lib/jquery-2.1.1.js"></script>

<!-- <script type="text/javascript" src="js/localCache.js"></script>
<script type="text/javascript" src="js/filter.js"></script>

<script type="text/javascript" src="js/helper.js"></script>
<script type="text/javascript" src="js/ajaxRequests.js"></script>

<script type="text/javascript" src="js/action.js"></script> -->
<script type="text/javascript" src="js/menu.js?<%=ts %>"></script>

<!-- <script type="text/javascript" src="js/costumerOrder.js"></script> -->




<div class="imports"></div>
<script type="text/javascript" src="js/classes/Actions.js?<%=ts %>"></script>
<script type="text/javascript" src="js/classes/Cache.js?<%=ts %>"></script>
<script type="text/javascript" src="js/classes/RequestCtrl.js?<%=ts %>"></script>
	<script type="text/javascript" src="js/classes/Cart.js?<%=ts %>"></script>

	<script type="text/javascript" src="js/classes/template/tables/wineTable.js?<%=ts %>"></script>
	<script type="text/javascript" src="js/classes/template/tables/cartTable.js?<%=ts %>"></script>
<script type="text/javascript" src="js/classes/template/tables/wineTableCostumer.js?<%=ts %>"></script>
<script type="text/javascript" src="js/classes/template/forms/wineForm.js?<%=ts %>"></script>

<script type="text/javascript" src="js/classes/template/templater.js?<%=ts %>"></script>
<script type="text/javascript" src="js/classes/app.js?<%=ts %>"></script>

<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link href="css/style.css" type="text/css" rel="stylesheet">

</head>
<body>
<div class="mainMenu">
<input type="button" name="add" value="Admin" onclick="showMenu('admin')" />
<input type="button" name="add" value="Kunde" onclick="getAllWine('costumer')" />
<input type="button" name="add" value="Warenkorb" onclick="getBasket()" />
</div>
<div class="subMenu"></div>
<div class="content"></div>
</body>

</html>
