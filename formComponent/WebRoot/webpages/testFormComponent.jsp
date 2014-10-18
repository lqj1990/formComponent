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
	<script type="text/javascript" src="js/formComponent.js" charset='UTF-8'></script>
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
		
		.tr_selected{
			background-color: grey;
		}
	</style>
	
	<script>
		$(document).ready(function(){
			var s = new FORMCOMPONENT();
			s.setGlobal({pageIndex:2, pageNum:50});
			s.formComponent("cityId,cityName,provinceId,cityOrder","servlet/test",{x:1});
			$("#test1").click(function(){
				var a = s.getSelectedRowsId();
				if(a != null){
					for(var i=0;i<a.length;i++){
						alert(a[i]);
					}
				}
			});
			$("#test2").click(function(){
				s.enableMultiSeleted(false);
			});
			$("#test3").click(function(){
				s.attachSelectEvent(function(){alert("绑定成功")});
			});
		});
	</script>
</head>
  
  <body>
    <div class="holder"></div>
    <div class="table"></div>
    <input type="button" id="test1" value="获取选中项的id"/>
    <input type="button" id="test2" value="设置mulitiSelect"/>
    <input type="button" id="test3" value="绑定事件"/>
  </body>
</html>
