var Data = require("/services/data");

function view(args){

    var self = Ti.UI.createView({
        backgroundColor:"#fff",
        layout:"vertical"
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

    var  Btn_activate = Ti.UI.createButton({
            title:'SUBMIT',
            height:45,
            width:Ti.UI.SIZE,
            top:18,
            right:10,
            backgroundColor:"#000",
            font:{fontFamily:'Open Sanse',fontSize:16,fontWeight:'Bold'},
            color:'#fff100'
    });     
    
    toolBar.add(Btn_Menu);  
    toolBar.add(toolBarBottomLine); 
    toolBar.add(Btn_activate);    
    self.add(toolBar);
    
    
    var headline = Ti.UI.createLabel({
        text:"Project code",
        font:{fontFamily:'Open Sanse',fontSize:19,fontWeight:'Bold'},
        color:'#000',
        left:10,
        top:20
    });
    
    var splitLineDark1= Ti.UI.createView({
        height:1,
        backgroundColor:'#cfcfcf',
        top:5
    });
    
    
    var activationcode = Ti.UI.createTextField({
        width:"100%",
        height:50,
        backgroundColor:'#fff',
        borderColor:'#fff',
        borderWidth:0,
        hintText:'Type the project code',
        paddingLeft:15,
        color:"#333",
        font:{fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
        top:0,
        autocorrect:false,
        autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        tintColor:'#333'
    });
    
    var splitLineDark2 = Ti.UI.createView({
        height:1,
        backgroundColor:'#cfcfcf',
        top:0
    });
    
    
    self.add(headline);
    self.add(splitLineDark1);
    self.add(activationcode);
    self.add(splitLineDark2);
    
    
    Btn_activate.addEventListener("click",function(){
        
        Data.ActivateSurvey({
            userId:Titanium.App.Properties.getString("userId"),
            classId:activationcode.getValue(),
            success:function(response){
                 Ti.App.fireEvent("openHome");
            }
        });
        
    });

    
    return self;
};


exports.view = view;