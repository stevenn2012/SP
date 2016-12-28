$(document).ready(function(){
	getProviders();
	listProviders();
	$(".filter").keyup(function(){listProviders()});
});

var providers = {};
function getProviders() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLog = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		$.ajax({
			url: userList,
			type: 'GET',
			data: accountLog,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				console.log("GET PROVIDERS: "+JSON.stringify(data));
				if(data.validate == "true"){
					providers = data.users;
				}else{
					console.log("No tiene permisos para listar proveedores");
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

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Cedula</th><th>Nombre</th><th>Nombre de usuario</th><th>Correo electronico</th><th>Area</th><th>Roll</th></tr>';
	var data = "";
	for (var i = 0; i < providers.length; i++) {
		var provider = (providers[i].document+providers[i].name+providers[i].username+providers[i].email+providers[i].area+providers[i].roll).toUpperCase();
		if(find == "" || provider.indexOf(find)!=-1){
			data+='<tr>';
			//content+='<td>'+providers[i].iduser+'</td>';
			data+='<td>'+providers[i].document+'</td>';
			data+='<td>'+providers[i].name+'</td>';
			data+='<td>'+providers[i].username+'</td>';
			data+='<td>'+providers[i].email+'</td>'; 
			data+='<td>'+providers[i].area+'</td>';
			data+='<td>'+providers[i].roll+'</td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){
		$('#msfind').html("No se encontraron usuarios");
	}else{
		$('#msfind').html("");
	}
	content += data+'</table>';
	$('#lista').html(content);
}