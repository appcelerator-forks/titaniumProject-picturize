var Data = require('/services/data');
    var moment = require('/lib/moment');
    moment.lang("en");

function createSurveyList(args){
	
	Ti.API.log("createSurveyList");
	
	var self = Ti.UI.createTableView({
		width:"100%",
		height:Ti.UI.FILL,
		backgroundColor:'transparent',
		top:20,
		bottom:20,
		left:0,
		separatorColor: 'transparent',
	});
	
	self.addEventListener("click",function(e){
		Ti.App.fireEvent("openProject",{project:e.row._object});
	});

	/*----- Call the list handler -----*/
	Data.SurveyGetList({
		userId:Ti.App.Properties.getString("userId"),
		success: function(data) {
			var rows=[];
			for (var i=0;i<data.results.length;i++) {
				var item = data.results[i];
				
				var row = Ti.UI.createTableViewRow({
					backgroundColor:"#f6f7f7",
					width:"100%",
					height:94,
					left:0,
					top:0,
					backgroundSelectedColor:"#fff100",
					_object:item 
				});
				
				var rowImage = Ti.UI.createImageView({
					width:76,
					height:76,
					borderColor:"#ddd",
					borderWidth:1,
					left:11,
					top:11,
					image:item.imageLogo.url,
					defaultImage:"/images/defaultImage.png",
					
				});
				
				var rowTitle = Ti.UI.createLabel({
					text:item.title,
					left:0,
					top:0,
					font:{fontFamily:'Open Sanse',fontSize:14,fontWeight:'Bold'},
					color:"#2f2f2f"
				});
				
				
				var rowDateStart = Ti.UI.createLabel({
					text:"Open: " + moment(item.dateStart.iso).format('DD.MM.YYYY - h:mm'),
					left:0,
					top:10,
					font:{fontFamily:'Open Sanse',fontSize:13,fontWeight:'Regular'},
					color:"#878787"
				});
				
				var rowDateEnd = Ti.UI.createLabel({
					text:"Close: "+ moment(item.dateEnd.iso).format('DD.MM.YYYY - h:mm'),
					left:0,
					top:5,
					font:{fontFamily:'Open Sanse',fontSize:13,fontWeight:'Regular'},
					color:"#878787"
				});
				
				
				var infoContainer = Ti.UI.createView({
                    left:94,
                    layout:"vertical",
                    height:Ti.UI.SIZE
                });
                
                infoContainer.add(rowTitle);
                infoContainer.add(rowDateStart);
                infoContainer.add(rowDateEnd);
				
				var bottomLine = Ti.UI.createView({
					width:"100%",
					height:2,
					backgroundColor:'#e5e5e8',
					bottom:0
				});

				var icon_next = Ti.UI.createImageView({
                    width:13,
                    height:22,
                    right:10,
                    image:"/images/btn_next.png"
                });
				
				row.add(rowImage);
				row.add(infoContainer);
				row.add(icon_next);
				row.add(bottomLine);
				
				rows.push(row);
				
				if(data.results.length === (i+1)){
					// After updating Table send it all back to MainCallback
					self.setData(rows);
					args.success(self);
				}
			}
		}
	});
	
	
};

