var Data = require("/services/data");

function view(args){
	var self = Ti.UI.createView({
		top:0,
		left:0,
		backgroundImage:"/images/bg/picturize-"+Ti.App.Properties.getString("backgroundId")+".jpg",
		layout:"vertical"
	});
	
	/*----- Top Bar START -----*/
	var toolBar = Ti.UI.createView({
		top:0,
		left:0,
		height:65,
		backgroundColor:"#000"
	});
	
	var toolBarBottomLine = Ti.UI.createView({
		height:2,
		backgroundColor:"#fff100",
		bottom:0
	});
	
	/*----- btn Menu -----*/
	var Btn_Menu = Ti.UI.createView({
		width:45,
		height:45,
		top:15,
		left:5
	});
	
	var Btn_MenuIcon = Ti.UI.createImageView({
		width:33,
		height:30,
		image:"/images/btn_menu.png"
	});
	
	Btn_Menu.add(Btn_MenuIcon);
	Btn_Menu.addEventListener("click", function(){
		Ti.App.fireEvent("openLeftNavigation");
	});
	
	
	

	/*----- Todays word -----*/
	var Label_todaysWord = Ti.UI.createLabel({
		text:("Picturize").toUpperCase(),
		bottom:15,
		color:"#fff",
		font:{fontFamily: 'Nexa Bold',fontSize:14,fontWeight:'Bold'},
	});
	
	
	
	/*----- Table with surveys that user has access to.  -----*/
	var Table = require('/ui/Table');
	Ti.API.log("Create table");
	Table.createSurveyList({
		success: function(TableObject) {
			self.add(TableObject);
		}
	});
	
	
	toolBar.add(Btn_Menu);	

	toolBar.add(toolBarBottomLine);		
	self.add(toolBar);
	
	return self;
};

exports.view = view;