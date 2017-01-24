$(document).ready(function(){
	loadClients();
	$(".filter").keyup(function(){listClients()});
});

var clients = {};
function loadClients() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var clientsObj = newDinamicOWS(false);
	var data = clientsObj.get(listClientService ,dataAndAccount, 'name','clientes');
	if(data.success == 'false'){
		clientsObj.showMessage('msList', 'nameEmployed', 'No se pudo cargar los clientes<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		clients = clientsObj.dataArray;
		//console.log(JSON.stringify(clients));
		listClients();	
	}
}

function listClients() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Digito de Verificacion</th><th>Direcciones</th><th>Contactos</th><th>Editar</th><th>Borrar</th></tr>';
	
	var data = "";
	for (var i = 0; i < clients.length; i++) {
		var client = (clients[i].NIT+clients[i].name+clients[i].description+clients[i].DV).toUpperCase();
		if(find == "" || client.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+clients[i].NIT+'</td>';
			data+='<td>'+clients[i].name+'</td>';
			data+='<td>'+clients[i].description+'</td>';
			data+='<td>'+clients[i].DV+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalAddress" onclick="seeAddress('+clients[i].idClient+')">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalContacts" onclick="seeContacts('+clients[i].idClient+')">Contactos</button></td>';
		  	data+='<td><button class="btn btn-default" type="button" onclick="editClient('+clients[i].idClient+')"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
		  	data+='<td><button class="btn btn-default" type="button" onclick="deleteClient('+clients[i].idClient+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron clientes");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function seeAddress(idClient) {
	//console.log("SEE ADDRESS: "+idClient);
	var client = getClient(idClient);
	//console.log(JSON.stringify(client));
	var address = client.direcciones;
	var number = 1;	
	var data = '<div id="msSeeAddress"></div><div class="scroll panel panel-info"><div class="panel-heading"> Direcciones de '+client.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran las direcciones del cliente seleccionado, de click sobre la direccion para ver mas informacion.</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	//data += 'info: '+JSON.stringify(address)+"<br>";
	    data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	    data+='<br><div class="btn-group" role="group" aria-label="...">';
	   	data+='<button class="btn btn-default" type="button" onclick="editAddress('+client.idClient+','+address[i].idAddress+')">Editar</button>';
	    data+='<button class="btn btn-default" type="button"  onclick="deleteAddress('+client.idClient+','+address[i].idAddress+')">Borrar</button>';
	   	data+='</div>';
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';
	$('#bodyModalSeeAddress').html(data);
	$('#addAddress').unbind();
	$('#addAddress').click(function(){addAddress(idClient)});
}

function seeContacts(idClient) {
	//console.log("SEE CONTACTS: "+idClient);
	var client = getClient(idClient);
	//console.log(JSON.stringify(client));
	var contacts = client.contactos;
	var number = 2;
	var data = '<div id="msSeeContacts"></div><div class="scroll panel panel-info"><div class="panel-heading"> Contactos de '+client.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran los contactos del cliente seleccionado, de click sobre el contacto para ver mas informacion.</p>';
	data += '<div id="accordion'+number+'" class="panel-group" role="tablist" aria-multiselectable="true">';
	for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    //data += 'info: '+JSON.stringify(contacts)+"<br>";
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";

	    data+='<br><div class="btn-group" role="group" aria-label="...">';
	    data+='<td><button class="btn btn-default" type="button" onclick="editContact('+client.idClient+','+contacts[i].idContact+')">Editar</button></td>';
	    data+='<td><button class="btn btn-default" type="button" onclick="deleteContact('+client.idClient+','+contacts[i].idContact+')">Borrar</button></td>';
	   	data+='</div>';

	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeContacts').html(data);
	$('#addContact').unbind();
	$('#addContact').click(function(){addContact(idClient)});
}

function getClient(idClient) {
	for (var i = 0; i <clients.length; i++) {
		if(idClient == clients[i].idClient){
			return clients[i];
		}
	};
}

function deleteAddress (idClient, idAddress) {
	//console.log("deleteAddress: "+idProvider+", "+idAddress);
	var clientObj = newDinamicOWS(false);

	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = clientObj.get(listClientService ,dataAndAccount, 'name', 'clientes');
	if(data.success == 'false') {
		clientObj.showMessage('msSeeAddress', 'msSeeAddress', data.status, 'danger', 'modal', true);
		return;
	}
	var client = findElement(clientObj.dataArray, 'idClient', idClient);
	var address = findElement(client.direcciones, 'idAddress', idAddress);

	$('#titleModalDeleteElement').html('Eliminar direccion');
	var data = '<div id="msDeleteElement"></div>'; 
	data += '<p>Esta a punto de borrar la direccion con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading"> Direccion de '+client.name+'</div><div class="panel-body">';
    data += '<Strong>Pais : </strong>'+address.pais+"<br>";
    data += '<Strong>Ciudad : </strong>'+address.ciudad+"<br>";
    data += '<Strong>Direccion : </strong>'+address.direccion+"<br>";  
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElement').html(data);

	var buttons = '<button type="button" class="btn btn-primary" onclick="ApprovedDeleteAddress('+client.idClient+','+idAddress+')">Continuar, Borrar la direccion</button>';
  	buttons += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#buttonsModalDeleteElement').html(buttons);
  	$( "#modalDeleteElement" ).unbind();
  	$('#modalDeleteElement').on('hidden.bs.modal', function(){goToSeeAddress()});
	goTo('modalDeleteElement', 'modalAddress');
}

function goToSeeAddress(){
	goTo('modalAddress', 'modalDeleteElement');	
}

function ApprovedDeleteAddress (idClient ,idAddress) {
	//console.log("deleteAddress: "+idAddress);
	var add = newDinamicOWS(false);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idAddress":idAddress};
	var data = add.remove(deleteAddressService ,dataAndAccount, '');
	if(data.success == 'false') add.showMessage('msDeleteElement', 'msDeleteElement', "No se pudo eliminar La direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		$('#modalDeleteElement').modal('hide');
		$('#bodyModalDeleteElement').html("");
		loadClients();
		seeAddress(idClient);
		$('#modalAddress').modal('show');
		add.showMessage('msSeeAddress', 'msSeeAddress', "Se elimino con exito la direccion!", 'success', 'modal', true);
	}
}

function deleteContact (idClient, idContact) {
	//console.log("deleteAddress: "+idProvider+", "+idContact);
	var clientObj = newDinamicOWS(false);

	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = clientObj.get(listClientService ,dataAndAccount, 'name', 'clientes');
	if(data.success == 'false') {
		clientObj.showMessage('msSeeAddress', 'msSeeAddress', data.status, 'danger', 'modal', true);
		return;
	}
	var client = findElement(clientObj.dataArray, 'idClient', idClient);
	var contact = findElement(client.contactos, 'idContact', idContact);
	
	$('#titleModalDeleteElement').html('Eliminar Contacto');
	var data = '<div id="msDeleteElement"></div>'; 
	data += '<p>Esta a punto de borrar el contacto con los siguientes datos: </p>';

	data += '<div class="panel panel-info"><div class="panel-heading"> Contacto de '+client.name+'</div><div class="panel-body">';
    data += '<Strong>Nombre: </strong>'+contact.name+"<br>";
    data += '<Strong>Correo electronico: </strong>'+contact.email+"<br>";
    data += '<Strong>Telefono: </strong>'+contact.phoneNumber+"<br>";
    
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElement').html(data);

	var buttons = '<button type="button" class="btn btn-primary" onclick="ApprovedDeleteContact('+idClient+','+idContact+')">Continuar, Borrar el contacto</button>';
  	buttons += '<button id="closeModalDelete" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	$('#buttonsModalDeleteElement').html(buttons);
  	$( "#modalDeleteElement" ).unbind();
  	$('#modalDeleteElement').on('hidden.bs.modal', function(){goToSeeContacts()});
  	goTo('modalDeleteElement', 'modalContacts');
}

function goToSeeContacts(){
	goTo('modalContacts', 'modalDeleteElement');	
}

function ApprovedDeleteContact (idClient, idContact) {
	//console.log("deleteAddress: "+idContact);
	var contact = newDinamicOWS(false);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idContact":idContact};
	var data = contact.remove(deleteContactService ,dataAndAccount, '');
	if(data.success == 'false') contact.showMessage('msDeleteElement', 'msDeleteElement', "No se pudo eliminar el contacto<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		$('#modalDeleteElement').modal('hide');
		$('#bodyModalDeleteElement').html("");
		loadClients();
		seeContacts(idClient);
		$('#modalContacts').modal('show');
		contact.showMessage('msSeeContacts', 'msSeeContacts', "Se elimino con exito el contacto!", 'success', 'modal', true);
	}
}

function goTo(returnModal, modalOpen){
	$('#'+modalOpen).modal('hide');
	$('#'+returnModal).modal('show');
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}

function deleteClient (idClient) {
	var client = findElement(clients,'idClient',idClient);
	console.log(JSON.stringify(client));
	$('#titleModalDeleteElement').html("Borrar Cliente");
	var data = '';

	data += '<div id="msDeleteElement"></div>'; 
	data += '<p>Esta a punto de borrar el cliente con los siguientes datos: </p>';
	data += '<div class="panel panel-info"><div class="panel-heading">Cliente</div><div class="panel-body">';
    data += '<Strong>NIT: </strong>'+client.NIT+"<br>";
    data += '<Strong>Nombre: </strong>'+client.name+"<br>";
    data += '<Strong>Descripcion: </strong>'+client.description+"<br>";
    data += '<Strong>Digito de verificacion: </strong>'+client.DV+"<br>";
    
    //direcciones*************************************
    data += '<Strong>Direcciones: </strong><br>';
    var number = 3;
    var address = client.direcciones;
    data += '<div class="panel panel-info"><div class="panel-heading">Direcciones de '+client.name+'</div><div class="panel-body">';
    data += 'Acontinuacion se muestran las direcciones del cliente seleccionado, de click sobre la direccion para ver mas informacion.<br>';
    for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	//data += 'info: '+JSON.stringify(address)+"<br>";
	    data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div><p>';

    //contactos***************************************
    data += '<Strong>Contactos: </strong><br>';
    var number = 4;
    var contacts = client.contactos;
    data += '<div class="panel panel-info"><div class="panel-heading">Contactos de '+client.name+'</div><div class="panel-body">';
    data += 'Acontinuacion se muestran los contactos del cliente seleccionado, de click sobre el contacto para ver mas informacion.<br>';
    for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    //data += 'info: '+JSON.stringify(contacts)+"<br>";
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div><p>';
    //************************************************
    data += '</div></div><p>está accion es irreversible, ¿desea continuar?</p>';
	$('#bodyModalDeleteElement').html(data);
	var buttons = '<button type="button" class="btn btn-primary" onclick="ApprovedDeleteClient('+idClient+')">Continuar, Borrar el cliente</button>';
  	buttons += '<button id="closeModalDelete" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>';
  	
	$('#buttonsModalDeleteElement').html(buttons);
	$( "#modalDeleteElement" ).unbind();
	$('#modalDeleteElement').modal('show');
}


function ApprovedDeleteClient (idClient) {
	var client = newDinamicOWS(false);
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode, "idClient":idClient};
	var data = client.remove(deleteClientService ,dataAndAccount, '');
	if(data.success == 'false') client.showMessage('msDeleteElement', 'msDeleteElement', "No se pudo eliminar el cliente<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else {
		$('#modalDeleteElement').modal('hide');
		$('#bodyModalDeleteElement').html("");
		loadClients();
		client.showMessage('msList', 'nameEmployed', "Se elimino con exito el cliente!", 'success', 'default', true);
	}
}