function createAssigmentList(args){
    

	var self = Ti.UI.createTableView({
		width:"100%",
		backgroundColor:'#f2f2f2',
		bottom:0,
		top:0,
		left:0,
		separatorColor: 'transparent',
	});

	/*----- Call the list handler -----*/
	Data.AssignmentGetList({
		surveyId:args.surveyId,
		userId:Ti.App.Properties.getString("userId"),
		success: function(data) {
			
			var rows=[];
			for (var i=0;i<data.results.length;i++) {
				var item = data.results[i];
						
				
				var row = Ti.UI.createTableViewRow({
					backgroundColor:"#f6f7f7",
					width:"100%",
					height:94,
					left:0,
					top:0,
					backgroundSelectedColor:"#fff100",
					_object:item,
					_surveyId:args.surveyId,
					_hasAnswer:false,
					_answer:"",
					_multiAnswer:item.multiAnswer
				});
			
				
				var rowTitle = Ti.UI.createLabel({
					text:item.title,
					left:0,
					top:0,
					font:{fontFamily:'Open Sanse',fontSize:14,fontWeight:'Bold'},
					color:"#2f2f2f"
				});
				
Ti.API.info("////////////////////////////////");
Ti.API.info(item);
if (item.dateStart == null) return;				
				var rowDateStart = Ti.UI.createLabel({
					text:"Open: " + moment(item.dateStart.iso).format('DD.MM.YYYY - h:mm'),
					left:0,
					top:10,
					font:{fontFamily:'Open Sanse',fontSize:13,fontWeight:'Regular'},
					color:"#878787"
				});
				
				var rowDateEnd = Ti.UI.createLabel({
					text:"Close: "+ moment(item.dateEnd.iso).format('DD.MM.YYYY - h:mm'),
					left:0,
					top:2,
					font:{fontFamily:'Open Sanse',fontSize:13,fontWeight:'Regular'},
					color:"#878787"
				});
				
				var bottomLine = Ti.UI.createView({
					width:"100%",
					height:1,
					backgroundColor:'#e5e5e8',
					bottom:0
				});
				
				var icon_next = Ti.UI.createImageView({
				    width:13,
				    height:22,
				    right:10,
				    image:"/images/btn_next.png"
				});
				
				var infoContainer = Ti.UI.createView({
				    left:10,
				    layout:"vertical",
				    height:Ti.UI.SIZE
				});
				
				infoContainer.add(rowTitle);
				infoContainer.add(rowDateStart);
				infoContainer.add(rowDateEnd);
				
				var rowImage = Ti.UI.createImageView({
								width:76,
								height:76,
								left:10,
								image:"",
								borderColor:"#e5e5e8",
								visible:false
							});
							
				row.add(rowImage);
				row.add(infoContainer);
				row.add(icon_next);
				row.add(bottomLine);
			
				Data.AssignmentCheckForAnswers({
					currentRowId:i,
					assignmentId:item.objectId,
					userId:Ti.App.Properties.getString("userId"),
					success:function(response,index){
					    
						var item = response.results[0];
						Ti.API.log("response.count" + response.count);
						if(response.count !=0){
							var row  = self.data[0].rows[index];
							row._hasAnswer = true;
							row.children[0].visible = true;
							row.children[0].image = item.answer.imgUrl;
							row.children[1].left = 100; 
							row._answer=item;
							
							if(response.count > 1){
							    var countView = Ti.UI.createLabel({
							        width:26,
							        height:26,
							        backgroundColor:"#000",
							        color:"#fff",
							        left:59,
							        bottom:10,
							        text:response.count,
							        textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
							        font:{fontFamily:'Open Sanse',fontSize:10,fontWeight:'Bold'}
							    });
							    
							    row.add(countView);
							}
						}
						
						
					},
					error:function(response,xhr){
						alert(response);
					}
					
				});	
				
				
				
				rows.push(row);	

				if(rows.length === data.results.length){
					self.setData(rows);
					args.success(self);
				}
			}
		}
	});
		
};

function createAssigmentMultiList(args){
    var self = Ti.UI.createTableView({
        width:"100%",
        backgroundColor:'#f2f2f2',
        bottom:0,
        top:0,
        left:0,
        separatorColor: 'transparent',
    });

    /*----- Call the list handler -----*/
    Data.AssignmentGetMultiList({
        answerId:args.assignment.objectId,
        surveyId:args.surveyId,
        userId:Ti.App.Properties.getString("userId"),
        success: function(data) {
            var rows=[];
            for (var i=0;i<data.results.length;i++) {
                var item = data.results[i];
                        
                
                var row = Ti.UI.createTableViewRow({
                    backgroundColor:"#f6f7f7",
                    width:"100%",
                    height:94,
                    left:0,
                    top:0,
                    backgroundSelectedColor:"#fff100",
                    _object:item,
                    _surveyId:args.surveyId,
                    _hasAnswer:false,
                    _answer:"",
                    _multiAnswer:item.multiAnswer
                });
                
                Ti.API.log("Title: "+ item.title + "\nitem.multiAnswer: " + item.multiAnswer);
                
                var rowTitle = Ti.UI.createLabel({
                    text:item.title,
                    left:0,
                    top:0,
                    font:{fontFamily:'Open Sanse',fontSize:14,fontWeight:'Bold'},
                    color:"#2f2f2f"
                });
                
                
                var rowDateCreated = Ti.UI.createLabel({
                    text:"Created: "+ moment(item.createdAt).format('DD.MM.YYYY - h:mm'),
                    left:0,
                    top:10,
                    font:{fontFamily:'Open Sanse',fontSize:13,fontWeight:'Regular'},
                    color:"#878787"
                });
                
              
                var bottomLine = Ti.UI.createView({
                    width:"100%",
                    height:1,
                    backgroundColor:'#e5e5e8',
                    bottom:0
                });
                
                var icon_next = Ti.UI.createImageView({
                    width:13,
                    height:22,
                    right:10,
                    image:"/images/btn_next.png"
                });
                
                var infoContainer = Ti.UI.createView({
                    left:10,
                    layout:"vertical",
                    height:Ti.UI.SIZE
                });
                
                infoContainer.add(rowTitle);
                infoContainer.add(rowDateCreated);

                
                var rowImage = Ti.UI.createImageView({
                                width:76,
                                height:76,
                                left:10,
                                image:"",
                                borderColor:"#e5e5e8",
                                visible:false
                            });
                            
                row.add(rowImage);
                row.add(infoContainer);
                row.add(icon_next);
                row.add(bottomLine);

                row._hasAnswer = true;
                rowImage.visible = true;
                rowImage.image = item.answer.imgUrl;
                infoContainer.left = 100; 
                row._answer=item;
                   
                
                
                
                rows.push(row); 

                if(rows.length === data.results.length){
                    // After updating Table send it all back to MainCallback
                    self.setData(rows);
                    args.success(self);
                }
            }
        }
    });
        
};


exports.createSurveyList = createSurveyList;
exports.createAssigmentList = createAssigmentList;
exports.createAssigmentMultiList = createAssigmentMultiList;