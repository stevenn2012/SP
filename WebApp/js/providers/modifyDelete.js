var Provider = [];
$(document).ready(function(){
	initProviders();
	$(".filter").keyup(function(){listProviders()});
});

function initProviders() {
	Provider = newDinamicOWS(false);
	loadProviders();
}

function loadProviders() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = Provider.get(providersList ,dataAndAccount, 'name', 'providers');
	if(data.success == false) showMessage(data.status, 'danger');
	listProviders();
}

function listProviders() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Direcciones</th><th>Contactos</th><th>Productos y servicios</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < Provider.dataArray.length; i++) {
		var provider = (Provider.dataArray[i].NIT+Provider.dataArray[i].name+Provider.dataArray[i].description).toUpperCase();
		if(find == "" || provider.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+Provider.dataArray[i].NIT+'</td>';
			data+='<td>'+Provider.dataArray[i].name+'</td>';
			data+='<td>'+Provider.dataArray[i].description+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeAddress('+Provider.dataArray[i].idProvider+')">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeContacts('+Provider.dataArray[i].idProvider+')">Contactos</button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeProductServices('+Provider.dataArray[i].idProvider+')">Productos y servicios</button></td>';
		  	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditProvider" onclick="editProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
		  	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteProvider" onclick="deleteProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron usuarios");
	}else{ $('#msfind').html(""); }
	content += data+'</table>';
	$('#lista').html(content);
}

function modalSee (number, titleModal, titlePanel, info, message) {
	$('#myModalSeeLabel').html(titleModal);
	var data = '<div class="scroll panel panel-info"><div class="panel-heading">'+titlePanel+'</div><div class="panel-body">';
	data += '<p>'+message+'</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	data += info;
	data += '</div></div></div>';		
	$('#bodyModalSeeAddress').html(data);
}

function seeAddress(idProvider) {
	var provider = Provider.getById(idProvider, 'idProvider', false, '');
	//console.log("SEE ADDRESS: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran las direcciones del proveedor seleccionado, de click sobre la direccion para ver mas informacion.';
	var number = 1;
	var data = '';
	var address = provider.address;
	for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	    data += '</div></div></div>';	
	}
   	modalSee(number, 'Direcciones', 'Direcciones de '+provider.name, data, message);
}

function seeContacts(idProvider) {
	var provider = Provider.getById(idProvider, 'idProvider', false, '');
	//console.log("SEE CONTACTS: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los contactos del proveedor seleccionado, de click sobre el contacto para ver mas informacion.';
	var number = 1;
	var data = '';
	var contacts = provider.contacts;
	for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";
	    data += '</div></div></div>';
	}
   	modalSee(number, 'Contactos',  'Contactos de '+provider.name, data, message);
}

function seeProductServices(idProvider) {
	var provider = Provider.getById(idProvider, 'idProvider', false, '');
	//console.log("SEE PRODUCTS SERVICES: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los productos y servicios del proveedor seleccionado, de click sobre el producto o servicio para ver mas informacion.';
	var number = 1;
	var data = '';
	var productServices = provider.productServices;
	for (var i = 0; i <productServices.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += productServices[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    data += '<strong>Producto o servicio: </strong>'+productServices[i].name+"<br>";
	    data += '<strong>Precio: </strong>'+formatNumber.new(parseFloat(productServices[i].price), "$")+"<br>";
	    data += '<strong>Descripcion: </strong>'+productServices[i].description+"<br>";
	    data += '</div></div></div>';
	}
   	modalSee(number, 'Productos y servicios',  'Productos y servicios de '+provider.name, data, message);
}

function deleteProvider(idProvider) {
	console.clear();
	var provider = Provider.getById(idProvider, 'idProvider', true, 'Proveedor a eliminar');
	var data = '<p> Esta a punto de borrar el proveedor con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading">Proveedor</div><div class="panel-body">';
    
  	data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
  	$('#bodyModalDeleteProvider').html(data);
  	ApprovedDeleteProvider(provider.idProvider);
  	loadProviders();
}

function ApprovedDeleteProvider(idProvider) {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, 'idProvider':idProvider};
	Provider.remove(deleteProviderService ,dataAndAccount, '');
}

function editProvider(idProvider){
	console.clear();
	var provider = Provider.getById(idProvider, 'idProvider', true, 'Proveedor a editar');
}