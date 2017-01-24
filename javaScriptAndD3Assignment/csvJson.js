var fs = require('fs');
var readableStream = fs.createReadStream('FoodFacts.csv');
var writeStream=fs.createWriteStream("output.json");
var writeStream1=fs.createWriteStream("europeanCountries.json");
var data = '';
var result1;
readableStream.on('data', function(chunk) {
	data+=chunk;
}).on('end', function() {

	//getting the positin of element
var json=csvJSON(data);
 var filtered=json.filter(barChartForcountries);
  var  allCountry=(filtered);
	var newarray=addSum(filtered);
	var mapfiltered=filtered.map(mapForSugarSalt);

	writeStream.write(JSON.stringify(newarray));
	writeStream.end();

	/////writing for northEurope
  var filteredNorthEurope=json.filter(northEurope);
    var mapfilteredNorthEurope=filteredNorthEurope.map(mapForNorthEurope);

	/////////writing for centralEurope
	var filteredCentralEurope=json.filter(centralEurope);
    var mapfilteredCentralEurope=filteredCentralEurope.map(mapForCentralEurope);

	/////////writing for southEurope
	var filteredSouthEurope=json.filter(northEurope);
    var mapfilteredSouthEurope=filteredSouthEurope.map(mapForSouthEurope);

	//////mrging arrays and creating one jason for different geographical regions
	var arrEurope=mapfilteredNorthEurope.concat(mapfilteredCentralEurope,mapfilteredSouthEurope)	;
	//console.log(arrEurope);
	var addSumEuropian1=addSumEuropian(arrEurope);
	writeStream1.write(JSON.stringify(addSumEuropian1));
	writeStream1.end();

});

