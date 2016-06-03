var Data = require("/services/data");

/* 
var thumb = Ti.UI.createImageView({
		top: '0',
		zIndex: 2,
		backgroundColor:'#000',
		borderColor: '#000',
		borderRadius: 2,
		borderWidth: 3,
		left:0,
		width:100,
		height:100,
	});
*/		
		
var progressBar = Ti.UI.createProgressBar({
		min: 0, 
		max: 1, 
		value: 0, 
		message: "Uploading...", 
		width: 250,
		height:50, 
		color: "#333", 
		shadowColor: "#000", 
		shadowOffset: {x:0, y:-1}, 
		font:{fontFamily: 'Nexa Bold',fontSize:12,fontWeight:'Bold'},
//		style:Ti.UI.iPhone.ProgressBarStyle.BAR,
		tintColor:"#333",
		visible:false
});	

function createElementView(args){

    if(args.type === "image"){
        
        var elementHolder = Ti.UI.createView({
            top:0,
            left:0
        });
        
        var self = Ti.UI.createView({
            top:0,
            left:0,
            layout:"vertical",
        });
        
        elementHolder.add(self);
        
        var selfScroll =  Ti.UI.createScrollView({
            contentWidth:"100%",
            top:0,
            left:0,
            layout:"vertical",
            backgroundColor:"#fff",
            scrollType:"vertical"
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
            Ti.App.fireEvent("closeElementView");
        });
    
        var  btn_Upload = Ti.UI.createButton({
            title:'NEXT',
            height:45,
            width:Ti.UI.SIZE,
            top:15,
            right:10,
            backgroundColor:"#000",
            borderRadius:3,
            font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
            color:'#fff100'
        }); 
    
    
        toolBar.add(Btn_Menu);  
        toolBar.add(btn_Upload);    
        toolBar.add(toolBarBottomLine); 
        self.add(toolBar);
        
        
        /*----- Assignment headline -----*/
        var Label_header = Ti.UI.createLabel({
            text:args.assignment.title,
            height:Ti.UI.SIZE,
            width:300,
            top:20,
            left:10,
            right:10,
            color:"#000",
            font:{fontFamily: 'Nexa Bold',fontSize:30,fontWeight:'Bold'},
        }); 
        
        var descHolder = Ti.UI.createView({
            top:10,
            height:Ti.UI.SIZE
        });
        
        var desc = Ti.UI.createLabel({
            top:10,
            height:Ti.UI.SIZE,
            left:10,
            right:10,
            text:args.assignment.description.substring(0,100) + "... Read more",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:'#333'
        });
        descHolder.add(desc);
       
       
     
        var descFullView = Ti.UI.createView({
            top:0,
            left:0,
            visible:false
        });
        
        
        var descFullViewBlur = Ti.UI.createView({
            top:0,
            left:0,
            backgroundColor:"#333",
            opacity:0.95,
            zIndex:1
        });  
        
         var descLabel_header = Ti.UI.createLabel({
            text:args.assignment.title,
            height:Ti.UI.SIZE,
            top:30,
            left:20,
            right:20,
            color:"#000",
            font:{fontFamily: 'Nexa Bold',fontSize:30,fontWeight:'Bold'},
        });  
        
         var descFullViewContent = Ti.UI.createView({
            left:0,
            height:Ti.UI.SIZE,
            backgroundColor:"#fff",
            zIndex:10,
            layout:"vertical",
        });   
        
        
         var descFull = Ti.UI.createLabel({
            top:30,
            bottom:50,
            height:Ti.UI.SIZE,
            left:20,
            right:20,
            text:args.assignment.description,
            font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Regular'},
            color:'#333'
        });
        
        descFullView.add(descFullViewBlur);
        descFullView.add(descFullViewContent);
        descFullViewContent.add(descLabel_header);
        descFullViewContent.add(descFull);
        
        elementHolder.add(descFullView);
        
       desc.addEventListener("click",function(){
           descFullView.show();
       });
       
       descFullViewBlur.addEventListener("click",function(){
           descFullView.hide();
       });
       
       descFullViewContent.addEventListener("click",function(){
           descFullView.hide();
       });
         
        
        selfScroll.add(Label_header);
        selfScroll.add(descHolder);

        
        /*----- Assignment Image -----*/
        var splitLine = Ti.UI.createView({
            height:1,
            top:15,
            backgroundColor:"#e1e1e1"
        });
        
        var imageHolder = Ti.UI.createView({
            backgroundColor:"#f6f7f7",
            top:0,
            height:180,
            _imageIsSet:true,
            _imageUrl:""
        });
        
         var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:"/images/defaultImage.png"
        });
        
        
        assignmentImage.addEventListener("click",function(e){
            
            var dialog = Ti.UI.createOptionDialog({
              cancel: 3,
              options: ['Show image','Take a picture', 'Upload from gallery', 'Cancle'],
              selectedIndex: 2,
              destructive: -1
            });
        
            dialog.addEventListener('click', function (e) {
                    if (e.cancel !== true || e.index === e.cancel) {
                        switch (e.index) {
                        case 0:
                            var fullView = Ti.UI.createView({
                                backgroundColor:"#000",
                                top:0,
                                left:0,
                                zIndex:999
                            });
                            
                             var img = Ti.UI.createImageView({
                                 image:assignmentImage.image,
                                 width:300
                            });
                            
                            fullView.add(img);
                            
                            elementHolder.add(fullView);
                            
                            img.addEventListener("click",function(){
                                elementHolder.remove(fullView);
                            });
                            break;
                        case 1:
                        
                             imageHolder.remove(assignmentImage);
                        
                             showCamera({
                                type:"picture",
                                success:function(image,mediaObject){
                                    
                                    imageHolder.removeAllChildren();
                                
                                    var assignmentImage = Ti.UI.createImageView({
                                        height:170,
                                        image:mediaObject
                                    });
                                    
                                    imageHolder.add(assignmentImage);
                                    imageHolder._imageIsSet =true;
                                    imageHolder._imageUrl=image.url;
                                    
                                    btn_Upload.visible = true;
                                    
                                }
                            }); 
                            break;
                            
                        case 2:      
                         imageHolder.remove(assignmentImage);
                        showLibrary({
                            type:"picture",
                            success:function(image,mediaObject){
                                imageHolder.removeAllChildren();
                            
                                var assignmentImage = Ti.UI.createImageView({
                                    height:170,
                                    image:mediaObject
                                });
                                
                                imageHolder.add(assignmentImage);
                                imageHolder._imageIsSet =true;
                                imageHolder._imageUrl=image.url;
                                
                                btn_Upload.visible = true;
            
                            }
                        }); 
 
                            break;
                        }
                    }
                });
            
             dialog.show(); 

        });
        
        
        imageHolder.add(assignmentImage);
        imageHolder.add(progressBar);
