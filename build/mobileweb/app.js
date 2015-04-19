//Include files
Ti.include('feedback.js');
Ti.include('about.js');
//Ti.include('menuItem.js');
Ti.include('login.js');
Ti.include('map.js');
Ti.include('Venues.js');

Titanium.UI.setBackgroundColor('#000');

//Create tabs for pages
var tabGroup = Titanium.UI.createTabGroup({
	barColor:'#d9bd61', 
	tabsBackgroundColor:'#f4f4f4', 
	activeTabIconTint:'#292929'
});

//Venues information on tab1
var win1 = Titanium.UI.createWindow({
	title:'Vandal Dining', background:'#fff'
});
// Add Venue information
win1.add(DiningWindow);
var tab1 = Titanium.UI.createTab({  
    icon:'fork.png', title:'List of Venues',
    window:win1
});

//Map on tab2
var win2 = Titanium.UI.createWindow({  
    title:'Map View', backgroundColor:'#FFFFFF'
});
var tab2 = Titanium.UI.createTab({  
    icon:'location.png', title:'Map',
    window:win2
});
// Add map
win2.add(mapview);

//Dining plan on tab3
var win3 = Ti.UI.createWindow({
	title:'My Dining Plan', backgroundColor:'#FFFFFF'
});
var tab3 = Titanium.UI.createTab({
	icon:'money.png', title:'Dining Plan',
	window: win3
});

//Dining Plan Profile Sign In
win3.add(topLabel);
win3.add(ulabel);
win3.add(username);
win3.add(plabel);
win3.add(password);
win3.add(signin);

//About information on tab4
var win4 = Ti.UI.createWindow({
	title:'About This App', backgroundColor:'#FFFFFF' 
});
var tab4 = Titanium.UI.createTab({
	icon:'about.png', title:'About',
	window: win4
});

//"About the App"
win4.add(appInfo);
win4.add(diningInfo);
win4.add(mealplanInfo);

//"Submit" button on feedback page

submitBtn.addEventListener('click', function() {
	var dialog = Ti.UI.createAlertDialog({
		message:'Thank you! We have recieved your feedback.',
		ok: 'OK', //change the prase?
		title: 'Feedback Recieved'
	});

	dialog.show();
});	

//  add tabs to the tabGroup
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();

/* ------------------------------------------------------------------------------ */



//win1.add(DiningWindow);
//};

//foodList();



