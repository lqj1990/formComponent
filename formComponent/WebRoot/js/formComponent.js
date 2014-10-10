$.extend({
	//naviDiv:the holder div
	//pageNum:the number of pages
	//pageIndex:the Index of current page
	//perPage:the number of items in one page
	//pageView:the scope of view
	//previous:the string represents last page
	//next:the string represents next page
	newNavi:function(naviDiv, tableDiv, pageNum, pageIndex, perPage, pageView, previous, next, tableName, headStr,url){
		//根据参数生成导航条所需要的所有超链接
		var html = "<a class='ui_pageturn'>" + previous + "</a>";
		for(var i = 0; i < pageNum; i++) html = html + "<a class='ui_pageturn'>" + (i+1) + "</a>";
		html = html + "<a class='ui_pageturn'>" + next + "</a>";
	    $(naviDiv).html(html);
	    $("a.ui_pageturn:eq("+pageIndex+")").addClass("a_select");
	    a_fold(pageNum , pageIndex, pageView);
	    var params = {
    			"pageNum":pageNum,
    			"pageView":pageView,
    			"perPage":perPage,
    			"tableDiv":tableDiv,
    			"tableName":tableName,
    			"headStr":headStr,
    			"url":url
    		};
	   $(naviDiv).delegate("a.ui_pageturn:lt("+(pageNum+1)+"):gt(0)","click",params,a_click);
	   $(naviDiv).delegate("a.ui_pageturn:first","click",params,function(event){
		   var $obj = $("a.ui_pageturn.a_select").prev();
		   if($obj.text() != $(this).text()) $obj.click();
		   });
	   $(naviDiv).delegate("a.ui_pageturn:last","click",params,function(event){
		   var $obj = $("a.ui_pageturn.a_select").next();
		   if($obj.text() != $(this).text()) $obj.click();
		   });
	}
});

//a click function
function a_click(event){
	//define vars
	var pageNum = event.data.pageNum;
	var pageView = event.data.pageView;
	var pageIndex = parseInt($(this).text());
	var perPage = event.data.perPage;
	var tableDiv = event.data.tableDiv;
	var tableName = event.data.tableName;
	var headStr = event.data.headStr;
	var url = event.data.url;
	
	//remove style class
	$("a.ui_pageturn").removeClass("a_select");
	$("a.ui_pageturn:first,a.ui_pageturn:last").prop("disabled","false").removeClass("a_disable");
	//remove nodes
	$("span.ui_pageturn").remove();
	$("a.ui_pageturn").show();
	
	$(this).addClass("a_select");
	a_fold(pageNum , pageIndex, pageView);
	
	generateTable(headStr,tableName,tableDiv,url,pageIndex,perPage);
}

//fold unnecessary items
function a_fold(pageNum, pageIndex, pageView){
	if(pageIndex == 1) $("a.ui_pageturn:first").prop("href","javascript:void(0)").attr("disabled","true").addClass("a_disable");
	else if(pageIndex == pageNum) $("a.ui_pageturn:last").prop("href","javascript:void(0)").addClass("a_disable");
	if(pageNum > 1+2*pageView ){
		if(pageIndex > pageNum-pageView) $("a.ui_pageturn:lt("+(pageNum-2*pageView)+"):gt(1)").hide();
		else if(pageIndex > pageNum-2*pageView) $("a.ui_pageturn:lt("+(pageIndex-pageView)+"):gt(1)").hide();
		else if(pageIndex > 2*pageView) $("a.ui_pageturn:lt("+pageNum+"):gt("+(pageIndex+pageView)+"),a.ui_pageturn:lt("+(pageIndex-pageView)+"):gt(1)").hide();
        else if(pageIndex > pageView+1) $("a.ui_pageturn:lt("+pageNum+"):gt("+(pageIndex+pageView)+")").hide();
        else $("a.ui_pageturn:lt("+pageNum+"):gt("+(1+2*pageView)+")").hide();
    	$("a.ui_pageturn:hidden:first,a.ui_pageturn:hidden:last").before("<span class='ui_pageturn'>...</span>");
    }
}

//generate table
function generateTable(headStr,tableName,tableDiv,url,pageIndex,perPage){
	var tableStr = "<table class='{tablename}_table'><thead class='{tablename}_thead'>{tablehead}</thead><tbody class='{tablename}_tbody'>{tableboby}</tbody><table>";
	var trStr = "<tr class='{tablename}_tr' id='{trid}'>{tr}</tr>";
	var thStr = "<th class='{tablename}_th'>{th}</th>";
	var tdStr = "<td class='{tablename}_td'>{td}</td>";
	var tableHead = "";
	var tableBody = "";
	var headArray = headStr.split(",");
	for(var i=0; i<headArray.length; i++) tableHead = tableHead+thStr.format({tablename:tableName,th:headArray[i]});
	tableHead = trStr.format({tablename:tableName,tr:tableHead});
	$.ajax({
		type:"get",
		url:url,
		data:"pageIndex="+pageIndex+"&perPage="+perPage,
		success:function(data){
			var myobj = eval(data);
			for(var i=0; i<myobj.length; i++){
				var tdArray = eval(myobj[i].data);
				var tdContent = "";
				for(var j=0; j<tdArray.length; j++)	tdContent = tdContent + tdStr.format({tableName:tableName, td:tdArray[j]});
				tableBody = tableBody + trStr.format({tableName:tableName, trid:myobj[i].id, tr:tdContent});
			};
			tableStr = tableStr.format({tablename:tableName,tablehead:tableHead,tableboby:tableBody});
			$(tableDiv).html(tableStr);
		}
	});
}