//        imageHolder.add(thumb);
        
        var splitLine2 = Ti.UI.createView({
            height:1,
            top:0,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(splitLine);
        selfScroll.add(imageHolder);
        selfScroll.add(splitLine2);
        
        /*----- Assignment comment 1 -----*/
       
       
       var splitLine3a = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
       
       var commentFieldLabel = Ti.UI.createLabel({
            text:"What's on the picture?",
            font:{fontFamily:'Open Sanse',fontSize:18,fontWeight:'Bold'},
            color:'#000',
            left:10,
            top:20
        });
       
       var flexSpace = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
       
        var done = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.DONE
        });
        var commentField = Ti.UI.createTextArea({
            value :"Write your answer here",
            top:5,
            left:10,
            right:10,
            height:40,
            backgroundColor:"#fff",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:"#333",
            scrollable:true,
            suppressReturn:false,
            tintColor:'#333',
            keyboardToolbar:[flexSpace,done]
        });
        
		commentField._hintText = commentField.value;
		 
		commentField.addEventListener('focus',function(e){
		    if(e.source.value == e.source._hintText){
		        e.source.value = "";
		    }
		});
		commentField.addEventListener('blur',function(e){
		    if(e.source.value==""){
		        e.source.value = e.source._hintText;
		    }
		});
        
        done.addEventListener("click",function(){
            commentField.blur();
        });       
       
       commentField.addEventListener("focus",function(){
            commentField.setHeight(200);
        });    
              
        commentField.addEventListener("blur",function(){
            commentField.height=Ti.UI.SIZE;
        });        
                
        var splitLine3 = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(commentFieldLabel);
        selfScroll.add(splitLine3a);
        selfScroll.add(commentField);
        selfScroll.add(splitLine3);
        
        
        /*----- Assignment comment 2 -----*/
       
       
       var splitLine3b = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
       
       var commentFieldLabel2 = Ti.UI.createLabel({
            text:"Why did you take this picture?",
            font:{fontFamily:'Open Sanse',fontSize:18,fontWeight:'Bold'},
            color:'#000',
            left:10,
            top:40
        });
       
       var flexSpace2 = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
       
        var done2 = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.DONE
        });
        var commentField2 = Ti.UI.createTextArea({
            value :"Write your answer here",
            top:5,
            left:10,
            right:10,
            height:40,
            backgroundColor:"#fff",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:"#333",
            scrollable:true,
            suppressReturn:false,
            tintColor:'#333',
             keyboardToolbar:[flexSpace2,done2]
        });
        
        commentField2._hintText = commentField2.value;
		 
		commentField2.addEventListener('focus',function(e){
		    if(e.source.value == e.source._hintText){
		        e.source.value = "";
		    }
		});
		commentField2.addEventListener('blur',function(e){
		    if(e.source.value==""){
		        e.source.value = e.source._hintText;
		    }
		});
        
        done2.addEventListener("click",function(){
            commentField2.blur();
        });       
        commentField2.addEventListener("focus",function(){
            commentField2.setHeight(200);
        });    
       
        commentField2.addEventListener("blur",function(){
            commentField2.height=Ti.UI.SIZE;
        }); 
                
        var splitLine3c = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(commentFieldLabel2);
        selfScroll.add(splitLine3b);
        selfScroll.add(commentField2);
        selfScroll.add(splitLine3c);
        
        
        /*----- Assignment comment END -----*/
        
    
        if(args.action ==="camera"){ 
            showCamera({
                type:"picture",
                success:function(image,mediaObject){
                    
                    imageHolder.removeAllChildren();
                
                    var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:mediaObject
                    });
                    
                    imageHolder.add(assignmentImage);
                    imageHolder._imageIsSet =true;
                    imageHolder._imageUrl=image.url;
                    
                    btn_Upload.visible = true;
                    
                }
            }); 
        }
        
        if(args.action ==="gallery"){ 
            showLibrary({
                type:"picture",
                success:function(image,mediaObject){
                    imageHolder.removeAllChildren();
                
                    var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:mediaObject
                    });
                    
                    imageHolder.add(assignmentImage);
                    imageHolder._imageIsSet =true;
                    imageHolder._imageUrl=image.url;
                    
                    btn_Upload.visible = true;

                }
            }); 
        }
        
        self.add(selfScroll);
        
        
        
        btn_Upload.addEventListener("click",function(){
            if(imageHolder._imageIsSet){
                
                var Answer = require('/model/Answer');
                
                var imageComment = commentField.value;
                var imageComment2 = commentField2.value;
                
                if(imageComment === "Write your answer here"){
                    imageComment:false;
                }
                
                if(imageComment2 === "Write your answer here"){
                    imageComment2:false;
                }
               
                var payload = new Answer.Answer({
                        type:"answer",
                         answer:{
                            "imgUrl":imageHolder._imageUrl,
                            "imgComment":imageComment,
                            "imgComment2":imageComment2
                        },
                        questionId:{
                                "__type":"Pointer",
                                "className":"Questions",
                                "objectId":args.assignment.objectId
                        },
                        surveyId:{
                                "__type":"Pointer",
                                "className":"Survey",
                                "objectId":args.surveyId
                        },
                        userId:{
                                "__type":"Pointer",
                                "className":"_User",
                                "objectId":Titanium.App.Properties.getString("userId") 
                        }
                });
                
            
                /*
                Data.AssignmentEdit({
                    payload:payload,
                    answerId:args.answerObject.objectId,
                    success:function(obj){
                       Ti.App.fireEvent("closeElementEditView");
                      
                        
                        //alert("done");
                    },
                    error:function(obj){}
                });*/
                
                Data.AssignmentSave({
                    payload:payload,
                    success:function(obj){
                        Ti.App.fireEvent("closeElementView");
                        Ti.App.fireEvent("updateAssignmentView");
                        Ti.App.fireEvent("updateAssignmentMultiView");
                    },
                    error:function(obj){}
                });
                
            }else{
                alert("Please attach a picture.");
            }
        });
        
        
        args.success(elementHolder); 
        
    }
   



    
    /* Old creat Element view
	if(args.type === "image"){
	    
	     var elementHolder = Ti.UI.createView({
            top:0,
            left:0
        });
		
		var self = Ti.UI.createView({
			top:0,
			left:0,
			layout:"vertical",
		});
		
		elementHolder.add(self);
		
		var selfScroll =  Ti.UI.createScrollView({
			contentWidth:"100%",
			top:0,
			left:0,
			layout:"vertical",
			backgroundColor:"#fff"
		});
		
		
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
			Ti.App.fireEvent("closeElementView");
		});
	
		var  btn_Upload = Ti.UI.createButton({
			title:'NEXT',
            height:45,
            width:Ti.UI.SIZE,
            top:18,
            right:10,
            backgroundColor:"#000",
            font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
            color:'#fff100',
			visible:false
		});	
	
	
		toolBar.add(Btn_Menu);	
		toolBar.add(btn_Upload);	
		toolBar.add(toolBarBottomLine);	
		self.add(toolBar);
		
		

		var Label_header = Ti.UI.createLabel({
			text:args.assignment.title,
			height:Ti.UI.SIZE,
			width:300,
			top:15,
			left:10,
			right:10,
			color:"#000",
			font:{fontFamily: 'Nexa Bold',fontSize:25,fontWeight:'Bold'},
		});	
		
		var Label_DateStart = Ti.UI.createLabel({
			text:"Open: 29.05.14 - 12:00",
			left:10,
			top:20,
			font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
			color:"#878787"
		});
					
		var Label_DateEnd = Ti.UI.createLabel({
			text:"Close: 29.05.14 - 12:00",
			left:10,
			top:5,
			font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
			color:"#878787"
		});		
		
		selfScroll.add(Label_header);
		//selfScroll.add(Label_DateStart);
		//selfScroll.add(Label_DateEnd);
		
	
		var splitLine = Ti.UI.createView({
			height:1,
			top:10,
			backgroundColor:"#e1e1e1"
		});
		
		var imageHolder = Ti.UI.createView({
			backgroundColor:"#f6f7f7",
			top:0,
			height:180,
			_imageIsSet:false,
			_imageUrl:""
		});
		
		
		imageHolder.add(progressBar);
		
		
		var splitLine2 = Ti.UI.createView({
			height:1,
			top:0,
			backgroundColor:"#e1e1e1"
		});
		
		selfScroll.add(splitLine);
		selfScroll.add(imageHolder);
		selfScroll.add(splitLine2);
		
		
		var done = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.DONE
        });
		var commentField = Ti.UI.createTextArea({
			value:"What is on the picture?",
			top:5,
            left:10,
            right:10,
            width:300,
            height:100,
            backgroundColor:"#fff",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:"#333",
            scrollable:true,
            suppressReturn:false,
            tintColor:'#333',
            keyboardToolbar:[done]
		});
		
		done.addEventListener("click",function(){
		    commentField.blur();
		});
		
		commentField.addEventListener('focus',function(e){
		    if(e.source.value ==="What is on the picture?"){
		        e.source.value = "";
		    }
		});
		commentField.addEventListener('blur',function(e){
		    if(e.source.value===""){
		        e.source.value = "What is on the picture?";
		    }
		});		
				
		var splitLine3 = Ti.UI.createView({
			height:1,
			top:5,
			backgroundColor:"#e1e1e1"
		});
		
		selfScroll.add(commentField);
		selfScroll.add(splitLine3);
		
		var descHolder = Ti.UI.createView({
            top:0,
            backgroundColor:"#f6f7f7"
        });
        
        var desc = Ti.UI.createLabel({
            top:10,
            left:10,
            right:10,
            text:args.assignment.description,
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:'#333'
        });
        descHolder.add(desc);
        selfScroll.add(descHolder);
				
		if(args.action ==="camera"){ 
			showCamera({
				type:"picture",
				success:function(image){
					
					imageHolder.removeAllChildren();
				
					var assignmentImage = Ti.UI.createImageView({
						height:170,
						image:image.url
					});
					
					imageHolder.add(assignmentImage);
					imageHolder._imageIsSet =true;
					imageHolder._imageUrl=image.url;
					
					btn_Upload.visible = true;
					
					 assignmentImage.addEventListener("click",function(e){
                        var fullView = Ti.UI.createView({
                            backgroundColor:"#000",
                            top:0,
                            left:0,
                            zIndex:999
                        });
                        
                         var img = Ti.UI.createImageView({
                             image:image.url,
                             width:300
                        });
                        
                        fullView.add(img);
                        
                        elementHolder.add(fullView);
                        
                        img.addEventListener("click",function(){
                            elementHolder.remove(fullView);
                        });
            
                    });

					
				}
			}); 
		}
		
		if(args.action ==="gallery"){ 
			showLibrary({
				type:"picture",
				success:function(image){
					imageHolder.removeAllChildren();
				
					var assignmentImage = Ti.UI.createImageView({
						height:170,
						image:image.url
					});
					
					imageHolder.add(assignmentImage);
					imageHolder._imageIsSet =true;
					imageHolder._imageUrl=image.url;
					
					btn_Upload.visible = true;
					
					
					 assignmentImage.addEventListener("click",function(e){
                        var fullView = Ti.UI.createView({
                            backgroundColor:"#000",
                            top:0,
                            left:0,
                            zIndex:999
                        });
                        
                         var img = Ti.UI.createImageView({
                             image:image.url,
                             width:300
                        });
                        
                        fullView.add(img);
                        
                        elementHolder.add(fullView);
                        
                        img.addEventListener("click",function(){
                            elementHolder.remove(fullView);
                        });
            
                    });

				}
			}); 
		}
		
		self.add(selfScroll);
		
		
		
		btn_Upload.addEventListener("click",function(){
			if(imageHolder._imageIsSet){
				
				var Answer = require('/model/Answer');
				
				var imageComment = commentField.value;
				if(commentField.value === "What is on the picture?"){
					imageComment:false;
				}
				var payload = new Answer.Answer({
						type:"answer",
						answer:{
							"imgUrl":imageHolder._imageUrl,
							"imgComment":imageComment
						},
						questionId:{
								"__type":"Pointer",
								"className":"Questions",
								"objectId":args.assignment.objectId
						},
						surveyId:{
								"__type":"Pointer",
								"className":"Survey",
								"objectId":args.surveyId
						},
						userId:{
								"__type":"Pointer",
								"className":"_User",
								"objectId":Titanium.App.Properties.getString("userId") 
						}
				});
				
			
				
				Data.AssignmentSave({
					payload:payload,
					success:function(obj){
						Ti.App.fireEvent("closeAssignmentView");
						Ti.App.fireEvent("updateAssignmentView");
					},
					error:function(obj){}
				});
				
			}else{
				alert("Please attach a picture.");
			}
		});
		
		
		args.success(elementHolder);	
		
	}
	
	*/



};


