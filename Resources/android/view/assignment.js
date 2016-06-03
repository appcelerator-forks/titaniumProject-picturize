function createAssigmentView(args){

	var self = Ti.UI.createView({
		backgroundColor:"#fff",
		top:0,
		left:0
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
		left:10
	});
	
	var Btn_MenuIcon = Ti.UI.createImageView({
		width:13,
		height:22,
		left:10,
		image:"/images/btn_back.png"
	});
	
	
	Btn_Menu.add(Btn_MenuIcon);
	Btn_Menu.addEventListener("click", function(){
		Ti.App.fireEvent("closeAssignmentView");
	});


	
	toolBar.add(Btn_Menu);	
	toolBar.add(toolBarBottomLine);	
	self.add(toolBar);
	
	
	/*Design*/
	
/*----- Top header -----*/
    var headerHolder = Ti.UI.createView({
        top:65,
        layout:"vertical"
    });

	var Label_header = Ti.UI.createLabel({
		text:args.object.title,
		height:Ti.UI.SIZE,
		width:300,
		top:15,
		left:10,
		right:10,
		color:"#000",
		font:{fontFamily: 'Nexa Bold',fontSize:25,fontWeight:'Bold'},
	});	
	
	var Label_DateStart = Ti.UI.createLabel({
		text:"Open: "+ moment(args.object.dateStart.iso).format('DD.MM.YYYY - h:mm'),
		left:10,
		top:20,
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
		color:"#878787"
	});
				
	var Label_DateEnd = Ti.UI.createLabel({
		text:"Close: " + moment(args.object.dateEnd.iso).format('DD.MM.YYYY - h:mm'),
		left:10,
		top:5,
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
		color:"#878787"
	});
	
	var splitLine = Ti.UI.createView({
		height:2,
		top:220,
		left:10,
		right:10,
		backgroundColor:"#969696"
	});
				

	/*----- Project info content -----*/
	var ProjectContent = Ti.UI.createScrollView({
		contentWidth:"100%",
		top:20,
		left:10,
		right:10,
		bottom:140,
		layout:"vertical"
	});
	
	var Label_Description = Ti.UI.createLabel({
		text:args.object.description,
		font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
		color:"#000",
		left:0
	});
	
	ProjectContent.add(Label_Description);
	
	
	headerHolder.add(Label_header);
	headerHolder.add(Label_DateStart);
	headerHolder.add(Label_DateEnd);
	headerHolder.add(ProjectContent);
		
	self.add(headerHolder);
	
	
	var btn_Camera = Ti.UI.createLabel({
		width:300,
		height:50,
		bottom:80,
		left:10,
		right:10,
		backgroundColor:"#7ed321",
		color:"#fff",
		font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
		text:"TAKE A PHOTO",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	
	var btn_Gallery = Ti.UI.createLabel({
		width:300,
		height:50,
		bottom:20,
		left:10,
		right:10,
		backgroundColor:"#7ed321",
		color:"#fff",
		font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
		text:"UPLOAD EXSISTING PHOTO",
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});	

	self.add(btn_Camera);
	self.add(btn_Gallery);
	
	
	
	
	var elementView;
	var element = require('/android/view/elements');
	btn_Camera.addEventListener("click",function(){
		
		element.createElementView({
			type:"image",
			action:"camera",
			assignment:args.object,
			surveyId:args.surveyId,
			success: function(_elementView) {
				elementView = _elementView;
				self.add(elementView);
			}
		});	
	});
	
	btn_Gallery.addEventListener("click",function(){

		element.createElementView({
			type:"image",
			action:"gallery",
			assignment:args.object,
			surveyId:args.surveyId,
			success: function(_elementView) {
				elementView = _elementView;
				self.add(elementView);
			}
		});	
	});
	
	
	Ti.App.addEventListener('closeElementView',function(e){
		self.remove(elementView);
		
	});

	args.success(self);	
};


exports.createAssigmentView = createAssigmentView;
