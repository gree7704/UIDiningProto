//Vandal Venue page
Ti.include('menuItem.js');
	
var DiningWindow = Titanium.UI.createWindow({
	title:'Vandal Dining',
	background:'#fff'
});
	

//array of venue names
var Venues = ['Bob\'s Place', 'Denny\'s AllNighter', 'The Grid Community Store', 
	'Sisters\' Brew','Stover\'s', 'Einstein\'s Bagels', 'I of the Commons', 
	'Mein Bowl', 'Subconnections',	'Chorizos Mexican Grill', 'Jamba Juice',
	'Paradise Creek Pizza and Grill' ];
	
//array of colors for rows.
var rowColor = ['#fdfcf8', '#faf6ea', '#f7f0dc', '#f3ebcf', '#f0e5c1', '#eddfb3',
	'#e9daa5', '#e6d498', '#e3ce8a', '#e0c87c', '#dcc36f','#d9bd61'];	
	
var allRows = [];
var theVenues = Titanium.UI.createTableView({});
var theRow;
var theLabel;
var theRowView;
for (var i=0; i <Venues.length; i++) {
	
	theRow = Titanium.UI.createTableViewRow({
		backgroundColor:rowColor[i], 
		height:60, 
		title:Venues[i],
		VenueSelection:Venues[i]
	});

	allRows.push(theRow);
}

theVenues.setData(allRows);
DiningWindow.add(theVenues);

//function to display page for selected venue
function showVenuePage(_args) {
	var VenuePage = Ti.UI.createWindow({layout:'vertical'});
	var VenueView = Ti.UI.createView({
		top:0,
		width: '100%',
		height: '50%',
		backgroundColor: '#1C1C1C'
	});
	
	var MenuView = Ti.UI.createView({
		top:0,
		width: '95%',
		height: '50%'
	});
	
	var VenueInfo = [];

	VenuePage.backgroundColor = '#DDDDDD';
	VenueInfo = getVerdict(_args);
	var VenueName = VenueInfo[0];
	var LargeImage = VenueInfo[1];
	var VenueHours = VenueInfo[2];
	var VenueLocation = VenueInfo[3];
	var MenuItems = VenueInfo[4];
	var MenuRowView;
	
	//var testlabel = Titanium.UI.createLabel();
	var venueLabel = Ti.UI.createLabel
	({text: VenueName, color: 'yellow',top:'0%'});
	VenueView.add(venueLabel);
	
	var venueImage = Ti.UI.createImageView({
		top: 25,
		image: LargeImage
	});
	VenueView.add(venueImage);
	var venueHoursLabel = Ti.UI.createLabel	({
		text: 'Hours: '+VenueHours, 
		color: 'yellow' ,
		top:'50%',
		width: '80%',
		textAlign:'center',
		font:{fontSize: '14'}
	});
	
	var venueLocationLabel = Ti.UI.createLabel	({
		text: 'Location: '+VenueLocation,
		color: 'yellow' ,
		top:'80%',
		textAlign:'center',
		font:{fontSize: '14'}
	});

	VenueView.add(venueHoursLabel);
	VenueView.add(venueLocationLabel);
	
	VenuePage.add(VenueView);	
	
	var FeedbackButton = Titanium.UI.createButton ({
		title: 'Give Us Feedback!',
		bottom:'1%',
		height: 30,
		backgroundColor: '#e9daa5'	
	});
	
	FeedbackButton.addEventListener('click', function()
	{
		win1.close(VenuePage);
		win1.add(winFeedback);
	});
	VenueView.add(FeedbackButton);	
	
	closeFeedbackButton.addEventListener('click', function(){
		win1.close(winFeedback);
   		win1.add(VenuePage);   
	});		
	
	var allRows = [];
	var tableHeaderView = Titanium.UI.createView({
		height:25
	});
	var theMenuItems = Titanium.UI.createTableView({
		top: 5,
		height: '75%',
		headerView: tableHeaderView,
		headerTitle: 'Menu Items'
	});
	var theMenuRow;
	var theFoodLabel, thePriceLabel;
	
	for (var i=0; i < MenuItems.length ; i++){
		Ti.API.info('counting:'+i);
		theFoodLabel = Titanium.UI.createLabel({
			text: MenuItems[i],
			color:'black',
			textAlign: 'left',
			left: '10px',
			width: '%50'
		});
		i++;
		
		thePriceLabel = Titanium.UI.createLabel({
			text: MenuItems[i],
			width: '%30',
			left:'255px'
		});

		theRow = Titanium.UI.createTableViewRow({
			height:20, 
			color: 'black',
			title: MenuItems[i-1],
			MenuSelection:MenuItems[i-1]
		});
		//theRow.add(theFoodLabel);
		theRow.add(thePriceLabel);
		allRows.push(theRow);
	}
	theMenuItems.setData(allRows);

	var close = Titanium.UI.createButton({
		title:'Venue List Page', 
		color: 'black',
		bottom: '1%',
	  	height:30,
	  	borderWidth : 2,
	  	borderRadius : 8,
	  	borderColor: 'black',
	  	backgroundColor: '#FFFF99'
	 });
	
	close.addEventListener('click', function()
	{
			Ti.API.info('User Clicked Venue List Page button');
			VenuePage.close();
			VenuePage.hide();
			win1.add(DiningWindow);
			
	});
	
	var menuInfoLabel = Ti.UI.createLabel({
		text:'Click on a Menu Item for Nutrition Information',
		color: 'black',
		top:'80%',
		textAlign:'center',
		font:{fontSize: '14'},
		//height: 30,
		backgroundColor: '#e9daa5'
	});
	
	MenuView.add(theMenuItems);
	MenuView.add(menuInfoLabel);
	MenuView.add(close);
	
	VenuePage.add(MenuView);
	Ti.API.info('VenueName:'+VenueName);

	theMenuItems.addEventListener('click', function(e){
		//win1.close(VenuePage);
		VenuePage.close();
		VenuePage.hide();
		//win1.add(DiningWindow);
		showNutritionPage(e.source.MenuSelection);
		VenuePage.show();
	});
	win1.add(VenuePage);
}

