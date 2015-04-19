
function showNutritionPage(MenuItem) {
	
	
	var NutritionInfo = [];

	NutritionInfo = getMenuVerdict(MenuItem);

	var nameLabel = Ti.UI.createLabel({
		color:'#525252',
		text:NutritionInfo[0],
		font:{fontSize:16, fontFamily:'Calibri'},
		textAlign:'center',
		top:'10%'
	}); 

	var infoLabel = Ti.UI.createLabel({
		color:'#525252',
		text:'Calories\n\nCalories from Fat\n\nTotal Fat\n\n    Saturated Fat\n\n    Trans Fat\n\nProtein\n\nSodium',
		font:{fontSize:16, fontFamily:'Calibri'},
		textAlign:'left',
		top:'20%',
		left:'23%'
	}); 

	var numberLabel = Ti.UI.createLabel({
		color:'#525252',
		text:NutritionInfo[1]+'\n\n'+
			 NutritionInfo[2]+'\n\n'+
			 NutritionInfo[3]+'\n\n'+
			 NutritionInfo[4]+'\n\n'+
			 NutritionInfo[5]+'\n\n'+
			 NutritionInfo[6]+'\n\n'+
			 NutritionInfo[7],
		font:{fontSize:16, fontFamily:'Calibri'},
		textAlign:'left',
		top:'20%',
		left:'67%'
	});
	
	var nutritionWindow = Ti.UI.createWindow({
		backgroundColor:'#FFFFFF',
		title:'Menu Item Nutrition Info'
	});
	
	var closeNutritionButton = Titanium.UI.createButton ({
		title: 'Return to Venue Page',
		bottom:'1%',
		//top:1,
		//left:10,
		height: 30,
		borderWidth : 2,
		borderColor: 'black',
		borderRadius: 8,
		backgroundColor: '#e9daa5'	
	});	
	
	closeNutritionButton.addEventListener('click', function(){
		win1.close(nutritionWindow);
		nutritionWindow.hide();
  
	});
	
	nutritionWindow.add(nameLabel);
	nutritionWindow.add(infoLabel);
	nutritionWindow.add(numberLabel);
	nutritionWindow.add(closeNutritionButton);
	win1.add(nutritionWindow);
};


function getMenuVerdict(MenuItem) {
	//Set all venue information based on selected row.	
	//Generally the nutrition information would be stored in a database or a table but we will 
	//  go ahead a just set up an multidimensional array with sample data.	

  	var NutritionInfo = [];
  	var SearchString;
  	var MenuItemDetail = [
		['Item','Calories','Calories from Fat','Total Fat','Saturated Fat', 'Trans Fat', 'Protein','Sodium'],
		['New England Clam Chowder','235','322','1g','2g','0g', '12g','290mg'],
		['Classic Tomato Soup','215','312','2g','2.5g','1g', '8g','260mg'],
		['Chicken Noodle Soup','215','312','2g','2.5g','1g', '8g','260mg'],
		['Vegetable Beef Soup','215','312','2g','2.5g','1g', '8g','260mg'],
		['Beef Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Turkey Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Ham Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Chicken Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Bacon Pita','215','312','2g','2.5g','1g', '8g','360mg'],
		['Veggie Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Hummus Pita','215','312','2g','2.5g','1g', '8g','260mg'],
		['Breakfast Burrito','215','312','2g','2.5g','1g', '8g','260mg'],
		['Vegetable Beef Soup','215','312','2g','2.5g','1g', '8g','260mg'],
		['Sub Sandwich','215','312','2g','2.5g','1g', '8g','260mg'],
		['Vegetable Beef Soup','215','312','2g','2.5g','1g', '8g','260mg']
	];

  for (var i=0; i < MenuItemDetail.length; i++)
  {
    SearchString = MenuItemDetail[i][0];

    if (SearchString.indexOf(MenuItem) >=0)
    {

      NutritionInfo = MenuItemDetail[i];
      break;
    }
  }
  if (i == MenuItemDetail.length)
  {
    NutritionInfo = ["Information not found for "+ MenuItem,'0','0','0','0','0','0','0']; 
  }

  return NutritionInfo;
	
};

/*
 * 
 function nutritionView() {
	
	var nutrBackgroundView = Ti.UI.createView({
		backgroundColor:'#ffffff' //'#F2EDCB'
	});
	
	var tableView = Ti.UI.createTableView({
			style: Ti.UI.iPhone.TableViewStyle.GROUPED,
			//backgroundColor:'#F2EDCB',
			scrollable: true
	});
	
	var firstSection = Ti.UI.createTableViewSection({
		headerTitle: 'Nutrition Info'
	});
	var secondSection = Ti.UI.createTableViewSection({
		headerTitle: 'Contains'
	});
													
	var firstRow = Ti.UI.createTableViewRow({
		title: 'Serving Size:                     one portion',
		//backgroundColor: '#ffffff', //color of the row
		color:'#525252', //color of the text
		textAlign:'center'
	});
	
	var secondRow = Ti.UI.createTableViewRow({
		title: 'Calories:                                        345',
		backgroundColor: '#EEEEF3',
		color:'#525252',
		textAlign:'center'
		});
	
	var thirdRow = Ti.UI.createTableViewRow({
		title: 'Total Fat:                              20g',
		backgroundColor: '#EEEEF3',
		color:'#525252'
		});
		
	var fourthRow = Ti.UI.createTableViewRow({
		title: '  Saturated Fat',
		backgroundColor: '#EEEEF3',
		color:'#525252'
	});
	
	var fifthRow = Ti.UI.createTableViewRow({
		title: 'Calcium',
		backgroundColor: '#EEEEF3',
		color:'#525252'
	});
	
	
	

	firstSection.add(firstRow);
	firstSection.add(secondRow);
	firstSection.add(thirdRow);
	firstSection.add(fourthRow);
	firstSection.add(fifthRow);
	tableView.setData([firstSection]);
	tableView.setDate([secondSection]);
	nutrBackgroundView.add(tableView);
	return nutrBackgroundView;
	
};
*/
