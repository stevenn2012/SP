$(document).ready(function(){
	listUsers();
});

function listUsers() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: userList,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				if(data.validate == "true"){
					var users = data.users;
					console.log("Users: "+JSON.stringify(users));
					var content = '<table class="table table-bordered">';
					content+='<tr><th>id</th><th>Cedula</th><th>Nombre</th><th>Area</th><th>Nombre de usuario</th></tr>';
					for (var i = 0; i < users.length; i++) {
						content+='<tr>';
					    content+='<td>'+users[i].idUser+'</td>';
					    content+='<td>'+users[i].document+'</td>';
					    content+='<td>'+users[i].name+'</td>'; 
					    content+='<td>'+users[i].idArea+'</td>';
					    content+='<td>'+users[i].userName+'</td>';
  						content+='</tr>';
					};
					content += '</table>';
					$('#lista').html(content);
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