theVenues.addEventListener('click', function(e){
	showVenuePage(e.source.VenueSelection);
});
	
	
	
function getVerdict(venue) {
	//Set all venue information based on selected row.
	Ti.API.info('processing verdict');
	Ti.API.info('venue:'+venue);
	var indicator  = venue.charAt(0);
	Ti.API.info('indicator:'+indicator);
	var VenueName= venue;
	var LargeImage;
	var VenueHours;
	var VenueLocation;
	var MenuItems = [];
	var VenueInfo = [];

	switch (indicator) {
		case 'B': //Bob's Place		
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Meal Plan',' N/A']; 
			break;
		case 'D': // Denny's AllNighter
			LargeImage = 'Hungry.png';
			VenueHours = 'Sunday - Thursday: 10:00am - Midnight, '+
				'Friday - Saturday: 10:00am - 2:00am'; 
			VenueLocation = '6th Street Market at the LLC';
			MenuItems = ['Breakfast Skillet','$6.99',
						 'Country Scramble','$7.49',
						 'Breakfast Croissant','$5.99',
						 'Ham and Cheese Sandwich','$7.99']; 
			break;
		case 'T': //The Grid
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Some Cool Item','$6.99',
						 'Country Scramble','$7.49',
						 'Breakfast Croissant','$5.99',
						 'Something You Need','$7.99'];  
			break;
		case 'S': 
			var indicator2 = venue.charAt(1);
			switch(indicator2){
			case 'i': //Sisters'Brew
				
				LargeImage = 'Hungry.png';
				VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
					'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
					'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
					'Dinner: 4:30pm - 7:30pm'; 
				VenueLocation = 'Wallace Complex';
				MenuItems = ['Vanilla Latte','$3.99',
						 'Cappuccino','$4.49',
						 'Brave\' Mocha','$5.99',
						 'Danish','$3.99']; 
				break;
			case 't': //Stovers
				
				LargeImage = 'stoversImage.jpg';
				VenueHours = 'Monday - Friday: 8:00am - 3:00pm';
				VenueLocation = 'J.A. Albertson Building';
				MenuItems = ['New England Clam Chowder','$4.99',
						 'Classic Tomato Soup','$4.49',
						 'Chicken Noodle Soup','$4.99',
						 'Vegetable Beef Soup','$4.99',
						 'Beef Pita','$6.99',
						 'Turkey Pita','$6.99',
						 'Ham Pita','$6.99',
						 'Chicken Pita','$6.99',
						 'Bacon Pita','$6.99',
						 'Veggie Pita','$6.99',
						 'Hummus Pita','$6.99',
						 'Breakfast Burrito','$5.99'];  
				break;
					
			case 'u'://Subconnection
				LargeImage = 'Hungry.png';
				VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
					'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
					'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
					'Dinner: 4:30pm - 7:30pm'; 
				VenueLocation = 'Wallace Complex';
				MenuItems = ['Tastey Sub','$6.99',
						 'Super Sub','$7.49',
						 'Veggie Sub','$5.99',
						 'Nuclear Sub','$7.99']; 
				break;
			}
			break;
		case 'E': //Einstein Bros
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Breakfast Ham and Cheese Bagel','$5.99',
						 'The Club Bagel','$7.49',
						 'E=MC^2 Bagel','$7.99',
						 'Everything Bagel','$7.99']; 
			break;
		case 'I': //I of Commons
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Breakfast Skillet','$6.99',
						 'Country Scramble','$7.49',
						 'Breakfast Croissant','$5.99',
						 'Ham and Cheese Sandwich','$7.99'];  
			break;
		case 'M': //Mein Bowl
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Petite Bowl O\' Noodles','$5.99',
						 'Medium Bowl O\' Noodles','$7.49',
						 'Manchurian Bowl O\' Noodles','$9.99',
						 'Some Other Option','$17.99'];  
			break;		
		case 'C': // Cobrizo Mexican Grill
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Breakfast Burrito','$6.99',
						 '3 Tacos and Rice','$5.49',
						 'Enchilada Platter','$6.99',
						 'El Hombre Hamburger','$8.99']; 
			break;
		case 'J': //Jamba Juice
			LargeImage = 'Hungry.png';
			VenueHours = 'Monday - Friday: Breakfast: 7:00am - 10:30am, '+
				'Lunch: 11:00am - 5:00pm, Dinner: 5:00am - 7:30pm '+
				'Saturday-Sunday: Breakfast: 8:00am - 10:00am, Brunch: 10:00am - 1:30pm, '+
				'Dinner: 4:30pm - 7:30pm'; 
			VenueLocation = 'Wallace Complex';
			MenuItems = ['Tropical Delight','$4.99',
						 'Powerful Punch','$4.49',
						 'Something Good','$5.99',
						 'Something Bad','$7.99'];  
			break;
	}
	VenueInfo = [VenueName,LargeImage,VenueHours,VenueLocation,MenuItems];
	return VenueInfo;
}