function editElementView(args){
    if(args.type === "image"){
        
        var elementHolder = Ti.UI.createView({
            top:0,
            left:0
        });
        
        var self = Ti.UI.createView({
            top:0,
            left:0,
            layout:"vertical",
        });
        
        elementHolder.add(self);
        
        var selfScroll =  Ti.UI.createScrollView({
            contentWidth:"100%",
            top:0,
            left:0,
            layout:"vertical",
            backgroundColor:"#fff",
            scrollType:"vertical"
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
            Ti.App.fireEvent("closeElementView");
        });
    
        var  btn_Upload = Ti.UI.createButton({
            title:'NEXT',
            height:45,
            width:Ti.UI.SIZE,
            top:15,
            right:10,
            backgroundColor:"#000",
            borderRadius:3,
            font:{fontFamily:'Open Sanse',fontSize:17,fontWeight:'Semibold'},
            color:'#fff100'
        }); 
    
    
        toolBar.add(Btn_Menu);  
        toolBar.add(btn_Upload);    
        toolBar.add(toolBarBottomLine); 
        self.add(toolBar);
        
        
        /*----- Assignment headline -----*/
        var Label_header = Ti.UI.createLabel({
            text:args.assignment.title,
            height:Ti.UI.SIZE,
            width:300,
            top:20,
            left:10,
            right:10,
            color:"#000",
            font:{fontFamily: 'Nexa Bold',fontSize:30,fontWeight:'Bold'},
        }); 
        


        var descHolder = Ti.UI.createView({
            top:10,
            height:Ti.UI.SIZE
        });
        
        var desc = Ti.UI.createLabel({
            top:10,
            height:Ti.UI.SIZE,
            left:10,
            right:10,
            text:args.assignment.description.substring(0,100) + "... Read more",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:'#333'
        });
        descHolder.add(desc);
        
        selfScroll.add(Label_header);
        selfScroll.add(descHolder);
        
           var descFullView = Ti.UI.createView({
            top:0,
            left:0,
            visible:false
        });
        
        
        var descFullViewBlur = Ti.UI.createView({
            top:0,
            left:0,
            backgroundColor:"#333",
            opacity:0.95,
            zIndex:1
        });  
        
         var descLabel_header = Ti.UI.createLabel({
            text:args.assignment.title,
            height:Ti.UI.SIZE,
            top:30,
            left:20,
            right:20,
            color:"#000",
            font:{fontFamily: 'Nexa Bold',fontSize:30,fontWeight:'Bold'},
        });  
        
         var descFullViewContent = Ti.UI.createView({
            left:0,
            height:Ti.UI.SIZE,
            backgroundColor:"#fff",
            zIndex:10,
            layout:"vertical",
        });   
        
        
         var descFull = Ti.UI.createLabel({
            top:30,
            bottom:50,
            height:Ti.UI.SIZE,
            left:20,
            right:20,
            text:args.assignment.description,
            font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Regular'},
            color:'#333'
        });
        
        descFullView.add(descFullViewBlur);
        descFullView.add(descFullViewContent);
        descFullViewContent.add(descLabel_header);
        descFullViewContent.add(descFull);
        
        elementHolder.add(descFullView);
        
       desc.addEventListener("click",function(){
           descFullView.show();
       });
       
       descFullViewBlur.addEventListener("click",function(){
           descFullView.hide();
       });
       
       descFullViewContent.addEventListener("click",function(){
           descFullView.hide();
       });
         
        

        
        /*----- Assignment Image -----*/
        var splitLine = Ti.UI.createView({
            height:1,
            top:15,
            backgroundColor:"#e1e1e1"
        });
        
        var imageHolder = Ti.UI.createView({
            backgroundColor:"#f6f7f7",
            top:0,
            height:180,
            _imageIsSet:true,
            _imageUrl:args.answerObject.answer.imgUrl
        });
        
         var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:args.answerObject.answer.imgUrl
        });
        
        
        assignmentImage.addEventListener("click",function(e){
            
            var dialog = Ti.UI.createOptionDialog({
              cancel: 3,
              options: ['Show image','Retake', 'Upload from gallery', 'Cancle'],
              selectedIndex: 2,
              destructive: -1
            });
        
            dialog.addEventListener('click', function (e) {
                    if (e.cancel !== true || e.index === e.cancel) {
                        switch (e.index) {
                        case 0:
                            var fullView = Ti.UI.createView({
                                backgroundColor:"#000",
                                top:0,
                                left:0,
                                zIndex:999
                            });
                            
                             var img = Ti.UI.createImageView({
                                 image:args.answerObject.answer.imgUrl,
                                 width:300
                            });
                            
                            fullView.add(img);
                            
                            elementHolder.add(fullView);
                            
                            img.addEventListener("click",function(){
                                elementHolder.remove(fullView);
                            });
                            break;
                        case 1:
                        
                             imageHolder.remove(assignmentImage);
                        
                             showCamera({
                                type:"picture",
                                success:function(image,mediaObject){
                                    
                                    imageHolder.removeAllChildren();
                                
                                    var assignmentImage = Ti.UI.createImageView({
                                        height:170,
                                        image:mediaObject
                                    });
                                    
                                    imageHolder.add(assignmentImage);
                                    imageHolder._imageIsSet =true;
                                    imageHolder._imageUrl=image.url;
                                    
                                    btn_Upload.visible = true;
                                    
                                }
                            }); 
                            break;
                            
                        case 2:      
                         imageHolder.remove(assignmentImage);
                        showLibrary({
                            type:"picture",
                            success:function(image,mediaObject){
                                imageHolder.removeAllChildren();
                            
                                var assignmentImage = Ti.UI.createImageView({
                                    height:170,
                                    image:mediaObject
                                });
                                
                                imageHolder.add(assignmentImage);
                                imageHolder._imageIsSet =true;
                                imageHolder._imageUrl=image.url;
                                
                                btn_Upload.visible = true;
            
                            }
                        }); 
 
                            break;
                        }
                    }
                });
            
             dialog.show(); 

        });
        
        
        imageHolder.add(assignmentImage);
        
        imageHolder.add(progressBar);
        
