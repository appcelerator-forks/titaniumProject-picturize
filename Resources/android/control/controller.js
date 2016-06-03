var mainWindow;
function start(){
	
	var slideController = require('dk.napp.drawer');
	
	
	var homeView = require('/view/home').view();
	var navigation = require("/view/navigation");
		
	/*----- Left Navigation START-----*/
	var leftNavigation = Ti.UI.createView({
		backgroundColor:"#2f2f2f"
	});
	leftNavigation.add(navigation.createLeftNavigation());

	
	
	/*----- Content START-----*/
	var	content = Ti.UI.createView({
		backgroundColor:"#fff",
        backgroundImage:"/images/bg/picturize-"+Ti.App.Properties.getString("backgroundId")+".jpg"
	});
	content.add(homeView);	
	
	/*----- Content END-----*/
	
	mainWindow = slideController.createDrawer({
    fullscreen:true, 
    leftWindow: leftNavigation,
    centerWindow: content,
    fading: 0.2, // 0-1
    parallaxAmount: 0.2, //0-1
    shadowWidth:"40dp", 
    leftDrawerWidth: "200dp",
    animationMode: slideController.ANIMATION_NONE,
    closeDrawerGestureMode: slideController.CLOSE_MODE_MARGIN,
    openDrawerGestureMode: slideController.OPEN_MODE_ALL,
    orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
});
	


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
			mainWindow.toggleLeftWindow();
		}
	});
	
	/*----- Back to view ----*/
	Ti.App.addEventListener('backToView',function(e){
		var newView = require("/view/"+e.view).view();
		mainWindow.setCenterWindow(newView);
	});
	
	/*----- Open leftNavigation ----*/
	Ti.App.addEventListener('openLeftNavigation',function(e){
		mainWindow.toggleLeftWindow();
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