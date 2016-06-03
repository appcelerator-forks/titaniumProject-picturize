var parseCommonJS = require('/lib/ti.parse');
var client = new parseCommonJS.Client("sKLLoHwqAdONXq07LfEjPEKDpq3hqAk2Eyav8n8O","aeDJKp97XzS9v9gLLUH7D7ecg8JqFCWUpIwqvzte");

if (Ti.Platform.osname == "android") {
	var ImageFactory = require('ti.imagefactory');
}

/*----- User ----*/
function UserLogin(args){
	
	client.login({
		endpoint: 'https://api.parse.com/1/login',
		payload: args.payload,
		success: function(response) {
			args.success(response);
		},
		error: function(response,xhr) {
			args.error(response);
		}
	});	
	
};

function ResetPassword(args) {
	client.reset({
		endpoint: 'https://api.parse.com/1/requestPasswordReset',
		payload: args.payload,
		success: function(response) {
			args.success(response);
		},
		error: function(response,xhr) {
			args.error(response);
		}
	});
};

function UserCreate(args){
	

	client.create({
		className: 'https://api.parse.com/1/users',
		object: args.payload,
		success: function(response) {
 			args.success(response);
		},
		error: function(response,xhr) {
 			args.error(response);		
		}
	});	
	
};



function UserLogout(){
	/*
	parse.logout(
		function(data){
			alert(JSON.stringify(data));
		});
	*/
};

/*----- Survey ----*/
function SurveyGetList(args){
var whereQuery = {
		"objectId":{
			"$select":{
				"query":{
					"className":"UserHooks",
					"where":{
						"userId":{
							"__type":"Pointer",
							"className":"_User",
							"objectId":args.userId
						},
						"classType":"project"
					}
				},
				"key":"classId"
			}	
		}
	};

	client.get({
		className: 'https://api.parse.com/1/classes/Survey',
		payload: {
		"where" : JSON.stringify(whereQuery),
		"order":'dateStart'
		},
		success: function(response) {
			Ti.API.log("success"+ JSON.stringify(response));
			args.success(response);
		},
		error: function(response,xhr) {
			Ti.API.log("error"+ JSON.stringify(response));
		}
	});	

};

/*----- Assignment ----*/
function AssignmentGetList(args){
var whereQuery = {
		"type":"assignment",
		"surveyId":{
			"__type":"Pointer",
			"className":"Survey",
			"objectId":args.surveyId
		}
		};

	client.get({
		className: 'https://api.parse.com/1/classes/Questions',
		payload: {
		"where" : JSON.stringify(whereQuery),
		"order":'dateStart'
		},
		success: function(response) {
			args.success(response);
		},
		error: function(response,xhr) {
		}
	});	
	

};

function AssignmentGetMultiList(args){
var whereQuery = {
        "type":"answer",
        "questionId":{
            "__type":"Pointer",
            "className":"Questions",
            "objectId":args.answerId
        },
        "userId":{
			"__type":"Pointer",
			"className":"_User",
			"objectId":args.userId
		},
	};

    client.get({
        className: 'https://api.parse.com/1/classes/Questions',
        payload: {
        "where" : JSON.stringify(whereQuery),
        "order":'dateStart'
        },
        success: function(response) {
            args.success(response);
        },
        error: function(response,xhr) {
        }
    }); 
    

};


