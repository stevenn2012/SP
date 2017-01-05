var Provider = [];
var modalPattern = '';
$(document).ready(function(){
	initProviders();
	$(".filter").keyup(function(){listProviders()});
	$('.modalElement').on('hidden.bs.modal', function(){cancelEditElement()})
});

//see
function initProviders() {
	Provider = newDinamicOWS(false);
	loadProviders();
}

function loadProviders() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = Provider.get(providersList ,dataAndAccount, 'name', 'providers');
	if(data.success == 'false') Provider.showMessage('msModifyDelete', 'nameEmployed', data.status, 'danger', 'default', true);
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
	if(data == ""){ $('#msfind').html("No se encontraron Proveedores");
	}else{ $('#msfind').html(""); }
	content += data+'</table>';
	$('#lista').html(content);
}

function modalSee (number, titleModal, titlePanel, info, message, idModal) {
	if(idModal == 'bodyModalSee') modalPattern = 'modalSee'; else modalPattern = 'modalEditProvider';
	$('#myModalSeeLabel').html(titleModal);
	var data = '<div class="scroll panel panel-info"><div class="panel-heading">'+titlePanel+'</div><div class="panel-body">';
	data += '<div id="msSee"></div>';
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
	   	if(edit) {
	   		data+='<br><div class="btn-group" role="group" aria-label="...">';
	   		data+='<button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditAddress" onclick="editAddress('+provider.idProvider+','+address[i].idAddress+')">Editar</button>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deleteAddress('+provider.idProvider+','+address[i].idAddress+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';	
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary">Agregar Direccion</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron direcciones para este proveedor';
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
	    if(edit) {
	    	data+='<br><div class="btn-group" role="group" aria-label="...">';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditContact" onclick="editContact('+provider.idProvider+','+contacts[i].idContact+')">Editar</button></td>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deleteContact('+provider.idProvider+','+contacts[i].idContact+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary">Agregar Contacto</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron Contactos para este proveedor';
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
	    if(edit){ 
	    	data+='<br><div class="btn-group" role="group" aria-label="...">';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#" onclick="editPS('+provider.idProvider+','+productServices[i].idProductService+')">Editar</button></td>';
	    	data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalDeleteElementProvider" onclick="deletePS('+provider.idProvider+','+productServices[i].idProductService+')">Borrar</button></td>';
	   		data+='</div>';
	    }
	    data += '</div></div></div>';
	}
	if(edit) {
		var buttons = '<button type="button" class="btn btn-primary">Agregar Producto o servicio</button>';
		buttons += '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
		$('#buttonAdd').html(buttons);
	}
	if(data == '') message = 'No se encontraron Productos o servicios para este proveedor';
   	modalSee(number, 'Productos y servicios',  'Productos y servicios de '+provider.name, data, message, idModal);
}

//edit
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
  	data += '<div class="panel-heading">Observacion de más informacion relacionada con el proveedor</div>';
  	data += '<div class="panel-body"><div class="alert alert-warning" role="alert">';
    data += '<p><strong>Nota: </strong>Esta seccion es solo para observacion. Para editar o eliminar las direcciones, contactos, productos o sercivios de este proveedor, seleccione la opcion en la tabla que permite ver estos datos, posterior a esto oprima click sobre el elemento a que desea cambiar o eliminar y seleccione la opcion que desea realizar.';
    data += '<br>(La edicion de estos datos <strong>NO</strong> se puede realizar desde esta ventana)</p>';
	data += '</div><label for="exampleInputEmail1">Direcciones: </label>';
    data += '<div id="editAddressDelete"></div>';
    data += '<label for="exampleInputEmail1">Contactos: </label>';
    data += '<div id="editContactsDelete"></div>';
    data += '<label for="exampleInputEmail1">Productos y/o servicios: </label>';
    data += '<div id="editProductsServicesDelete"></div>';
    data += '</div></div>';
    data += '</div>';
    
    data += '<div class="modal-footer">';
    data += '<button id="continueEdit" type="submit" class="btn btn-primary">Guardar Cambios</button>';
  	data += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
    
    data += '</form>';
    $('#bodyModalEditProvider').html(data);

    $('#idEditProvider').val(provider.idProvider);
 	$('#nitEditProvider').val(provider.NIT);
 	$('#nameEditProvider').val(provider.name);
 	$('#descriptionEditProvider').val(provider.description); 
 	
 	seeAddress(2, idProvider, false,'editAddressDelete');
  	seeContacts(3, idProvider, false,'editContactsDelete');
  	seeProductServices(4, idProvider, false, 'editProductsServicesDelete');
}

