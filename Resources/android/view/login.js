function createLogInView(){
	var Data = require('/services/data');
	var User = require('/model/User');
	
	var self = Ti.UI.createWindow({
		backgroundColor:"#fff",
		translucent:false,
		barColor:"#fff",
		fullscreen:false,
		navBarHidden:true
	});



/*** First view ***/

	var loginIntroHolder = Ti.UI.createView({
		backgroundImage:"/images/bg/intro/picturize-"+Ti.App.Properties.getString("backgroundId")+".jpg",
		top:0,
	});

	
	var label_headline = Ti.UI.createLabel({
		text:"Picturize. Visual insight.",
		font:{fontFamily:'Open Sanse',fontSize:23,fontWeight:'Bold'},
		color:"#4a4a4a",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		top:80
	});
	
	
	var label_headlineSub = Ti.UI.createLabel({
		text:"Customized survey for visual\ninsights.",
		font:{fontFamily:'Open Sanse',fontSize:20,fontWeight:'Regular'},
		color:"#4a4a4a",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		top:110
	});
	
	loginIntroHolder.add(label_headline);
	loginIntroHolder.add(label_headlineSub);

	var btn_createAccountEmail = Ti.UI.createLabel({
		height:50,
		left:20,
		right:20,
		backgroundColor:"#000",
		text:"SIGNUP WITH EMAIL",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		color:"#fff",
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Bold'},
		bottom:150
	});
	
	btn_createAccountEmail.addEventListener('click',function() {
				scrollableView.scrollToView(2);
		});	
	
	
	var btn_createAccountFacebook = Ti.UI.createLabel({
		height:50,
		left:20,
		right:20,
		backgroundColor:"#3b5998",
		text:"CONNECT WITH FACEBOOK",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		color:"#fff",
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Bold'},
		bottom:90
	});
	
	btn_createAccountFacebook.addEventListener('click',function() {
				
		});	
	
	var btn_alreadyUser = Ti.UI.createLabel({
		height:50,
		left:20,
		right:20,
		text:"Already signed up? Log in",
		color:"#fff",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Bold'},
		bottom:20
	});
	
	btn_alreadyUser.addEventListener('click',function() {
				scrollableView.scrollToView(1);
		});	
	
	loginIntroHolder.add(btn_createAccountEmail);
	//loginIntroHolder.add(btn_createAccountFacebook);
	loginIntroHolder.add(btn_alreadyUser);



/*** Log in form ***/
	var logInFormHolderWrapper = Ti.UI.createView({
		top:0,
		layout:"vertical"
	});
	
	var toolBar2 = Ti.UI.createView({
		top:0,
		left:0,
		height:65,
		backgroundColor:"#000"
	});
	
	var toolBarBottomLine = Ti.UI.createView({
		height:2,
		backgroundColor:"#7ed221",
		bottom:0
	});
	

	/*----- btn back -----*/
	var Btn_BackToSplash = Ti.UI.createView({
		width:45,
		height:45,
		top:15,
		left:10
	});
	
	var Btn_BackToSplashIcon = Ti.UI.createImageView({
		width:13,
		height:22,
		left:10,
		image:"/images/btn_back.png"
	});
	
	/*----- btn Log in  -----*/
	var Btn_LogIn = Ti.UI.createView({
		width:100,
		height:45,
		top:15,
		right:10
	});
	
	var Btn_LogInLabel = Ti.UI.createLabel({
			text:'NEXT',
			height:45,
			width:Ti.UI.SIZE,
			right:10,
			backgroundColor:"#000",
			borderRadius:3,
			font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Bold'},
			color:'#fff100',
			textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	
	Btn_LogIn.add(Btn_LogInLabel);
	
	
	Btn_BackToSplash.add(Btn_BackToSplashIcon);
	Btn_BackToSplash.addEventListener("click", function(){
		scrollableView.scrollToView(0);
	});
	
	toolBar2.add(Btn_BackToSplash);	
	toolBar2.add(Btn_LogIn);	
	
	
	logInFormHolderWrapper.add(toolBar2);
	

	var logInFormHolder = Ti.UI.createScrollView({
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		showHorizontalScrollIndicator: false,
		width: 320,
		top:0,
		layout:'vertical',
		backgroundColor:"#fff"
	});	

	logInFormHolderWrapper.add(logInFormHolder);
	
	var imgIntroText = Ti.UI.createLabel({
		text:"Log in",
		font:{fontFamily:'Open Sanse',fontSize:19,fontWeight:'Bold'},
		color:'#000',
		left:10,
		top:20
	});
	

	var inputHolder = Ti.UI.createView({
		width:"100%",
		height:Ti.UI.SIZE,
		backgroundColor:"#fff",
		top:25,
		left:0,
		layout:"vertical"
	});
	
	var splitLineDark8= Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});
	
	
	var userName = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		hintText:'E-mail',
		paddingLeft:15,
		color:"#b9b9b9",
		font:{fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
		top:0,
		autocorrect:false
	});
	
	var splitLineDark7 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});

	var userPassword = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		top:0,
		passwordMask:true,
		hintText:'Password',
		paddingLeft:15,
		color:"#b9b9b9",
		font:{fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
		autocorrect:false
	});
	
	var splitLineDark6 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});
	
	var btnHolder = Ti.UI.createView({
		width:"100%",
		height:112,
		backgroundColor:"#fff",
		top:2,
		left:0
	});
	

	var  buttonForgotPassword = Ti.UI.createButton({
			title:'  Forgot your password?  ',
			height:30,
			width:Ti.UI.SIZE,
			top:20,
			backgroundColor:"#fff",
			borderColor:"#fff",
			borderRadius:0,
			font:{fontFamily:'Open Sanse',fontSize:14,fontWeight:'Regular'},
			color:'#358095'
	});		
	
	buttonForgotPassword.addEventListener('click', function() {
		Ti.API.info("Forgot Password Button is pressed!");	
		
		var _User = {"email":userName.getValue()};
		Data.ResetPassword({
			payload:_User,
			success:function(response) {
				
				alert("Account recovery email sent to " + userName.getValue());
			},
			error:function(response) {
				alert(response.code+"\n"+response.error);
			}
		});
		
	});	
	
	Btn_LogIn.addEventListener('click',function() {
			
			var _User = new User.User(userName.getValue(),userPassword.getValue(),null);
		
			Data.UserLogin({
	   	 		payload:_User,
				success:function(response) {
				
					Titanium.App.Properties.setString("userId",response.objectId);
					Titanium.App.Properties.setString("userName",response.username);
						
					Ti.App.fireEvent('closeLogIn');	
				},
				error:function(response) {
					alert(response.code+"\n"+response.error);
				}
			});		
	});



	logInFormHolder.add(imgIntroText);
	
	logInFormHolder.add(inputHolder);
	logInFormHolder.add(btnHolder);
	
	inputHolder.add(splitLineDark8);
	inputHolder.add(userName);
	inputHolder.add(splitLineDark6);
	inputHolder.add(userPassword);
	inputHolder.add(splitLineDark7);

	btnHolder.add(buttonForgotPassword);

