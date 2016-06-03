function showProjectById(args){
	var moment = require('/lib/moment');
    moment.lang("en");
    
	var Countdown = require('/ui/Countdown');
	var Assigments = require('/view/assignmentList');
	
	
	var self = Ti.UI.createWindow({
		backgroundColor:"#fff",
		_object:args.object,
		transform:Titanium.UI.create2DMatrix().scale(0),
        opacity:0
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
		Ti.App.fireEvent("openHome");
	});

	var  ProjectBtnNext = Ti.UI.createButton({
			title:'NEXT',
			height:45,
			width:Ti.UI.SIZE,
			top:18,
			right:10,
			backgroundColor:"#000",
			font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
			color:'#fff100'
	});	
	
	

	/*----- Top header -----*/
	var headerHolder = Ti.UI.createView({
	    top:65,
	    layout:"vertical"
	});
	
	
	var Label_header = Ti.UI.createLabel({
//		text:args.object.initialTitle.toUpperCase(),
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
	
	headerHolder.add(Label_header);
	headerHolder.add(Label_DateStart);
	headerHolder.add(Label_DateEnd);

	/*----- Project info content -----*/
	var ProjectContent = Ti.UI.createScrollView({
		contentWidth:"100%",
		top:20,
		left:10,
		right:10,
		layout:"vertical"
	});
	
	var Label_Description = Ti.UI.createLabel({
		text:args.object.description,
		font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Regular'},
		color:"#000",
		left:0
	});
	
	ProjectContent.add(Label_Description);
	
	
	/*----- Project next page (assigments) -----*/
	var AssigmentList;
	var AssigmentListIsSet = false;
	ProjectBtnNext.addEventListener("click",function(e){
		Ti.API.info('/////// Assignment List //////////');	
		Ti.API.info(args);	
		Assigments.createAssignmentListView({
			surveyId:args.object.objectId,
			surveyObject:args.object,
			success: function(_AssigmentList) {
				AssigmentListIsSet= true;
				AssigmentList = _AssigmentList;
				self.add(AssigmentList);
			}
		});
	});
	
	toolBar.add(Btn_Menu);	
	toolBar.add(toolBarBottomLine);	
	toolBar.add(ProjectBtnNext);	
	self.add(toolBar);

    headerHolder.add(ProjectContent);
	self.add(headerHolder);

	


	
	/*----- Open Assignment ----*/
	 var assigmentView;
    Ti.App.addEventListener('openAssignment',function(e){
       
        var element = require('/android/view/elements');
        
            element.createElementView({
                assignment:e.assignment,
                type:"image",
                surveyId:e.surveyId,
                success: function(_elementEditView) {
                    assigmentView = _elementEditView;
                    self.add(assigmentView);
                }
            }); 
    }); 
    
    Ti.App.addEventListener('openMultiAssignment',function(e){
       
        var element = require('/android/view/elements');
            element.createElementView({
                assignment:e.assignment,
                type:"image",
                surveyId:e.surveyId,
                success: function(_elementEditView) {
                    assigmentView = _elementEditView;
                    self.add(assigmentView);
                }
            }); 
    });
		
	Ti.App.addEventListener('closeElementView',function(e){
		self.remove(assigmentView);
	});
	
	Ti.App.addEventListener('closeAssignmentListView',function(e){
		if(AssigmentListIsSet){
		self.remove(AssigmentList);
		}
	});
	
	/*---- Edit assignment ----*/
	var assignmentEditView;
	var assignmentEditViewIsSet=false;
	
	var element = require('/android/view/elements');
	Ti.App.addEventListener('editAssignment',function(e){
	    assignmentEditViewIsSet=true;
       element.editElementView({
            type:"image",
            assignment:e.assignment,
            answerObject:e.answer,
            surveyId:e.surveyId,
            success: function(_elementEditView) {
                assignmentEditView = _elementEditView;
                self.add(assignmentEditView);
            }
        }); 
    }); 
	
	Ti.App.addEventListener('closeElementEditView',function(e){
	    Ti.App.fireEvent("updateAssignmentView");
	    
        if(assignmentEditViewIsSet){
            self.remove(assignmentEditView);
        }
    });
	
	args.success(self);
};

exports.showProjectById = showProjectById;





