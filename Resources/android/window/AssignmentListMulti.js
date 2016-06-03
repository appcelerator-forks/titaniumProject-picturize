function createWindow(args){
    Ti.API.log("Created MultiListWindow");
    
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
   
    var  AddMore = Ti.UI.createButton({
            title:'Add more pictures',
            height:45,
            width:Ti.UI.SIZE,
            top:18,
            right:10,
            backgroundColor:"#000",
            font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
            color:'#fff100'
    });     
   
    toolBar.add(AddMore);
    toolBar.add(toolBarBottomLine); 
    self.add(toolBar);
    
    AddMore.addEventListener("click",function(){
            var Assignment = require('/window/Assignment');

            Assignment.createWindow({
                assignment:args.assignment,
                surveyId:args.surveyId,
                type:"image",
                mode:"create",
                success:function(AssignmentWindow){
                    AssignmentWindow.open();
                } 
            });  
            
    });
   
    
    
/*----- Assignment list -----*/
    var TableObject;
    var Table = require('/ui/Table');
    
    var addEventListenerRow = function(e){

             Ti.API.log("Android Multi editAssignment");

             var Assignment = require('/window/Assignment');
                Assignment.createWindow({
                    assignment:args.assignment,
                    answerObject:e.row._answer,
                    surveyId:args.surveyId,
                    type:"image",
                    mode:"edit",
                    success:function(AssignmentWindow){
                        AssignmentWindow.open();
                    } 
                });
        
    };
    
    
    
    
 
    function createTable(){
        Table.createAssigmentMultiList({
            surveyId:args.surveyId,
            assignment:args.assignment,
            success: function(_TableObject) {
                TableObject = _TableObject;
                TableObject.top= 20;
                self.add(TableObject);
                TableObject.addEventListener("click",addEventListenerRow);
            }
        });
    };
    createTable();
    
   Btn_Menu.addEventListener("click", function(){
       self.close();
       if (TableObject != null)
       	TableObject.removeEventListener("click",addEventListenerRow);
    });       
    
    Ti.App.addEventListener('updateAssignmentMultiView',function(e){
        Ti.API.log("Multiview update");
        self.remove(self.children[1]);
        createTable();
    });  
         
    args.success(self); 
};
exports.createWindow = createWindow;