/*** Signup form ***/
/*----- Top Bar START -----*/

	var SignUpFormHolderWrap = Ti.UI.createView({
		top:0,
		layout:'vertical'
	});

	var toolBar = Ti.UI.createView({
		top:0,
		left:0,
		height:65,
		backgroundColor:"#000"
	});
	
	var toolBarBottomLine = Ti.UI.createView({
		height:2,
		backgroundColor:"#7ed221",
		bottom:0
	});
	

	/*----- btn back -----*/
	var Btn_Back = Ti.UI.createView({
		width:45,
		height:45,
		top:15,
		left:10
	});
	
	var Btn_BackIcon = Ti.UI.createImageView({
		width:13,
		height:22,
		left:10,
		image:"/images/btn_back.png"
	});
	
	
	Btn_Back.add(Btn_BackIcon);
	Btn_Back.addEventListener("click", function(){
		scrollableView.scrollToView(0);
	});
	
	toolBar.add(Btn_Back);
	
	
	/*----- btn create account -----*/
	var Btn_Submit = Ti.UI.createView({
		width:100,
		height:45,
		top:15,
		right:10
	});
	
	var Btn_SumbitLabel = Ti.UI.createLabel({
			text:'Submit',
			height:45,
			width:Ti.UI.SIZE,
			right:10,
			borderRadius:3,
			font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Bold'},
			color:'#7ed221',
			textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	
	Btn_Submit.add(Btn_SumbitLabel);
	
	Btn_Submit.addEventListener('click',function() {
		Btn_Back.opacity=0.5;
		Btn_Back.enabled=false;


			var _User = new User.User(signup_userEmail.getValue(),signup_userPassword.getValue(),signup_userEmail.getValue(),null,signup_userName.getValue(),signup_userLastName.getValue());
			
			Data.UserCreate({
	    		payload:_User,
				success:function(response) {
					signup_userName.setValue("");
					signup_userPassword.setValue("");
					signup_userEmail.setValue("");
					scrollableView.scrollToView(1);
				},
				error:function(response) {
					Btn_Back.opacity=1;
					Btn_Back.enabled=true;
					
					 alert(response.code+"\n"+response.error);
				}
			});
	});
	
	toolBar.add(Btn_Submit);
	
	toolBar.add(toolBarBottomLine);
	SignUpFormHolderWrap.add(toolBar);

	var SignUpFormHolder = Ti.UI.createScrollView({
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		showHorizontalScrollIndicator: false,
		width: 320,
		top:0,
		layout:'vertical'
	});	
	
	var signUpHeadline = Ti.UI.createLabel({
		text:"Create an account",
		font:{fontFamily:'Open Sanse',fontSize:19,fontWeight:'Bold'},
		color:'#000',
		left:10,
		top:20
	});
	
	var inputSignUpHolder = Ti.UI.createView({
		width:"100%",
		backgroundColor:"#fff",
		top:20,
		left:0,
		layout:'vertical'
	});

	var splitLineDark1 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});

	var signup_userName = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		top:0,
		hintText:'Firstname',
		paddingLeft:15,
		font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
		color:"#b9b9b9",
		autocorrect:false
	});
	
	var splitLineDark2 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});
	
	var signup_userLastName = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		top:0,
		hintText:'Lastname',
		paddingLeft:15,
		font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
		color:"#b9b9b9",
		autocorrect:false
	});

	var splitLineDark5 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});

	var signup_userPassword = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		top:0,
		hintText:'Password',
		paddingLeft:15,
		font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
		color:"#b9b9b9",
		passwordMask:true,
		autocorrect:false
	});
	
	var splitLineDark3 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});


	var signup_userEmail = Ti.UI.createTextField({
		width:"100%",
		height:50,
		backgroundColor:'#fff',
		borderColor:'#fff',
		borderWidth:0,
		top:0,
		hintText:'E-mail',
		paddingLeft:15,
		font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
		color:"#b9b9b9",
		autocorrect:false
	});		
	
	var splitLineDark4 = Ti.UI.createView({
		height:1,
		backgroundColor:'#cfcfcf',
		top:0
	});
	
	
	
	
	
	
	SignUpFormHolderWrap.add(SignUpFormHolder);	
	SignUpFormHolder.add(signUpHeadline);
	SignUpFormHolder.add(inputSignUpHolder);
	
	inputSignUpHolder.add(splitLineDark1);
	inputSignUpHolder.add(signup_userName);
	inputSignUpHolder.add(splitLineDark2);
	inputSignUpHolder.add(signup_userLastName);
	inputSignUpHolder.add(splitLineDark5);
	inputSignUpHolder.add(signup_userPassword);
	inputSignUpHolder.add(splitLineDark3);
	inputSignUpHolder.add(signup_userEmail);
	inputSignUpHolder.add(splitLineDark4);
	
	

	var scrollableView = Ti.UI.createScrollableView({
	  views:[loginIntroHolder,logInFormHolderWrapper,SignUpFormHolderWrap],
	  showPagingControl:false,
	  scrollingEnabled:false
	});

	self.add(scrollableView);

	self.open();
}
exports.createLogInView = createLogInView;