//************terminar**********************
function editAddress (idProvider, idAddress) {
	$('#'+modalPattern).modal('hide');
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

function editContact (idProvider, idContact) {
	$('#'+modalPattern).modal('hide');
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

function editPS (idProvider, idProductService) {
	$('#'+modalPattern).modal('hide');
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

function generateInput (title, typeTag, type, idInput, required) {
	var data = '<div class="form-group">';
	if(type.toLowerCase() != 'hidden') data +='<label for="exampleInputEmail1">'+title+'</label>';
	data += '<'+typeTag+' id="'+idInput+'" type="'+type+'" name="comment" class="form-control" form="form" placeholder="'+title+'"'; 
	if(required) data += 'required';
	if(type.toLowerCase() == 'textarea') data += 'style="max-width:100%;"></textarea';	
	data += '></div>';
	return data;
}

function cancelEditElement() {
	$('#modalEditElementProvider').modal('hide');
	$('#'+modalPattern).modal('show');
	$('#'+modalPattern).modal('handleUpdate')
}

//aparoved delete
function ApprovedDeleteProvider(idProvider) {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, 'idProvider':idProvider};
	var data = Provider.remove(deleteProviderService ,dataAndAccount, '');
	if(data.success == 'false') Provider.showMessage('msModifyDelete', 'nameEmployed', "No se pudo eliminar el proveedor<br><strong>Motivo: </strong>"+data.status, 'warning', 'default', true);
	else {
		Provider.showMessage('msModifyDelete', 'nameEmployed', 'Se elimino el proveedor con exito!', 'success', 'default', true);
		$('#closeDeleteProvider').click();
		loadProviders();
	}
}

function ApprovedDeleteAddress (idProvider, idAddress) {
	console.log("deleteAddress: "+idAddress);
	var add = newDinamicOWS(true);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idAddress":idAddress};
	var data = add.remove(deleteAddressService ,dataAndAccount, '');
	if(data.success == 'false') add.showMessage('msSee', 'msSee', "No se pudo eliminar La direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		loadProviders();
		seeAddress(1, idProvider, true);
		add.showMessage('msSee', 'msSee', "Se elimino con exito la direccion!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedDeleteContact (idProvider, idContact) {
	console.log("deleteAddress: "+idContact);
	var contact = newDinamicOWS(true);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idContact":idContact};
	var data = contact.remove(deleteContactService ,dataAndAccount, '');
	if(data.success == 'false') contact.showMessage('msSee', 'msSee', "No se pudo eliminar el contacto <br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		loadProviders();
		seeContacts(1, idProvider, true);
		contact.showMessage('msSee', 'msSee', "Se elimino con exito el contacto!", 'success', 'modal', true);
		cancelEditElement();
	}
}

function ApprovedDeletePS (idProvider, idProductService) {
	console.log("deleteAddress: "+idProductService);
	var proSer = newDinamicOWS(true);	
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idProductService":idProductService};
	var data = proSer.remove(deleteProductServiceService ,dataAndAccount, '');
	if(data.success == 'false') proSer.showMessage('msSee', 'msSee', "No se pudo eliminar el Producto o servicio<br><strong>Motivo: </strong>"+data.status, 'warning', 'default', true);
	else{
		loadProviders();
		seeProductServices(1, idProvider, true);
		proSer.showMessage('msSee', 'msSee', "Se elimino con exito el producto o servicio!", 'success', 'modal', true);
		cancelEditElement();
	} 
}

//approved edit
function ApprovedEditProvider(){
	console.log("ApprovedEditProvider");
	loadProviders();
}

function ApprovedEditAddress(){
	console.log("ApprovedEditAddress");
	cancelEditElement();
}

function ApprovedEditContact(){
	console.log("ApprovedEditContact");
	cancelEditElement();
}

function ApprovedEditPS(){
	console.log("ApprovedEditPS");
	cancelEditElement();
}

//delete
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

function deleteAddress (idProvider, idAddress) {
	console.log("deleteAddress: "+idProvider+", "+idAddress);
	var provider =  Provider.getById(idProvider, 'idProvider', false, 'Proveedor a borrar Direccion');
	var address = findElement(provider, 'idAddress', idAddress);

	var data = '<p> Esta a punto de borrar la direccion con los siguientes datos: </p>';
	
	data += '<div class="panel panel-info"><div class="panel-heading">'+provider.name+'</div><div class="panel-body">';
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
	$('#bodyModalDeleteElementProvider').html(data);

	//ApprovedDeleteAddress(idProvider, idAddress);
	$('#'+modalPattern).modal('hide');
}

function deleteContact (idProvider, idContact) {
	console.log("deleteAddress: "+idProvider+", "+idContact);
	//ApprovedDeleteContact(idProvider, idContact);
	$('#'+modalPattern).modal('hide');
}

function deletePS (idProvider, idProductService) {
	console.log("deleteAddress: "+idProvider+", "+idProductService);
	//ApprovedDeletePS(idProvider, idProductService);
	$('#'+modalPattern).modal('hide');
}

//add element
function addAddress(idProvider) {
	
}

function addContact(idProvider) {
	
}

function addProductService(idProvider) {
	
}

//approved add element
function ApprovedAddAddress(idProvider) {
	
}

function ApprovedAddContact(idProvider) {
	
}

function ApprovedAddProductService(idProvider) {
	
}

//others
function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}