/**
 * 
 */
function includePage(pageName){
	$('.content').load(pageName);	
}
function  generateWineTable(json){
	var table	=	'<table class="wineTable">';
	var headRow =	'<thead><tr>' +
						'<th>Name</th>'+
						'<th>Kind</th>'+
						'<th>Region</th>'+
						'<th>Winemaker</th>'+
						'<th>Type</th>'+
						'<th>Price</th>'+
					'</tr>'+'</thead>'+'<tbody>';
	table += headRow;
	$.each(json.wineList, function(index, item){
		console.log(index + item['kind']);
			row	 =	'<tr>';
			row	+=	'<td>' + item['name'] + '</td>';
			row	+=	'<td>' + item['kind'] + '</td>';
			row	+=	'<td>' + item['region'] + '</td>';
			row	+=	'<td>' + item['winemaker'] + '</td>';
			row	+=	'<td>' + item['type'] + '</td>';
			row	+=	'<td>' + (item['price']).toFixed(2) + '&euro;' + '</td>';
			row +=	'</tr>';

		table += row;
	});
	table += '</tbody></table>';
	return table;
}


function getAllWine(){
	$.getJSON('routing',{getAllWine:true})
		.done(function(json){
			$('.content').html(generateWineTable(json));
		})
		.fail(function(jqxhr, textStatus, error){
			  var err = textStatus + ", " + error;
			  console.log( "Request Failed: " + err );
		});
}
function searchWine(){
	var searchTerm = $('.searchTerm').val();
	$.getJSON('routing',{searchWineForm:true, search: searchTerm})
		.done(function(json){
			//TODO: add table sorting
			$('.content').html(generateWineTable(json));
			
		})
		.fail(function(jqxhr, textStatus, error){
			  var err = textStatus + ", " + error;
			  console.log( "Request Failed: " + err );
		});
}
