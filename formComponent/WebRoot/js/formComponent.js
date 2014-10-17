function FORMCOMPONENT(){
	//define Global vars
	var FORMGLOBAL = {
		naviDiv: ".holder",
		tableDiv: ".table",
		tableName: "",
		pageNum: 100,
		pageIndex: 1,
		perPage: 20,
		pageView: 2,
		previous: "<-前一页",
		next: "后一页->",
		headStr:"",
		url:""
	};

	this.formComponent = function(headStr,url){
			//update FORMGLOBAL
			FORMGLOBAL.headStr = headStr;
			FORMGLOBAL.url = url;
			FORMGLOBAL.previous = "前一页";
			FORMGLOBAL.next="下一页";
			//define vars
			var previous = FORMGLOBAL.previous;
			var next = FORMGLOBAL.next;
			var pageNum = FORMGLOBAL.pageNum;
			var pageIndex = FORMGLOBAL.pageIndex;
			var naviDiv = FORMGLOBAL.naviDiv;
			
			//generate all <a> elements for page navigation ,the number of <a> elements is pageNum
			var html = "<a class='ui_pageturn'>{previous}</a>".format({previous:previous})+"{0}<a class='ui_pageturn'>{next}</a>".format({next:next});
			for(var i = 0; i < pageNum; i++) html = html.format("<a class='ui_pageturn'>{i}</a>{0}".format({i:i+1}));
		    $(naviDiv).html(html.format(""));
		    $("a.ui_pageturn:eq("+pageIndex+")").addClass("a_select");
		    a_fold();
		    generateTable();
		   //add event to all <a> elements
		   $(naviDiv).delegate("a.ui_pageturn:lt("+(pageNum+1)+"):gt(0)","click",a_click);
		   $(naviDiv).delegate("a.ui_pageturn:first","click",function(){
				   var $obj = $("a.ui_pageturn.a_select").prev();
				   if($obj.text() != $(this).text()) $obj.click();
			   });
		   $(naviDiv).delegate("a.ui_pageturn:last","click",function(){
				   var $obj = $("a.ui_pageturn.a_select").next();
				   if($obj.text() != $(this).text()) $obj.click();
			   });
		}
	
	//<a> click function
	function a_click(event){
		//update FORMGLOBAL
		var pageIndex = parseInt($(this).text());
		FORMGLOBAL.pageIndex = pageIndex;
		//define vars
		var pageNum = FORMGLOBAL.pageNum;
		var pageView = FORMGLOBAL.pageView;
		var perPage = FORMGLOBAL.perPage;
		var tableDiv = FORMGLOBAL.tableDiv;
		var tableName = FORMGLOBAL.tableName;
		var headStr = FORMGLOBAL.headStr;
		var url = FORMGLOBAL.url;
		
		//remove style class
		$("a.ui_pageturn").removeClass("a_select");
		$("a.ui_pageturn:first,a.ui_pageturn:last").prop("disabled","false").removeClass("a_disable");
		//remove nodes
		$("span.ui_pageturn").remove();
		$("a.ui_pageturn").show();
		//select this element
		$(this).addClass("a_select");
		a_fold();
		
		generateTable();
	}
	
	//fold unnecessary items
	function a_fold(){
		var pageNum = FORMGLOBAL.pageNum;
		var pageView = FORMGLOBAL.pageView;
		var pageIndex = FORMGLOBAL.pageIndex;
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
	function generateTable(){
		var tableName = FORMGLOBAL.tableName;
		var tableDiv = FORMGLOBAL.tableDiv;
		var url = FORMGLOBAL.url;
		var perPage = FORMGLOBAL.perPage;
		var pageIndex = FORMGLOBAL.pageIndex;
		var headStr = FORMGLOBAL.headStr;
		
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
}
