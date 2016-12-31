var contacts = [];
var address = [];
var productsServices = [];

$(document).ready(function(){
	//**Pruebas****
	address.push({
		"address":"cra 78a n 58p 09 sur",
		"city":"Bogota",
		"country":"Colombia"
	});

	contacts.push({
		"name":"Steven Puerto",
		"email":"2012Stevenn@gmail.com",
		"phoneNumber":"(+57 3015436823)"
	});

	productsServices.push({
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
	if(address.length > 0){
		var data = '<table class="table table-bordered"><tr>';
		data += '<th>Direccion</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < address.length; i++) {
			data += '<tr>';
			data += '<td>'+address[i].address+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
		$('#addressTable').html(data);
	}
}

function listContacts() {
	console.log("LIST CONTACTS "+contacts.length+", "+JSON.stringify(contacts));
	if(contacts.length > 0){
		var data = '<table class="table table-bordered"><tr>';
		data += '<th>Nombre</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < contacts.length; i++) {
			data += '<tr>';
			data += '<td>'+contacts[i].name+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
		$('#contactsTable').html(data);
	}
}

function listProductsServices() {
	console.log("LIST PRODUCTS SERVICES "+productsServices.length+", "+JSON.stringify(productsServices));
	if(productsServices.length > 0){
		var data = '<table class="table table-bordered"><tr>';
		data += '<th>Producto o servicio</th>';
		data += '<th>Ver</th>';
		data += '<th>Editar</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < productsServices.length; i++) {
			data += '<tr>';
			data += '<td>'+productsServices[i].name+'</td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEdit"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
		$('#productsServicesTable').html(data);
	}
}