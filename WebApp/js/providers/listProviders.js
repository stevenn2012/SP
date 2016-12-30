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
			url: providersList,
			type: 'GET',
			data: accountLog,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				console.log("GET PROVIDERS: "+JSON.stringify(data));
				if(data.validate == "true"){
					providers = sortByKey(data.providers, 'name');
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

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key].toUpperCase(); var y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Direcciones</th><th>Contactos</th><th>Productos y servicios</th></tr>';
	var data = "";
	for (var i = 0; i < providers.length; i++) {
		var provider = (providers[i].NIT+providers[i].name+providers[i].description).toUpperCase();
		if(find == "" || provider.indexOf(find)!=-1){
			data+='<tr>';
			//data+='<td>'+providers[i].idProvider+'</td>';
			data+='<td>'+providers[i].NIT+'</td>';
			data+='<td>'+providers[i].name+'</td>';
			data+='<td>'+providers[i].description+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="seeAddress('+providers[i].idProvider+')">Ver Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="seeContacts('+providers[i].idProvider+')">Ver Contactos</button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="seeProductServices('+providers[i].idProvider+')">Ver Productos y servicios</button></td>';
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

function seeAddress(idProvider) {
	console.log("SEE ADDRESS: "+idProvider);
	var provider = getProvider(idProvider);
	console.log(JSON.stringify(provider));
	
}

function seeContacts(idProvider) {
	console.log("SEE CONTACTS: "+idProvider);
	var provider = getProvider(idProvider);
	console.log(JSON.stringify(provider));

}

function seeProductServices (idProvider) {
	console.log("SEE PRODUCTS SERVICES: "+idProvider);
	var provider = getProvider(idProvider);
	console.log(JSON.stringify(provider));

}


function getProvider(idProvider) {
	for (var i = 0; i <providers.length; i++) {
		if(idProvider == providers[i].idProvider){
			return providers[i];
		}
	};
}