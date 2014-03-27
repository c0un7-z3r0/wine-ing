/**
 * 
 */
function includePage(pageName){
	$('.content').load(pageName);	
}

function searchWine(){
	var searchTerm = $('.searchTerm').val();
	$.get('routing',{searchWineForm:true, search: searchTerm},function(response) { 
		$('.content').append(response);     
    });
}