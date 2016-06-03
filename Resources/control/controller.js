var mainWindow;
function start(){
	
	var slideController = require('dk.napp.slidemenu');
	
	var homeView = require('/view/home').view();
	var navigation = require("/view/navigation");
		
	/*----- Left Navigation START-----*/
	var leftNavigation = Ti.UI.createWindow({
	    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
	    translucent:true,
        tintColor:"#fff",
        barColor:"#fff",
		backgroundColor:"#2f2f2f"
	});
	leftNavigation.add(navigation.createLeftNavigation());



	/*----- Content START-----*/
	var	content = Ti.UI.createWindow({
	    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		backgroundColor:"#fff",
		translucent:true,
		tintColor:"#fff",
        barColor:"#fff",
        backgroundImage:"/images/bg/picturize-"+Ti.App.Properties.getString("backgroundId")+".jpg"
	});
	content.add(homeView);	
	
	/*----- Content END-----*/
	mainWindow = slideController.createSlideMenuWindow({
		centerWindow:content,
		leftWindow:leftNavigation,
		leftLedge:50,
		statusBarStyle:slideController.STATUSBAR_WHITE
	});	
	
	mainWindow.setParallaxAmount(0.3);

	/*----- Events START-----*/


	/*----- Open view ----*/
	Ti.App.addEventListener('openView',function(e){
		
		if(e.view === "signout"){
			var fb = require('facebook');
			fb.addEventListener('logout', function(e) {
			    alert('Logged out');
			    restart();
			});
			fb.logout();
		}
		else{
			var newView = require("/view/"+e.view).view();
			mainWindow.setCenterWindow(newView);
			mainWindow.toggleLeftView();
		}
	});
	
	/*----- Back to view ----*/
	Ti.App.addEventListener('backToView',function(e){
		var newView = require("/view/"+e.view).view();
		mainWindow.setCenterWindow(newView);
	});
	
	/*----- Open leftNavigation ----*/
	Ti.App.addEventListener('openLeftNavigation',function(e){
		mainWindow.toggleLeftView();
	});
	
	
	/*----- Open Login ----*/
	Ti.App.addEventListener('openLogin',function(e){
		var newView = require("/view/login").view();
		mainWindow.setCenterWindow(newView);
	});
	
	/*----- Open Project ----*/
	Ti.App.addEventListener('openProject',function(e){
		var newProject = require("/window/Project").createWindow({
			object:e.project,
			success: function(projectWindow) {
			 projectWindow.open();
		  }
		});
		
	});
	
	
	/*----- Open Home ----*/
	Ti.App.addEventListener('openHome',function(e){
		var home = require("/view/home").view();
		mainWindow.setCenterWindow(home);
	});
	

	
	mainWindow.open();
};

function restart(){
	mainWindow.close();
	mainWindow = null;
	start();
};

exports.start = start;
exports.restart = restart;