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

	$('#loginValidation').html("Validando usuario y contraseña");
	$('#user').prop("disabled",true);
	$('#pass').prop("disabled",true);
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
					$('#user').prop("disabled",false);
					$('#pass').prop("disabled",false);
					$('#pass').val("");
					$('#loginValidation').html("Lo sentimos! tu buscador no soporta Web Storages");
				}	
			}else{
				$('#user').prop("disabled",false);
				$('#pass').prop("disabled",false);
				if(data.status.indexOf('Intentos') != -1){
					$('#loginValidation').html("Usuario y/o contraseña incorrectos");
				}else{
					$('#loginValidation').html('<strong>Bloqueado! </strong>Supero los intentos de ingreso permitidos<br>Se le ha bloqueado el acceso temporalmente');
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
			$('#user').prop("disabled",false);
			$('#pass').prop("disabled",false);
		}
	});
}