///function
function csvJSON(readStream){
	var lines=readStream.toString().split("\n");
	//console.log(lines[0]);
	var result1 = [];

	var headers=lines[0].split(",");

	var	 countryIndex=headers.indexOf("countries_en");
	var sugarIndex=headers.indexOf("sugars_100g");
	var saltIndex=headers.indexOf("salt_100g");
	var fatIndex=headers.indexOf("fat_100g");
 	var proteinsIndex=headers.indexOf("proteins_100g");
	var carbohyderatesIndex=headers.indexOf("carbohydrates_100g");
	//var dateIndex=headers.indexOf("created_datetime");

	for(var i=1;i<lines.length;i++){

		var obj = {};
		var currentline=lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
			 obj[headers[countryIndex]]=currentline[countryIndex];
			 obj[headers[sugarIndex]]=currentline[sugarIndex];
			 obj[headers[saltIndex]]=currentline[saltIndex];
       obj[headers[fatIndex]]=currentline[fatIndex];
			 obj[headers[proteinsIndex]]=currentline[proteinsIndex];
			 obj[headers[carbohyderatesIndex]]=currentline[carbohyderatesIndex];
			// obj[headers[dateIndex]]=currentline[dateIndex];

		result1.push(obj);
//console.log(result1);
	}
return result1;
}
///filter function
 function barChartForcountries(json){
 if (json.sugars_100g!="" && json.salt_100g!="" && ((json.countries_en=="Netherlands")||(json.countries_en=="Canada")||(json.countries_en=="UK/USA")||(json.countries_en=="Australia")||(json.countries_en=="France")||(json.countries_en=="Germany")||(json.countries_en=="Spain")||(json.countries_en=="South Africa")));
 {
	return true;
 }
 }
 ////////////////////// Create three regions according to the geographical place of the European countries
	function northEurope(json){
	if ((json.countries_en=="United Kingdom")||(json.countries_en=="Denmark")||(json.countries_en=="Sweden")||(json.countries_en=="Norway")&&json.fat_100g!=""&&json.proteins_100g!=""&&json.carbohydrates_100g!=0)
	{
	 return true;
	 }
	 }
	/////////
	function centralEurope(json){
		if ((json.countries_en=="France")||(json.countries_en=="Belgium")||(json.countries_en=="Germany")||(json.countries_en=="Switzerland")||(json.countries_en=="Netherlands"))
		 {
			return true;
			}
		 }
		//////////
	function southEurope(json) {
		if ((json.countries_en=="Portugal")||(json.countries_en=="Greece")||(json.countries_en=="Italy")||(json.countries_en=="Spain")||(json.countries_en=="Croatia")||(json.countries_en=="Albania"))
		 {
	  	return true;
	  	}
  	}
 //////// function for removing repeted country
 function addSum(filtered) {
var 	myArray=[{ counteries_en:"Netherlands",sugars_100g:0,salt_100g:0}
	,{counteries_en:"Canada",sugars_100g:0,salt_100g:0},
	{counteries_en:"United States",sugars_100g:0,salt_100g:0},
	{counteries_en:"Australia",sugars_100g:0,salt_100g:0},
	{counteries_en:"France",sugars_100g:0,salt_100g:0},
	{counteries_en:"Germany",sugars_100g:0,salt_100g:0},
	{counteries_en:"Spain",sugars_100g:0,salt_100g:0},
	{counteries_en:"South Africa",sugars_100g:0,salt_100g:0}
];
	console.log(myArray.length);
 	for (var i = 0; i < myArray.length; i++) {
 		var addSugar=0;
		var addSalt=0;
 		for (var j = 0; j < filtered.length; j++) {
 			if (myArray[i].counteries_en == filtered[j].countries_en)
			 {
 			 addSugar+= +filtered[j].sugars_100g;
 			 addSalt+= +filtered[j].salt_100g;
 			 }
 		}
		myArray[i]["sugars_100g"]=addSugar;
		myArray[i]["salt_100g"]=addSalt;
 	}
	console.log(myArray);
return myArray;
 }

 //////////add sum for different europian regions
 function addSumEuropian(arrEurope) {
	 var 	myArray=[{ Region:"NorthEurope",fat:0,proteins:0,carbohydrates:0}
 		,{Region:"centralEurope",fat:0,proteins:0,carbohydrates:0},
 		{Region:"southEurope",fat:0,proteins:0,carbohydrates:0}];
		console.log(myArray.length);
	 	for (var i = 0; i < myArray.length; i++) {
	 		var addFat=0;
			var addProteins=0;
			var addCarbohyderates=0;
	 		for (var j = 0; j < arrEurope.length; j++) {
	 			if (myArray[i].Region == arrEurope[j].Region)
				 {
	 			 addFat+= +arrEurope[j].fat;
	 			 addProteins+= +arrEurope[j].proteins;
				 addCarbohyderates+= +arrEurope[j].carbohydrates;
	 			 }
	 		}
			myArray[i]["fat"]=addFat;
			myArray[i]["proteins"]= addProteins;
				myArray[i]["carbohydrates"]= addCarbohyderates;
	 	}
		console.log(myArray);
	return myArray;
 }

 //////for geographical plcae
 function mapForNorthEurope(item){
 	var newArray={Region:'NorthEurope',Dates:item.created_datetime,fat:item.fat_100g,proteins:item.proteins_100g,carbohydrates:item.carbohydrates_100g};

 	return newArray;
 }
 function mapForCentralEurope(item){
	 var newArray={Region:'centralEurope',Dates:item.created_datetime,fat:item.fat_100g,proteins:item.proteins_100g,carbohydrates:item.carbohydrates_100g};
	 return newArray;
 }
 function mapForSouthEurope(item){
	 var newArray={Region:'southEurope',Dates:item.created_datetime,fat:item.fat_100g,proteins:item.proteins_100g,carbohydrates:item.carbohydrates_100g};
	 return newArray;
 }
/////////
function mapForSugarSalt(item) {
	var newArray1=[{countries_en:item.countries_en},{sugars_100g:item.sugars_100g},{salt_100g:item.salt_100g}];
	return newArray1;
}
