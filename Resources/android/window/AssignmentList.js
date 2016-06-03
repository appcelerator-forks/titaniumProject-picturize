function createWindow(args){
    Ti.API.log("AssignmentList view created");
    
    var self = Ti.UI.createWindow({
        backgroundColor:"#fff",
        tintColor:"#fff",
        barColor:"#fff",
        layout:"vertical",
        fullscreen:true,
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

   
    toolBar.add(Btn_Menu);  
    toolBar.add(toolBarBottomLine); 
    self.add(toolBar);        
    
/*----- Top header -----*/
    var Label_header = Ti.UI.createLabel({
//        text:args.surveyObject.initialTitle.toUpperCase(),
		text:args.surveyObject.title,
        height:Ti.UI.SIZE,
        width:300,
        top:15,
        left:10,
        right:10,
        color:"#000",
        font:{fontFamily: 'Nexa Bold',fontSize:25,fontWeight:'Bold'},
    }); 
    
    var Label_DateStart = Ti.UI.createLabel({
        text:"Open: "+ moment(args.surveyObject.dateStart.iso).format('DD.MM.YYYY - h:mm'),
        left:10,
        top:20,
        font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
        color:"#878787"
    });
                
    var Label_DateEnd = Ti.UI.createLabel({
        text:"Close: " + moment(args.surveyObject.dateEnd.iso).format('DD.MM.YYYY - h:mm'),
        left:10,
        top:5,
        font:{fontFamily:'Open Sanse',fontSize:15,fontWeight:'Regular'},
        color:"#878787"
    });
    
    var splitLine = Ti.UI.createView({
        height:1,
        top:10,
        left:10,
        right:10,
        backgroundColor:"#969696"
    }); 
    
    
    self.add(Label_header);
    self.add(Label_DateStart);
    self.add(Label_DateEnd);


/*----- Assignment list -----*/
    var TableObject;
    var Table = require('/ui/Table');
    
    var addEventListenerRow = function(e){

        if(!e.row._hasAnswer){                
           var Assignment = require('/window/Assignment');
            Ti.API.log("openAssignment recived");
            
            Assignment.createWindow({
                assignment:e.row._object,
                surveyId:args.surveyId,
                type:"image",
                mode:"create",
                success:function(AssignmentWindow){
                    AssignmentWindow.open();
                } 
            });     
                
        }
        else if(e.row._hasAnswer && e.row._multiAnswer){
            Ti.API.log("openMultiAssignment");

            var AssignmentListMulti = require('/window/AssignmentListMulti');
            AssignmentListMulti.createWindow({
                assignment:e.row._object,
                surveyId:args.surveyId,
                success:function(AssignmentListMultiWindow){
                    AssignmentListMultiWindow.open();
                } 
            });
            
        }
        else{
             Ti.API.log("Android Single editAssignment");

             var Assignment = require('/window/Assignment');
                Assignment.createWindow({
                    assignment:e.row._object,
                    answerObject:e.row._answer,
                    surveyId:args.surveyId,
                    type:"image",
                    mode:"edit",
                    success:function(AssignmentWindow){
                        AssignmentWindow.open();
                    } 
                });
        }
    };
    
 
    function createTable(){
        Table.createAssigmentList({
            surveyId:args.surveyId,
            success: function(_TableObject) {
                TableObject = _TableObject;
                TableObject.top= 20;
                self.add(TableObject);
                TableObject.addEventListener("click",addEventListenerRow);
            }
        });
    };
    createTable();
        

    
    
    Ti.App.addEventListener('updateAssignmentView',function(e){
        self.remove(self.children[4]);
        createTable();
    });
        
        
    
    
    Btn_Menu.addEventListener("click", function(){
       self.close();
    Ti.API.info("////////////////////////////");
    Ti.API.info(TableObject);
    if (TableObject == null) return; 
       TableObject.removeEventListener("click",addEventListenerRow);
    });
    
    args.success(self);        
};

exports.createWindow = createWindow;