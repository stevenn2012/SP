var areas = {};
var rolls = {};

$(document).ready(function(){
	getAreas();
	getRolls();
	showAreas();
	showRolls();
	areaButton();
	$('#areaButton').click(function(){areaButton()});
});

function getAreas() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: areaList,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				console.log("Areas: "+JSON.stringify(data));
				if(data.list == "true"){
					areas = data.areas;
				}else{
					console.log("No tiene permisos para listar usuarios");
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function getRolls () {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: rollList,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				console.log("Rolls: "+JSON.stringify(data));
				if(data.accionListar == "true"){
					rolls = data.roles;
				}else{
					console.log("No tiene permisos para listar usuarios");
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function showAreas () {
	var data = '<option value="0">-- Seleccione la Area --</option>';
	for (var i = 0; i < areas.length; i++) {
		data += '<option value="'+areas[i].idArea+'">'+areas[i].name+'</option>';
	};
	$('#areaList').html(data);
}

function showRolls () {
	var data = '<option value="0">-- Seleccione el roll --</option>';
	for (var i = 0; i < rolls.length; i++) {
		data += '<option value="'+rolls[i].idRol+'">'+rolls[i].name+'</option>';
	};
	$('#rollList').html(data);
}

function areaButton() {
	var value = $('#areaButton').prop('checked');
	if(value){
		$('#areaList').val(0);
		$('#areaList').prop('disabled', true);
		$('#area').prop('disabled', false);
	}else{
		$('#areaList').prop('disabled', false);
		$('#area').prop('disabled', true);
		$('#area').val("");
	}
}

function createUser() {
	validateAccount();
	var dataAndAccount = {
		"document":$('#document').val(),
		"name":$('#name').val(),
		"usernameObj":$('#username').val(),
		"password":calcMD5($('#pass').val()),
		"email":$('#email').val(),
		"idarea":$( "#areaList option:selected" ).val(),
		"idRol":$( "#rollList option:selected" ).val(),
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};
	var validation = true;
	if(dataAndAccount.idArea == 0){
		if($('#area').val()!=""){
			dataAndAccount.idArea = 1;
		}else{
			validation = false;
		}
	}

	if(dataAndAccount.idRoll == 0){
		validation = false;
	}

	console.log("Crear: "+JSON.stringify(dataAndAccount));
	if(validation){
		$.ajax({
			url: createUserService,
			type: 'GET',
			data: dataAndAccount,
			async : true,
			dataTipe: 'JSON',
			success: function (data) {
				console.log("WebService Crear: "+JSON.stringify(data));
				if(data.create == "true"){
					console.log("bien");
					limpiarForm();
					$('#msCreateUser').html('<div class="alert alert-success" role="alert">Se creo el usuario con exito</div>');	
				}else{
					$('#msCreateUser').html('<div class="alert alert-warning" role="alert">No se pudo crear el usuario</div>');
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	$('#msCreateUser').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		$('#msCreateUser').html('<div class="alert alert-warning" role="alert">Faltan campos por llenar</div>');
	}
	
}

//e10adc3949ba59abbe56e057f20f883e

function limpiarForm() {
	$('#document').val("");
	$('#name').val("");
	$('#username').val("");
	$('#pass').val("");
	$('#email').val("");
	$('#areaList').val(0);
	$('#area').val("");
	$('#rollList').val(0);
}
