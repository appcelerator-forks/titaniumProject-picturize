function createCountDown(args){
	var self = Ti.UI.createView({
		width:120,
		height:42,
		left:10,
		top:30
	});
	
	var CounterDays = Ti.UI.createLabel({
		text:"00",
		left:0,
		top:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:22,fontWeight:'Bold'},
		color:"#3f9833",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var CounterDaysLabel = Ti.UI.createLabel({
		text:"DAYS",
		left:0,
		bottom:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:7,fontWeight:'Bold'},
		color:"#575857",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var CounterHours = Ti.UI.createLabel({
		text:"00",
		left:30,
		top:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:22,fontWeight:'Bold'},
		color:"#3f9833",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var CounterHoursLabel = Ti.UI.createLabel({
		text:"HOURS",
		left:30,
		bottom:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:7,fontWeight:'Bold'},
		color:"#575857",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});	
	
	var CounterMins = Ti.UI.createLabel({
		text:"00",
		left:60,
		top:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:22,fontWeight:'Bold'},
		color:"#3f9833",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var CounterMinsLabel = Ti.UI.createLabel({
		text:"MIN",
		left:60,
		bottom:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:7,fontWeight:'Bold'},
		color:"#575857",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});		
	
	var CounterSecs = Ti.UI.createLabel({
		text:"00",
		left:90,
		top:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:22,fontWeight:'Bold'},
		color:"#3f9833",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var CounterSecLabel = Ti.UI.createLabel({
		text:"SEC",
		left:90,
		bottom:0,
		height:24,
		font:{fontFamily:'Open Sanse',fontSize:7,fontWeight:'Bold'},
		color:"#575857",
		width:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	});			
	
	self.add(CounterDays);
	self.add(CounterDaysLabel);
	
	self.add(CounterHours);
	self.add(CounterHoursLabel);
	
	self.add(CounterMins);
	self.add(CounterMinsLabel);
	
	self.add(CounterSecs);
	self.add(CounterSecLabel);
	
	args.success(self);
};
exports.createCountDown = createCountDown;