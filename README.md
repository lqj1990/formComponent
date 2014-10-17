formComponent
=============

form paginaiton witten by jquery

This component allow user define the number of page, the index of page, and the number of items on one page freely and use Ajax techenique to exchange data with Server.

how to use:
1. create \<div class="holder"\> to hold navigation bar and create \<div class="table"\> to hold data
2. write javascript :
      var s = new FORMCOMPONENT();
	s.formComponent(headStr,"servlet/XXXX");
3. create servlet XXXX which process request from browser and output json string with fomat[{id:"xx",data:["x","x"]}], the brower post 2 parameters which are pageIndex and perPage