//        imageHolder.add(thumb);
        var splitLine2 = Ti.UI.createView({
            height:1,
            top:0,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(splitLine);
        selfScroll.add(imageHolder);
        selfScroll.add(splitLine2);
        
        /*----- Assignment comment -----*/
       
        var splitLine3a = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
       
       var commentFieldLabel = Ti.UI.createLabel({
            text:"What's on the picture?",
            font:{fontFamily:'Open Sanse',fontSize:18,fontWeight:'Bold'},
            color:'#000',
            left:10,
            top:20
        });
       
       
       var flexSpace = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
       
        var done = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.DONE
        });
        var commentField = Ti.UI.createTextArea({
            value:args.answerObject.answer.imgComment,
            top:5,
            left:10,
            right:10,
            width:300,
            height:Ti.UI.SIZE,
            backgroundColor:"#fff",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:"#333",
            scrollable:true,
            suppressReturn:false,
            tintColor:'#333',
             keyboardToolbar:[flexSpace,done]
        });
        
        done.addEventListener("click",function(){
            commentField.blur();
        });       
       
       
                
        var splitLine3 = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(commentFieldLabel);
        selfScroll.add(splitLine3a);
        selfScroll.add(commentField);
        selfScroll.add(splitLine3);
        
        
        
        /*----- Assignment comment 2 -----*/
       
       
       var splitLine3b = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
       
       var commentFieldLabel2 = Ti.UI.createLabel({
            text:"Why did you take this picture?",
            font:{fontFamily:'Open Sanse',fontSize:18,fontWeight:'Bold'},
            color:'#000',
            left:10,
            top:40
        });
        
        Ti.API.log("args.answerObject.answer: " + JSON.stringify(args.answerObject.answer));
       
       var flexSpace2 = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
       
        var done2 = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.DONE
        });
        var commentField2 = Ti.UI.createTextArea({
            value:args.answerObject.answer.imgComment2,
            top:5,
            left:10,
            right:10,
            height:Ti.UI.SIZE,
            backgroundColor:"#fff",
            font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
            color:"#333",
            scrollable:true,
            suppressReturn:false,
            tintColor:'#333',
            keyboardToolbar:[flexSpace2,done2]
        });
        
        
        
        done2.addEventListener("click",function(){
            commentField2.blur();
        });       
        commentField2.addEventListener("focus",function(){
            commentField2.setHeight(200);
        });    
       
        commentField2.addEventListener("blur",function(){
            commentField2.height=Ti.UI.SIZE;
        }); 
                
        var splitLine3c = Ti.UI.createView({
            height:1,
            top:5,
            backgroundColor:"#e1e1e1"
        });
        
        selfScroll.add(commentFieldLabel2);
        selfScroll.add(splitLine3b);
        selfScroll.add(commentField2);
        selfScroll.add(splitLine3c);
        

                
        if(args.action ==="camera"){ 
            showCamera({
                type:"picture",
                success:function(image,mediaObject){
                    
                    imageHolder.removeAllChildren();
                
                    var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:mediaObject
                    });
                    
                    imageHolder.add(assignmentImage);
                    imageHolder._imageIsSet =true;
                    imageHolder._imageUrl=image.url;
                    
                    btn_Upload.visible = true;
                    
                }
            }); 
        }
        
        if(args.action ==="gallery"){ 
            showLibrary({
                type:"picture",
                success:function(image,mediaObject){
                    imageHolder.removeAllChildren();
                
                    var assignmentImage = Ti.UI.createImageView({
                        height:170,
                        image:mediaObject
                    });
                    
                    imageHolder.add(assignmentImage);
                    imageHolder._imageIsSet =true;
                    imageHolder._imageUrl=image.url;
                    
                    btn_Upload.visible = true;

                }
            }); 
        }
        
        self.add(selfScroll);
        
        
        
        btn_Upload.addEventListener("click",function(){
            if(imageHolder._imageIsSet){
                
                var Answer = require('/model/Answer');
                
                var imageComment = commentField.value;
                var imageComment2 = commentField2.value;
                
                if(imageComment === "Write your answer here"){
                    imageComment:false;
                }
                
                if(imageComment2 === "Write your answer here"){
                    imageComment2:false;
                }
                
                
                Ti.API.info(imageHolder._imageUrl);
                var payload = new Answer.Answer({
                        type:"answer",
                        answer:{
                            "imgUrl":imageHolder._imageUrl,
                            "imgComment":imageComment,
                            "imgComment2":imageComment2,
                        },
                        questionId:{
                                "__type":"Pointer",
                                "className":"Questions",
                                "objectId":args.assignment.objectId
                        },
                        surveyId:{
                                "__type":"Pointer",
                                "className":"Survey",
                                "objectId":args.surveyId
                        },
                        userId:{
                                "__type":"Pointer",
                                "className":"_User",
                                "objectId":Titanium.App.Properties.getString("userId") 
                        }
                });
                
            
                
                Data.AssignmentEdit({
                    payload:payload,
                    answerId:args.answerObject.objectId,
                    success:function(obj){
                       Ti.App.fireEvent("closeElementView");
                       Ti.App.fireEvent("updateAssignmentView");
                       Ti.App.fireEvent("updateAssignmentMultiView");
                        
                        //alert("done");
                    },
                    error:function(obj){}
                });
                
            }else{
                alert("Please attach a picture.");
            }
        });
        
        
        args.success(elementHolder); 
        
    }
       
};

