<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'testFormComponent.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="js/formComponent.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<style>
		a.ui_pageturn{
			text-decoration: none;
			hover: auto;
		}
		
		a.ui_pageturn:hover, .a_select{
			color: red;
			text-decoration: none;
		}
		
		.a_disable{
			color: grey;
			text-decoration: none;
		}
		
		._table{
			border: grey solid 1px;
			border-collapse: collapse;
		}
	</style>
	
	<script>
		$(document).ready(function(){
		    /*$.newNavi(".holder",".table",100,1,20,2,"<-前一页","后一页->","","cityId,cityName,provinceId,cityOrder","servlet/test");*/
			/*$.newNavi("cityId,cityName,provinceId,cityOrder","servlet/test");*/
			var s = new FORMCOMPONENT();
			s.formComponent("cityId,cityName,provinceId,cityOrder","servlet/test");
		});
	</script>
</head>
  
  <body>
    <div class="holder"></div>
    <div class="table"></div>
  </body>
</html>
