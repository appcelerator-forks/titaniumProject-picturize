function createWindow(args){ 
    
    Ti.API.log("Assignment view created");
    
    var self = Ti.UI.createWindow({
        backgroundColor:"#fff",
        tintColor:"#fff",
        barColor:"#fff",
        layout:"vertical",
        fullscreen:true,
    });
    
   
    if(args.mode ==="create"){
        
        var element = require('/view/elements');
        element.createElementView({
            assignment:args.assignment,
            type:args.type,
            surveyId:args.surveyId,
            success: function(_elementEditView) {
                assigmentView = _elementEditView;
                self.add(assigmentView);
            }
        });
    }
    
    if(args.mode ==="edit"){
        
        var element = require('/view/elements');
        element.editElementView({
            type:args.type,
            assignment:args.assignment,
            answerObject:args.answerObject,
            surveyId:args.surveyId,
            success: function(_elementEditView) {
                assigmentView = _elementEditView;
                self.add(assigmentView);
            }
        });
    }
    
    
       /*----- Open close ----*/
    Ti.App.addEventListener('closeElementView',function(e){
        self.close();
    });

    args.success(self);      
};

exports.createWindow = createWindow;