function showCamera(args){
		Titanium.Media.showCamera({
						success:function(e) {
							
//							thumb.setImage(e.media);
//           					thumb.show();
           					
							if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
								if(args.type =="picture"){
		    						progressBar.show();

		    						Data.uploadeFile({
		    							progress:function(value){
		    								progressBar.value = value;
		    								if(value===1){
		    									
		    									progressBar.visible = false;}
		    							},
		    							object:e,
										type:'picture',
										success:function(imageObject,mediaObject){
											args.success(imageObject,mediaObject);
											progressBar.visible = false;
										}
		    						});
		    						
		    					}

								
							} else { 
									Ti.API.log("Forkert filtype");
							}
						},
						cancel:function() {},
						error:function(error) {},
						saveToPhotoGallery:true,
						allowEditing:false,
						mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
					});		
	};
function showLibrary(args){
	
	Ti.API.info("Show Library!");
	
	
		Titanium.Media.openPhotoGallery({
						success:function(e) {
							
//							thumb.setImage(e.media);
//           					thumb.show();
           									
							if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
								if(args.type =="picture"){
									progressBar.show();

		    						Data.uploadeFile({
		    							progress:function(value){
		    								
		    						   								
		    								progressBar.value = value;
		    								
		    								if(value===1){progressBar.visible = false;}
		    							},
		    							object:e,
										type:'picture',
										success:function(imageObject,mediaObject){
											args.success(imageObject,mediaObject);
											progressBar.visible = false;											  
										}
		    						});
		    					}
		    					
							} else { 
								Ti.API.log("Forkert filtype");
							}
						},
						cancel:function() {},
						error:function(error) {},
						saveToPhotoGallery:false,
						allowEditing:false,
						mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
					});		
	};

exports.createElementView = createElementView;
exports.editElementView = editElementView;