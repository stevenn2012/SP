$(document).ready(function(){
 	$(".clsInfo").change(function(){ cleanInfo("loginValidation")});
 	$('#user').focus();
});

function cleanInfo (id) {
	$("#"+id).html("");
}

function login () {
	var account = {
		"user":$('#user').val(),
		"pass":calcMD5($('#pass').val())
	};
	$.ajax({
		url: loginService,
		type: 'GET',
		data: account,
		async : true,
		dataTipe: 'JSON',
		success: function (data) {
			if(data.access == true){
				cleanInfo("loginValidation");
				if (typeof(Storage) !== "undefined") {
					$('#pass').val("");
				    sessionStorage.setItem("namel", data.namel);
				    sessionStorage.setItem("username", data.username);
				    sessionStorage.setItem("logincode", data.logincode);
				    sessionStorage.setItem("roll", data.roll);
				    window.location.assign('pages/');
				} else {
					$('#pass').val("");
					$('#loginValidation').html("Lo sentimos! tu buscador no soporta Web Storages");
				}	
			}else{
				if(data.status.indexOf('Intentos') != -1){
					$('#loginValidation').html("Usuario y/o contraseña incorrectos");
				}else{
					var str = data.status;
					var res = str.substring(11).replace('=',":");
					$('#loginValidation').html('Ha intentado ingresar fallidamente varias veces<br>En consecuencia Se ha bloqueado el accesso por un determinado tiempo<br>'+res);
				}
				singOut();
				$('#pass').val("");
				
			}
        },
        error: function(objXMLHttpRequest) {
        	singOut();
        	$('#pass').val("");
        	$('#loginValidation').html("Error de conexión");
			console.log("error",objXMLHttpRequest);
		}
	});
}
