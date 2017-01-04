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
	if(data.success == false) showMessage('msModifyDelete', 'nameEmployed', data.status, 'danger', 'default', true);
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
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeAddress(1, '+Provider.dataArray[i].idProvider+',true)">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeContacts(1, '+Provider.dataArray[i].idProvider+', true)">Contactos</button></td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSee" onclick="seeProductServices(1, '+Provider.dataArray[i].idProvider+', true)">Productos y servicios</button></td>';
		  	data+='<td><button id="Edit'+Provider.dataArray[i].idProvider+'" class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditProvider" onclick="editProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
		  	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteProvider" onclick="deleteProvider('+Provider.dataArray[i].idProvider+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron usuarios");
	}else{ $('#msfind').html(""); }
	content += data+'</table>';
	$('#lista').html(content);
}

function modalSee (number, titleModal, titlePanel, info, message, idModal) {
	$('#myModalSeeLabel').html(titleModal);
	var data = '<div class="scroll panel panel-info"><div class="panel-heading">'+titlePanel+'</div><div class="panel-body">';
	data += '<p>'+message+'</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	data += info;
	data += '</div></div></div>';		
	$('#'+idModal).html(data);
}

function seeAddress(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE ADDRESS: "+idProvider);
	var message = 'Acontinuacion se muestran las direcciones del proveedor seleccionado, de click sobre la direccion para ver mas informacion.';
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
	   	if(edit) data+='<button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditAddress" onclick="editAddress('+provider.idProvider+','+address[i].idAddress+')">Editar</button>';
	    data += '</div></div></div>';	
	}
   	modalSee(number, 'Direcciones', 'Direcciones de '+provider.name, data, message, idModal);
}

function seeContacts(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE CONTACTS: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los contactos del proveedor seleccionado, de click sobre el contacto para ver mas informacion.';
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
	    if(edit) data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditContact" onclick="editContact('+provider.idProvider+','+contacts[i].idContact+')">Editar</button></td>';
	    data += '</div></div></div>';
	}
   	modalSee(number, 'Contactos',  'Contactos de '+provider.name, data, message, idModal);
}

function seeProductServices(number, idProvider, edit, idModal) {
	if(idModal==undefined) idModal = 'bodyModalSee';
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a mostrar');
	//console.log("SEE PRODUCTS SERVICES: "+JSON.stringify(provider));
	var message = 'Acontinuacion se muestran los productos y servicios del proveedor seleccionado, de click sobre el producto o servicio para ver mas informacion.';
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
	    if(edit) data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditPS" onclick="editPS('+provider.idProvider+','+productServices[i].idProductService+')">Editar</button></td>';
	    data += '</div></div></div>';
	}
   	modalSee(number, 'Productos y servicios',  'Productos y servicios de '+provider.name, data, message, idModal);
}

function deleteProvider(idProvider) {
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a eliminar');
	var data = '<p> Esta a punto de borrar el proveedor con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading">Proveedor</div><div class="panel-body">';
    data += '<Strong>NIT : </strong>'+provider.NIT+"<br>";
    data += '<Strong>Nombre : </strong>'+provider.name+"<br>";
    data += '<Strong>Descripcion : </strong>'+provider.description+"<br>";
    
    data += '<Strong>Direcciones : </strong>';
    data += '<div id="seeAddressDelete"></div>';
    data += '<Strong>Contactos : </strong>';
    data += '<div id="seeContactsDelete"></div>';
    data += '<Strong>Productos y servicios : </strong>';
    data += '<div id="seeProductsServicesDelete"></div>';
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
  	$('#bodyModalDeleteProvider').html(data);

  	seeAddress(2, idProvider, false,'seeAddressDelete');
  	seeContacts(3, idProvider, false,'seeContactsDelete');
  	seeProductServices(4, idProvider, false, 'seeProductsServicesDelete');

  	var buttons = '<button id="continueDelete" type="button" class="btn btn-primary" onclick="ApprovedDeleteProvider('+idProvider+')">Continuar, Borrar el proveedor</button>';
  	buttons += '<button id="closeDeleteProvider" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#modalDeleteProviderContinueButton').html(buttons);	
}

function ApprovedDeleteProvider(idProvider) {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, 'idProvider':idProvider};
	var data = Provider.remove(deleteProviderService ,dataAndAccount, '');
	if(data.success == false) Provider.showMessage('msModifyDelete', 'nameEmployed', data.status, 'danger', 'default', true);
	else Provider.showMessage('msModifyDelete', 'nameEmployed', 'Se elimino el proveedor con exito!', 'success', 'default', true);
	$('#closeDeleteProvider').click();
	loadProviders();
}

