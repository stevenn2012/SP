$(document).ready(function(){
	if(sessionStorage.roll != "Gerencia"){
		$('#usersOption').css("display","none");
		$('#clientsOption').css("display","none");
		$('#providersOption').css("display","none");
	}
});
