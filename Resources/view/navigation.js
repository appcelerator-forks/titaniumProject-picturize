/*----- Main navigation : Left slide -----*/
function createLeftNavigation(args){
	var menuItems =[
		{title:"PROJECTS",view:"home",requireLogin:false},
		{title:"ACTIVATION CODE",view:"activation",requireLogin:false}
		//{title:"ABOUT",view:"about",requireLogin:false},
		//{title:"Sign out",view:"signout",requireLogin:true}
		];
		
	var menuRows=[];	
	for (var i=0; i < menuItems.length; i++) {
	  	var menuItem = menuItems[i];
	  	
	  	var row = Ti.UI.createTableViewRow({
	  		width:230,
	  		left:0,
	  		top:0,
	  		height:50,
	  		hasChild:true,
	  		className:"leftNavigation",
	  		backgroundSelectedColor:'transparent',
	  		selectedBackgroundColor:"transparent",
			selectedColor:"transparent",
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			_view:menuItem.view
	  	});
	  	
	  	var rowBottomLine = Ti.UI.createView({
	  		height:1,
	  		bottom:0,
	  		backgroundColor:"#3a3a3a"
	  	});
	  	
	  	var rowTitle = Ti.UI.createLabel({
	  		left:0,
	  		text:menuItem.title.toUpperCase(),
	  		height:Ti.UI.SIZE,
			color:"#fff",
			font:{fontFamily: 'Nexa Bold',fontSize:14,fontWeight:'Bold'},
	  	});
	  	row.add(rowTitle);
	  	row.add(rowBottomLine);
	  	
	  	menuRows.push(row);
	};	
	
	var menuTable = Ti.UI.createTableView({
		width:245,
		backgroundColor:'transparent',
		top:16,
		left:15,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		separatorColor: 'transparent',
	});
	
	menuTable.setData(menuRows);
	
	menuTable.addEventListener("click",function(e){
		Ti.App.fireEvent("openView",{view:e.row._view});
	});
	
	return menuTable;
};


exports.createLeftNavigation = createLeftNavigation;