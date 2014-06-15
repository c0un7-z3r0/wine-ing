var mainMenuHtml = 'template/menuMain.html';

$.get(mainMenuHtml, function(data){
    $('.mainMenu').html(data);
});

function showMenu(menuType){
	var $subMenu = $('.subMenu');
	var subMenuTemplate = 'template/';

	if(menuType === 'admin'){
		subMenuTemplate += 'subMenuAdmin.html';
	}
	
	$('.content').html('');
	
	$.get(subMenuTemplate, function(data){
	    $subMenu.html(data);
	});
}

//TODO: Work out how to not display admin menu when costumer.