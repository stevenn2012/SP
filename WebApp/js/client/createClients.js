$(document).ready(function(){
	
});

function createUser() {
	validateAccount();
	var account = {
		"name":$('#name').val(),
		"username":$('#user').val(),
		"password":calcMD5($('#pass').val()),
		"rol":$('input:radio[name=rol]:checked').val(),
		"user":sessionStorage.username,
		"loginCode":sessionStorage.loginCode
	};
	$.ajax({
		url: createuserService,
		type: 'GET',
		data: account,
		async : true,
		dataTipe: 'JSON',
		success: function (data) {
			if(data.create == true){
				limpiarForm();
				$('#createUserInfo').html('<div class="alert alert-info" role="alert">Created user</div>');	
			}else{
				$('#pass').val("");
				if(data.permit == 'false'){
					$('#createUserInfo').html('<div class="alert alert-warning" role="alert">You do not have permissions to create users</div>');
				}else if(data.permit == true){
					$('#createUserInfo').html('<div class="alert alert-danger" role="alert">Could not create user</div>');
				}
			}
        },
        error: function(objXMLHttpRequest) {
        	$('#createUserInfo').html('<div class="alert alert-danger" role="alert">Connection error</div>');
        	$('#pass').val("");
        	console.log("error",objXMLHttpRequest);
		}
	});
}

function limpiarForm() {
	$('#name').val("");
	$('#user').val("");
	$('#pass').val("");
	$('input:radio[name=rol]:checked').attr('checked', false);
}
