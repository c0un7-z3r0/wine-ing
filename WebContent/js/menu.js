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
	if(menuType === 'costumer'){
		subMenuTemplate += 'subMenuCostumer.html';
	}
	
	$('.content').html('');
	
	$.get(subMenuTemplate, function(data){
	    $subMenu.html(data);
	});
}