Titanium.UI.setBackgroundColor('#000');
(function() {
	
	
	Ti.App.Properties.setString("backgroundId",Math.floor((Math.random() * 4) + 1));
	
	Ti.UI.setBackgroundImage("/images/bg/picturize-"+Ti.App.Properties.getString("backgroundId")+".jpg");
	
	var PicturizeSurvey = require("/control/controller");
	
	if(Titanium.App.Properties.getString("userId") !=null){
		PicturizeSurvey.start();
	}
	else{
		var LogIn = require('/view/login');
		LogIn.createLogInView();
	}

	function showMain(){
		PicturizeSurvey.start();
	}
	
	Ti.App.addEventListener('closeLogIn', showMain);		

})();
