var contacts = [];
var address = [];
var productsServices = [];
var pointerAddress = 0;
var pointerContacts = 0;
var pointerProductsServices = 0;

$(document).ready(function(){
	//**Pruebas****
	address.push({
		"id":pointerAddress++,
		"address":"cra 78a n 58p 09 sur",
		"city":"Bogota",
		"country":"Colombia"
	});

	contacts.push({
		"id":pointerContacts++,
		"name":"Steven Puerto",
		"email":"2012Stevenn@gmail.com",
		"phoneNumber":"(+57 3015436823)"
	});

	productsServices.push({
		"id":pointerProductsServices++,
		"name":"Televisor HD",
		"description":"Televisor pantalla pantalla plana hd",
		"price":"500000"
	});
	//*************
	listAddress();
	listContacts();
	listProductsServices();
});

function listAddress() {
	console.log("LIST ADDRESS "+address.length+", "+JSON.stringify(address));
	var data = '';
	if(address.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Direccion</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < address.length; i++) {
			data += '<tr>';
			data += '<td>'+address[i].address+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="removeAddress('+address[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#addressTable').html(data);
}

function listContacts() {
	console.log("LIST CONTACTS "+contacts.length+", "+JSON.stringify(contacts));
	var data = '';
	if(contacts.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Nombre</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < contacts.length; i++) {
			data += '<tr>';
			data += '<td>'+contacts[i].name+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="removeContact('+contacts[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#contactsTable').html(data);
}

function listProductsServices() {
	console.log("LIST PRODUCTS SERVICES "+productsServices.length+", "+JSON.stringify(productsServices));
	var data = '';
	if(productsServices.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Producto o servicio</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < productsServices.length; i++) {
			data += '<tr>';
			data += '<td>'+productsServices[i].name+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit" onclick="removeProductService('+productsServices[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#productsServicesTable').html(data);
}

function removeAddress (idAddress) {
	console.log("REMOVE ADDRESS: "+idAddress);
	for (var i = 0; i < address.length; i++) {
		if(idAddress == address[i].id){
			address.splice(i,1);
			break;
		}	
	}
	listAddress();
}

function removeContact (idContact) {
	console.log("REMOVE CONTACT: "+idContact);
	for (var i = 0; i < contacts.length; i++) {
		if(idContact == contacts[i].id){
			contacts.splice(i,1);
			break;
		}	
	}
	listContacts();
}

function removeProductService (idProductServices) {
	console.log("REMOVE PRODUCT SERVICE: "+idProductServices);
	for (var i = 0; i < productsServices.length; i++) {
		if(idProductServices == productsServices[i].id){
			productsServices.splice(i,1);
			break;
		}	
	}
	listProductsServices();
}