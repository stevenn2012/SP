//http://www.danstools.com/javascript-obfuscate/index.php
$(document).ready(function(){
 	$(".clsInfo").change(function(){ cleanInfo("loginValidation")});
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
				    sessionStorage.setItem("logincode", data.loginCode);
				    sessionStorage.setItem("roll", data.roll);
				    window.location.assign('pages/');
				} else {
					$('#pass').val("");
					$('#loginValidation').html("Lo sentimos! tu buscador no soporta Web Storages");
				}	
			}else{
				singOut();
				$('#pass').val("");
				$('#loginValidation').html("Usuario y/o contraseña incorrectos");
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