function editClient(idClient) {
	var client = findElement(clients,'idClient',idClient);
	$('#idClient').val(client.idClient);
	$('#NIT').val(client.NIT);
	$('#name').val(client.name);
	$('#description').val(client.description);
	$('#DV').val(client.DV);

	var data = '';
	//direcciones*************************************
    data += '<Strong>Direcciones: </strong><br>';
    var number = 3;
    var address = client.direcciones;
    data += '<div class="panel panel-info"><div class="panel-heading">Direcciones de '+client.name+'</div><div class="panel-body">';
    data += 'Acontinuacion se muestran las direcciones del cliente seleccionado, de click sobre la direccion para ver mas informacion.<br>';
    for (var i = 0; i <address.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += address[i].direccion;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	   	//data += 'info: '+JSON.stringify(address)+"<br>";
	    data += '<strong>Pais: </strong>'+address[i].pais+"<br>";
	    data += '<strong>Ciudad: </strong>'+address[i].ciudad+"<br>";
	    data += '<strong>Direccion: </strong>'+address[i].direccion+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div><p>';

    //contactos***************************************
    data += '<Strong>Contactos: </strong><br>';
    var number = 4;
    var contacts = client.contactos;
    data += '<div class="panel panel-info"><div class="panel-heading">Contactos de '+client.name+'</div><div class="panel-body">';
    data += 'Acontinuacion se muestran los contactos del cliente seleccionado, de click sobre el contacto para ver mas informacion.<br>';
    for (var i = 0; i <contacts.length; i++) {
		data += '<div class="panel panel-default">';
		data += '<div id="heading'+number+''+i+'" class="panel-heading" role="tab"><center>';
		data += '<h4 href="#collapse'+number+''+i+'" aria-controls="collapse'+number+''+i+'" data-parent="#accordion'+number+'" class="panel-title collapsed" role="button" data-toggle="collapse" aria-expanded="false">';
		data += contacts[i].name;		
		data += '</h4></center></div>';
	    data +=	'<div id="collapse'+number+''+i+'" aria-labelledby="heading'+number+''+i+'" class="panel-collapse collapse" role="tabpanel" ><div class="panel-body">'
	    //data += 'info: '+JSON.stringify(contacts)+"<br>";
	    data += '<strong>Nombre: </strong>'+contacts[i].name+"<br>";
	    data += '<strong>Correo electronico: </strong>'+contacts[i].email+"<br>";
	    data += '<strong>Telefono: </strong>'+contacts[i].phoneNumber+"<br>";
	    data += '</div></div></div>';	
	}
    data += '</div></div><p>';
    //************************************************
  
    $('#infCLient').html(data);
    $('#modalEditClient').modal('show');
}

function ApprovedEditClient () {
	var dataAndAccount = {
		"username":sessionStorage.username, "logincode":sessionStorage.logincode,
		"nit":$('#NIT').val(),
		"name":$('#name').val(),
		"description":$('#description').val(),
		"DV":$( "#DV option:selected" ).val(),
		"idClient":$('#idClient').val()
	};
	var clientsObj = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.nit)==false){
		clientsObj.showMessage('msEditClient', 'msEditClient', 'Ingrese el NIT del cliente', 'warning', 'modal', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		clientsObj.showMessage('msEditClient', 'msEditClient', 'Ingrese el nombre del cliente', 'warning', 'modal', true);
		return;
	}
	
	var data = clientsObj.set(editClientService ,dataAndAccount, '');
	if(data.success == 'false'){
		clientsObj.showMessage('msEditClient', 'msEditClient', 'No se pudo editar el cliente<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
   		$('#modalEditClient').modal('hide');
		clientsObj.showMessage('msList', 'nameEmployed', 'Se edito el cliente con exito!', 'success', 'default', true);
		loadClients();	
	}
}

var countriesForList = newDinamicOWS(false);
var cities = [];
function addAddress(idClient) {
	$('#modalAddress').modal('hide');
	$('#idClientAddAddress').val(idClient);
	loadCountries();
 	generateOptions(countriesForList.dataArray, 'idCountry', 'name', 'countryListAdd', 'Seleccione un pais');
 	getCitiesByIdCountry($('#countryListAdd').val(), 'cityListAdd');
 	$('#countryListAdd').unbind();
 	$('#countryButtonAdd').unbind();
 	$('#cityButtonAdd').unbind();
 	buttonAddress('countryButtonAdd', 'countryListAdd', 'countryAdd');
	buttonAddress('cityButtonAdd', 'cityListAdd', 'cityAdd');
 	$('#countryButtonAdd').click(function(){buttonAddress('countryButtonAdd', 'countryListAdd', 'countryAdd')});
	$('#cityButtonAdd').click(function(){buttonAddress('cityButtonAdd', 'cityListAdd', 'cityAdd')});
 	$('#countryListAdd').change(function(){getCitiesByIdCountry($('#countryListAdd').val(), 'cityListAdd')});
	$('#modalAddAddress').modal('show');
}

function loadCountries(){
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var data = countriesForList.get(countryListService ,dataAndAccount, 'name', 'countries');
	if(data.success == 'false'){ 
		Provider.showMessage('messageAddAddress', 'messageAddAddress', "Error al cargar los paises: "+data.status, 'danger', 'modal', true);
	}
}

function getCitiesByIdCountry(idCountry, listName) {
	//console.log(":::::::::");
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	cities = newDinamicOWS(false);
	var data = cities.get(citysListService ,dataAndAccount, 'name', 'cities');
	if(data.success == 'false'){ 
		Provider.showMessage('messageAddAddress', 'messageAddAddress', "Error al cargar las ciudades: "+data.status, 'danger', 'modal', true);
	}else{
		cities = cities.dataArray;
		var data2 = [];
		for (var i = 0; i <cities.length; i++) {
			if(cities[i].idCountry == idCountry){
				data2.push({
					idCity: cities[i].idCity,
					name: cities[i].name
				});
			}
		}
		generateOptions(data2, 'idCity', 'name', listName, "Seleccione una ciudad");		
	}
}

function approvedAddAddress() {
	var dataAndAccount = {
		"username":sessionStorage.username, 
		"logincode":sessionStorage.logincode, 
		"address":$('#addressAdd').val(),
		"idCity":$('#cityListAdd').val(),
		"idClient":$('#idClientAddAddress').val()
	};

	var idCountry = $("#countryListAdd").val();
	var country = $('#countryAdd').val();
	var city = $('#cityAdd').val();

	var address = newDinamicOWS(false);
	if(country == "" && idCountry == 0){
		address.showMessage('messageAddAddress', 'modalAddAddress', "Seleccione o ingrese un pais", 'warning', 'modal', true);
		return;
	}else{
		if(country != "" && idCountry == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "cname":country};
			var countryObj = newDinamicOWS(false);
			idCountry = countryObj.add(createCountryService ,account, '').data.idCountry;
		}else if(country != "" && idCountry != 0){
			address.showMessage('messageAddAddress', 'modalAddAddress', "Error seleccionando pais", 'warning', 'modal', true);
			return;
		}
	}
	if(city == "" && dataAndAccount.idCity == 0){
		address.showMessage('messageAddAddress', 'modalAddAddress', "Seleccione o Ingrese una ciudad", 'warning', 'modal', true);
		return;
	}else{
		if(city!="" && dataAndAccount.idCity == 0){
			var account = {"username":sessionStorage.username,"logincode":sessionStorage.logincode, "name":city, "idCountry":idCountry};
			var cityObj = newDinamicOWS(false);
			dataAndAccount.idCity = cityObj.add(createCityService ,account, '').data.idCity;
		}else if(city != "" && dataAndAccount.idCity != 0){
			address.showMessage('messageAddAddress', 'modalAddAddress', "Error seleccionando ciudad", 'warning', 'modal', true);
			return;
		}
	}

	if(notBlakSpaceValidation(dataAndAccount.address)==false){
		address.showMessage('messageAddAddress', 'modalAddAddress', "Ingrese una direccion", 'warning', 'modal', true);
		return;
	}

	//console.log(JSON.stringify(dataAndAccount));
	var data = address.add(createAddressService ,dataAndAccount, '');
	if(data.success == 'false') address.showMessage('messageAddAddress', 'modalAddAddress', "No se pudo Agregar la direccion<br><strong>Motivo: </strong>"+data.status, 'warning', 'modal', true);
	else{
		$('#modalAddAddress').modal('hide');
		loadClients();
		seeAddress(dataAndAccount.idClient);
		$('#modalAddress').modal('show');
		address.showMessage('msSeeAddress', 'msSeeAddress', "Se Agrego con exito la direccion!", 'success', 'modal', true);
	}
}

function buttonAddress(idButton, idlist, idInput) {
	//console.log("button");
	var value = $('#'+idButton).prop('checked');
	if(value){
		$('#'+idlist).val(0);
		$('#'+idlist).prop('disabled', true);
		$('#'+idInput).prop('disabled', false);
	}else{
		$('#'+idlist).prop('disabled', false);
		$('#'+idInput).prop('disabled', true);
		$('#'+idInput).val("");
	}
}

function generateOptions(list, nameAttrib1, nameAttrib2, listName, messageInitial) {
	var data = '<option value="0">-- '+messageInitial+' --</option>';
	//console.log("..."+JSON.stringify(list));
	if(list != null){
		for (var i = 0; i < list.length; i++) {
			var d = list[i];
			data += '<option value="'+d[nameAttrib1]+'">'+d[nameAttrib2]+'</option>';
		}		
	}
	$('#'+listName).html(data);					   	
}

function addContact(idClient) {
	console.log("c: "+idClient);
}

