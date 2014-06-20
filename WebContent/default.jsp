<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>


<%
	//long ts = (new Date()).getTime();
	long ts = 1;
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Insert title here</title>





<script src="lib/jquery-2.1.1.js"></script>
<link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="lib/font-awesome-4.1.0/css/font-awesome.min.css"
	rel="stylesheet">
<link href="css/style.css" type="text/css" rel="stylesheet">
<script src="lib/bootstrap/js/bootstrap.min.js"></script>


<script type="text/javascript" src="js/menu.js?<%=ts%>"></script>





<div class="imports"></div>
<script type="text/javascript" src="js/classes/Actions.js?<%=ts%>"></script>
<script type="text/javascript" src="js/classes/Cache.js?<%=ts%>"></script>
<script type="text/javascript" src="js/classes/RequestCtrl.js?<%=ts%>"></script>
<script type="text/javascript" src="js/classes/Cart.js?<%=ts%>"></script>

<script type="text/javascript"
	src="js/classes/template/tables/wineTable.js?<%=ts%>"></script>
<script type="text/javascript"
	src="js/classes/template/tables/cartTable.js?<%=ts%>"></script>
<script type="text/javascript"
	src="js/classes/template/tables/wineTableCostumer.js?<%=ts%>"></script>
<script type="text/javascript"
	src="js/classes/template/forms/wineForm.js?<%=ts%>"></script>
<script type="text/javascript"
	src="js/classes/template/tables/orderList.js?<%=ts%>"></script>
<script type="text/javascript"
	src="js/classes/template/templater.js?<%=ts%>"></script>
<script type="text/javascript" src="js/classes/app.js?<%=ts%>"></script>



</head>
<body>
	<div class="mainMenu"></div>
	<div class="row title">
		<h1>Wine-Ing</h1>
	</div>
	<div class="content well"></div>

	<!-- Modal -->
	<div class="modal hide fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Warenkorb</h4>
				</div>
				<div class="modal-body">
								<form  onsubmit="WineIng.action.generateOrderList()">
				
					<div class="modal-content-window"></div>
				</div>
				<div class="modal-footer">
					<button type="button" onclick="WineIng.cart.clearCart()" class="btn btn-small btn-warning emptyCartBtn"><i class="fa fa-trash-o"></i>   Warenkorb ausleeren</button>
					<button type="submit" class="btn btn-large btn-success orderBtn"><i class="fa fa-paper-plane"></i>   Bestellen</button>
					</div>
				</form>
			</div>
		</div>
	</div>


</body>

</html>