function uploadeFile(args){
    var imageFile;
	var imageAsTaken = Ti.UI.createImageView({image: args.object.media});
	
	Ti.API.info("////////// Upload //////");
	Ti.API.info(imageAsTaken.width);
	
	
	if(args.type =="picture"){
		var newWidth, newHeight;
		Ti.API.info("/////////////////");
		Ti.API.info(Ti.Platform.Android);
		Ti.API.info(Titanium.Platform.osname);
		if (Ti.Platform.osname != "android") {
			imageFile = imageAsTaken.toImage(function(){Ti.API.info("toImage"); });
			
			if (imageFile.width > 1000) {
				newWidth = (imageFile.width/2);
				newHeight = (imageFile.height/2);
				
				imageFile = imageFile.imageAsResized(newWidth,newHeight);
			}			
		}
		else {
			imageFile = imageAsTaken.toBlob();
			
			if (imageFile.width > 1000) {
				newWidth = (imageFile.width/2);
				newHeight = (imageFile.height/2);
				
				imageFile = ImageFactory.imageAsResized(imageFile, { width: newWidth, height: newHeight });
			}
			
		}
		
		Ti.API.info("newWidth === " + newWidth);
		
	}
	else{
		Ti.API.log("Der opstod en fejl");
		return false;
	}
    
  
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onsendstream = function(event) {							
	    if (event.progress > 0) {
	    		args.progress(event.progress);
	    }
	
	};			
	xhr.onload = function() {
	    var parseResponse = JSON.parse(xhr.responseText);
	    
	    if(args.type =="picture"){
	    	args.success(parseResponse,args.object.media);
		}
		
	
	};
	xhr.onerror = function() {
	    Ti.API.info('ERROR response: '+ xhr.responseText + '   status code:' + xhr.status);
	};
	xhr.open('POST', 'https://api.parse.com/1/files/pic.jpg');
	xhr.setRequestHeader('X-Parse-Application-Id', '2HkEzQ8CGphveCn2oIKSNpI4MmWyMH15O2D5KhuX');
	xhr.setRequestHeader('X-Parse-REST-API-Key', '25m77oPKCJMmy4YIUYJZIvRBySP0y7HcJDhtR4U0');
	xhr.setRequestHeader('Content-Type', 'image/jpeg');
	xhr.send(imageFile);	
};	
		
function AssignmentSave(args){
	
	client.create({
		className:'https://api.parse.com/1/classes/Questions',
		object:args.payload,
		success: function(response) {
 			args.success(response);
		},
		error: function(response,xhr) {
 			args.error(response);		
		}
	});
	
	
};

function AssignmentEdit(args){
    
    client.update({
        className:'https://api.parse.com/1/classes/Questions',
        objectId:args.answerId,
        object:args.payload,
        success: function(response) {
            args.success(response);
        },
        error: function(response,xhr) {
            args.error(response);       
        }
    });
    
    
};

function AssignmentCheckForAnswers(args){
	var whereQuery = {
			"type":"answer",
			"questionId":{
				"__type":"Pointer",
				"className":"Questions",
				"objectId":args.assignmentId
			},
			"userId":{
				"__type":"Pointer",
				"className":"_User",
				"objectId":args.userId
			}
			};
	
		client.get({
			className: 'https://api.parse.com/1/classes/Questions',
			payload: {
			"where" : JSON.stringify(whereQuery),
			"count":1,
			"order":'dateStart'
			},
			success: function(response) {
			    Ti.API.log(JSON.stringify(response));
				args.success(response,args.currentRowId);
			},
			error: function(response,xhr) {
			}
		});		
};


/*----- Promissions ----*/
function ActivateSurvey(args){

    var UserHook = require('/model/UserHook');
    var payload = new UserHook.UserHook({
        userId:{
        "__type":"Pointer",
        "className":"_User",
        "objectId":args.userId
        },
        classId:args.classId,
        classType:"project"
    });
    
    AddUserHook({
        payload:payload,
        success:function(response){
            args.success(response);
        },
        error:function(response){
            alert("ERROR: " + response);
        }
    });
    
};

function AddUserHook(args){
 
    client.create({
        className:'https://api.parse.com/1/classes/UserHooks',
        object:args.payload,
        success: function(response) {
            args.success(response);
        },
        error: function(response,xhr) {
            args.error(response);       
        }
    });    
    
};


/*----- Local data ----*/
function CacheGetData(args){};

function CacheSetData(args){};

function CacheClear(args){};


exports.UserLogin = UserLogin;
exports.UserCreate = UserCreate;
exports.ResetPassword = ResetPassword;

exports.SurveyGetList = SurveyGetList;
//xports.SurveyGetById = SurveyGetById;

exports.AssignmentGetList = AssignmentGetList;
exports.AssignmentGetMultiList = AssignmentGetMultiList;
exports.AssignmentSave = AssignmentSave;
exports.AssignmentEdit = AssignmentEdit;
exports.AssignmentCheckForAnswers = AssignmentCheckForAnswers;

exports.ActivateSurvey = ActivateSurvey;

exports.uploadeFile = uploadeFile;