function editProvider(idProvider){
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar');
	
	var data = '<form action="javascript:ApprovedEditProvider()"><div id="messageEditProvider"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-default">';
  	data += '<div class="panel-heading">Informacion del proveedor</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditProvider',true);
	data += generateInput('NIT','input','text','nitEditProvider',true);
	data += generateInput('Nombre','input','text','nameEditProvider',true);
	data += generateInput('Descripcion','input','textarea','descriptionEditProvider',false);
    data += '</div></div>';
	data += '<div class="panel panel-default">';
  	data += '<div class="panel-heading">Más informacion del proveedor</div>';
  	data += '<div class="panel-body">';
    data += '<p>Para editar una de las siguientes opciones de click sobre el elemento que desea editar y oprima el boton editar</p>';
    data += '<label for="exampleInputEmail1">Direcciones: </label>';
    data += '<div id="editAddressDelete"></div>';
    data += '<label for="exampleInputEmail1">Contactos: </label>';
    data += '<div id="editContactsDelete"></div>';
    data += '<label for="exampleInputEmail1">Productos y/o servicios: </label>';
    data += '<div id="editProductsServicesDelete"></div>';
    data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
    
    data += '</form>';
    $('#bodyModalEditProvider').html(data);

    $('#idEditProvider').val(provider.idProvider);
 	$('#nitEditProvider').val(provider.NIT);
 	$('#nameEditProvider').val(provider.name);
 	$('#descriptionEditProvider').val(provider.description); 
 	
 	seeAddress(2, idProvider, true,'editAddressDelete');
  	seeContacts(3, idProvider, true,'editContactsDelete');
  	seeProductServices(4, idProvider, true, 'editProductsServicesDelete');
}

function generateInput (title, typeTag, type, idInput, required) {
	var data = '<div class="form-group">';
	if(type.toLowerCase() != 'hidden') data +='<label for="exampleInputEmail1">'+title+'</label>';
	data += '<'+typeTag+' id="'+idInput+'" type="'+type+'" name="comment" class="form-control" form="form" placeholder="'+title+'"'; 
	if(required) data += 'required';
	if(type.toLowerCase() == 'textarea') data += 'style="max-width:100%;"></textarea';	
	data += '></div>';
	return data;
}

function ApprovedEditProvider(){
	console.log("ApprovedEditProvider");
}

function editAddress (idProvider, idAddress) {
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar direccion');
	var address = findElement(provider.address, 'idAddress', idAddress);
	console.log(address);

	var data = '<form action="javascript:ApprovedEditAddress()"><div id="messageEditAddress"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Direccion del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditAddress',true);
	data += generateInput('Pais','input','text','countryEditAddress',false);
	data += generateInput('Ciudad electronico','input','text','cityEditAddress',false);
	data += generateInput('Direccion','input','text','addressEditAddress',true);
     data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Direccion");

    $('#idEditAddress').val(address.idContact);
 	$('#countryEditAddress').val(address.pais);
 	$('#cityEditAddress').val(address.ciudad);
 	$('#addressEditAddress').val(address.direccion); 

	$('#modalEditElementProvider').modal('show');
}

function ApprovedEditAddress(){
	console.log("ApprovedEditAddress");
}

function editContact (idProvider, idContact) {
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar contacto');
	var contact = findElement(provider.contacts, 'idContact', idContact);
	console.log(contact);
	
	var data = '<form action="javascript:ApprovedEditContact()"><div id="messageEditContact"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Contacto del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditContact',true);
	data += generateInput('Nombre','input','text','nameEditContact',true);
	data += generateInput('Correo electronico','input','text','emailEditContact',true);
	data += generateInput('Telefono','input','text','phoneEditContact',true);
     data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Contacto");

    $('#idEditContact').val(contact.idContact);
 	$('#nameEditContact').val(contact.name);
 	$('#emailEditContact').val(contact.email);
 	$('#phoneEditContact').val(contact.phoneNumber); 

	$('#modalEditElementProvider').modal('show');
}

function ApprovedEditContact(){
	console.log("ApprovedEditContact");
}

function editPS (idProvider, idProductService) {
	var provider = Provider.getById(idProvider, 'idProvider', false, 'Proveedor a editar producto o servicio');
	var productService = findElement(provider.productServices, 'idProductService', idProductService);
	console.log(productService);

	var data = '<form action="javascript:ApprovedEditPS()"><div id="messageEditPS"></div>';
	data += '<div class="modal-body" >';
	data += '<div class="panel panel-info">';
  	data += '<div class="panel-heading">Productos y servicios del proveedor '+provider.name+'</div>';
  	data += '<div class="panel-body">';
	data += generateInput('id','input','hidden','idEditPS',true);
	data += generateInput('Nombre del Producto o servicio','input','text','nameEditPS',true);
	data += generateInput('Descripcion','input','textarea','descEditPS',false);
	data += generateInput('Precio','input','number','priceEditPS',true);
     data += '</div></div></div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
    data += '</div>';
	data += '</form>';
    $('#bodyModalEditElementProvider').html(data);
    $('#labelModalEditElementProvider').html("Editar Producto o servicio");

    $('#idEditPS').val(productService.idProductService);
 	$('#nameEditPS').val(productService.name);
 	$('#descEditPS').val(productService.description);
 	$('#priceEditPS').val(productService.price); 

	$('#modalEditElementProvider').modal('show');
}

function ApprovedEditPS(){
	console.log("ApprovedEditPS");
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}