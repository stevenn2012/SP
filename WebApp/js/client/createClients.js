var contacts = [];

var address = [];
var countrys = [];
var citys = [];

var pointerAddress = 0;
var pointerContacts = 0;

$(document).ready(function(){
	listAddress();
	listContacts();
	getCountrys();
	getCitys(0);
	countryButton();
	cityButton();
	$('#cityButton').click(function(){cityButton()});
	$('#countryButton').click(function(){countryButton()});
	$('.closeModal').click(function(){closeModal()});
	$('#cancel').click(function(){cancel()});
	$('#countryList').change(function(){listCitys($('#countryList').val())});
	$('.modal').on('hidden.bs.modal', function(){closeModal()})
	$('#NIT').focus();

	$('#modalAddAddress').on('shown.bs.modal', function () {
    	$('#countryList').focus();
	});

	$('#modalAddContact').on('shown.bs.modal', function () {
    	$('#nameContact').focus();
	});
});

function cancel() {
	closeModal();
	window.location.assign('../../');
}

function listAddress() {
	//console.log("LIST ADDRESS "+address.length+", "+JSON.stringify(address));
	var data = '';
	if(address.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Direccion</th>';
		data += '<th>Ciudad</th>';
		data += '<th>Pais</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < address.length; i++) {
			data += '<tr>';
			data += '<td>'+address[i].address+'</td>';
			data += '<td>'+address[i].city+'</td>';
			data += '<td>'+address[i].country+'</td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeAddress('+address[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#addressTable').html(data);
}

function listContacts() {
	//console.log("LIST CONTACTS "+contacts.length+", "+JSON.stringify(contacts));
	var data = '';
	if(contacts.length > 0){
		data += '<table class="table table-bordered"><tr>';
		data += '<th>Nombre</th>';
		data += '<th>Correo</th>';
		data += '<th>Telefono</th>';
		data += '<th>Borrar</th></tr>';								
		for (var i = 0; i < contacts.length; i++) {
			data += '<tr>';
			data += '<td>'+contacts[i].name+'</td>';
			data += '<td>'+contacts[i].email+'</td>';
			data += '<td>'+contacts[i].phoneNumber+'</td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeContact('+contacts[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#contactsTable').html(data);
}

function cityButton(){
	var value = $('#cityButton').prop('checked');
	if(value){
		$('#cityList').val(0);
		$('#cityList').prop('disabled', true);
		$('#cityAddress').prop('disabled', false);
	}else{
		$('#cityList').prop('disabled', false);
		$('#cityAddress').prop('disabled', true);
		$('#cityAddress').val("");
	}
}

function countryButton(){
	var value = $('#countryButton').prop('checked');
	if(value){
		$('#countryList').val(0);
		listCitys(0);
		$('#countryList').prop('disabled', true);
		$('#countryAddress').prop('disabled', false);
	}else{
		$('#countryList').prop('disabled', false);
		$('#countryAddress').prop('disabled', true);
		$('#countryAddress').val("");
	}
}

//add
function addAddress() {
	//console.log("ADD ADDRESS ::::::::::::::::::::::::");
	var newAddres = {
		"id":pointerAddress++,
		"idCity":$("#cityList option:selected").val(),
		"idCountry":$("#countryList option:selected").val(),
		"country":$('#countryAddress').val(),
		"city":$('#cityAddress').val(),
		"address":$('#addressProvider').val()
	};

	if(newAddres.idCountry!=0 || newAddres.country!=""){
		if($('#countryButton').prop('checked') == true && newAddres.idCountry==0){
			if(notBlakSpaceValidation(newAddres.country)==false){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione un pais</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
			newAddres.idCountry = createCountry(newAddres.country);
		}else{
			if($('#countryButton').prop('checked') != false && newAddres.idCountry != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Pais</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
		}
		if(newAddres.country == ""){
			newAddres.country = $('#countryList option:selected').html();	
		}
			
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione un pais</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;
	}

	if(newAddres.idCity!=0 || newAddres.city!=""){
		if($('#cityButton').prop('checked') == true && newAddres.idCity==0){
			if(notBlakSpaceValidation(newAddres.city)==false){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione una ciudad</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
			newAddres.idCity = createCity(newAddres.idCountry, newAddres.city);
		}else{
			if($('#cityButton').prop('checked') != false && newAddres.idCity != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Ciudad</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
				return;
			}
		}
		if(newAddres.city == ""){
			newAddres.city = $('#cityList option:selected').html();
		}	
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione una ciudad</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;
	}

	//console.log("NewAddress: "+JSON.stringify(newAddres));
	if(newAddres.idCity <= 0 || newAddres.idCountry <=0){
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando pais o ciudad en el servidor</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;	
	}

	if(notBlakSpaceValidation(newAddres.address)==false){
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Ingrese una direccion</div>');
		ScreenUp("modalAddAddress", "msAddAddress");
		return;
	}

	//console.log(JSON.stringify(newAddres));
	address.push({
		"id":newAddres.id,
		"idCity":newAddres.idCity,
		"idCountry":newAddres.idCountry,
		"country":newAddres.country,
		"city":newAddres.city,
		"address":newAddres.address,
		"inDB":false
	});
	listAddress();
	$('#closeAddAddress').click();
}

function getCountrys() {
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};
	$.ajax({
		url: countryListService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService get Countrys: "+JSON.stringify(data));
			if(data.validate == "true"){
				countrys = data.countries;
				listCountrys();
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar paises</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msCreateProvider').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
}

function getCitys(idCountry) {
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode
	};
	$.ajax({
		url: citysListService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService get Citys: "+JSON.stringify(data));
			if(data.validate == "true"){
				citys = data.cities;
				listCitys(idCountry);
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar ciudades</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddres", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
}

function listCountrys() {
	var data = '<option value="0">-- Seleccione el pais --</option>';
	for (var i = 0; i < countrys.length; i++) {
		data += '<option value="'+countrys[i].idCountry+'">'+countrys[i].name+'</option>';
	};
	$('#countryList').html(data);
}

function listCitys(idCountry) {
	var data = '';
	for (var i = 0; i < citys.length; i++) {
		if(citys[i].idCountry == idCountry){
			data += '<option value="'+citys[i].idCity+'">'+citys[i].name+'</option>';
		}
	};
	if(data == ''){
		$('#cityButton').prop('checked', true);
	}else{
		$('#cityButton').prop('checked', false);
	}
	cityButton();
	data = '<option value="0">-- Seleccione la ciudad --</option>'+data;
	$('#cityList').html(data);
}

function createCountry(countryName){
	var idReturn = -1;
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode,
		"cname":countryName,
		"countryCode":""
	};
	$.ajax({
		url: createCountryService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService Crear Country: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCountrys();
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear el pais'+data.status+'</div>');
					ScreenUp("modalAddAddress", "msAddAddress");
				}
				idReturn = data.idCountry;
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear paises</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	//console.log("Create country return: "+idReturn);
	return idReturn;
}

function createCity(idCountry, cityName){
	var idReturn = -1;
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode,
		"name":cityName,
		"idCountry":idCountry
	};
	$.ajax({
		url: createCityService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			//console.log("WebService Crear City: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCitys(idCountry);
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear la ciudad'+data.status+'</div>');
					ScreenUp("modalAddAddress", "msAddAddress");
				}
				idReturn = data.idCity;
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear ciudades</div>');
				ScreenUp("modalAddAddress", "msAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress", "msAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	//console.log("Create city return: "+idReturn);
	return idReturn;
}

function ScreenUp (id, idMs) {
	//console.log("SCREEN UP "+id);
	if(id != "msCreateClient"){
		$('#'+id).scrollTop(0);
	}else{
		$('htmls,body').animate({
		    scrollTop: $("#nameEmployed").offset().top
		}, 500);
	}
	setTimeout(function() {
		$('#'+idMs).html("");
	},10000);
}

function addContact() {
	//console.log("ADD CONTACT");
	var newContact = {
		"id":pointerContacts++,
		"name":$("#nameContact").val(),
		"email":$("#emailContact").val(),
		"phoneNumber":$('#phoneNumberContact').val()
	};

	if(notBlakSpaceValidation(newContact.name)==false){
		$('#msContact').html('<div class="alert alert-warning" role="alert">Debe ingresar un nombre para el contacto</div>');
		ScreenUp("modalAddContact", "msContact");
		return;
	}

	if(notBlakSpaceValidation(newContact.phoneNumber)==false){
		$('#msContact').html('<div class="alert alert-warning" role="alert">Debe ingresar un telefono para el contacto</div>');
		ScreenUp("modalAddContact", "msContact");
		return;
	}

	var valEmail = true;
	if(newContact.email.indexOf('@', 0) == -1) {
		valEmail = false;
    }else {
    	if(newContact.email.substring(newContact.email.indexOf('@', 0)).indexOf('.', 0) == -1){
    		valEmail = false;
    	}
    }
    if(valEmail == false){
    	$('#msContact').html('<div class="alert alert-warning" role="alert">El correo electrónico introducido no es correcto.</div>');
		ScreenUp("modalAddContact", "msContact");
        return false;
    }

	//console.log(JSON.stringify(newContact));
	contacts.push({
		"id":newContact.id,
		"name":newContact.name,
		"email":newContact.email,
		"phoneNumber":newContact.phoneNumber,
		"inDB":false
	});
	listContacts();
	$('#closeAddContact').click();
}

//Remove
function removeAddress (idAddress) {
	//console.log("REMOVE ADDRESS: "+idAddress);
	for (var i = 0; i < address.length; i++) {
		if(idAddress == address[i].id){
			address.splice(i,1);
			break;
		}	
	}
	listAddress();
}

function removeContact (idContact) {
	//console.log("REMOVE CONTACT: "+idContact);
	for (var i = 0; i < contacts.length; i++) {
		if(idContact == contacts[i].id){
			contacts.splice(i,1);
			break;
		}	
	}
	listContacts();
}

function closeModal() {
	//console.log("CLOSE MODAL");
	$('#bodyModalSeeContact').html("");
	$('#bodyModalSeeAddress').html("");
	$("#cityList").val(0);
	$("#countryList").val(0);
	$('#countryAddress').val("");
	$('#cityAddress').val("");
	$('#addressProvider').val("");
	if($('#countryButton').prop('checked')){$('#countryButton').click();}
	if($('#cityButton').prop('checked')){$('#cityButton').click();}
	listCitys(0);

	$('#nameContact').val("");
	$('#emailContact').val("");
	$('#phoneNumberContact').val("");

	$('#nameProductService').val("");
	$('#descriptionProductService').val("");
	$('#priceProductService').val("");

	$('#msAddAddress').html("");
	$('#msContact').html("");
	$('#msAddProductService').html("");
}

//**********Guardar***********
function createClient(){
	var client = {
		"nit":$('#NIT').val(),
		"name":$('#name').val(),
		"description":$('#description').val(),
		"DV":$( "#DV option:selected" ).val(),
		"contacts":contacts,
		"address":address
	};
	//console.log("CREATE PROVIDER: ",JSON.stringify(client));
	if(notBlakSpaceValidation(client.nit)==false){
		$('#msCreateClient').html('<div class="alert alert-warning" role="alert">Debe ingresar un NIT para el cliente</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		return;
	}

	if(notBlakSpaceValidation(client.name)==false){
		$('#msCreateClient').html('<div class="alert alert-warning" role="alert">Debe ingresar un nombre para el cliente</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		return;
	}

	if(client.address.length == 0){
		$('#msCreateClient').html('<div class="alert alert-warning" role="alert">Debe ingresar al menos una direccion</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		return;
	}
	if(client.contacts.length == 0){
		$('#msCreateClient').html('<div class="alert alert-warning" role="alert">Debe ingresar al menos un contacto</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		return;
	}

	var dataClient = saveClientInServer(client.nit, client.name, client.description, client.DV);
	var idClient = dataClient.idClient;
	
	if(isNaN(parseInt(idClient)) || idClient <= 0){
		$('#msCreateClient').html('<div class="alert alert-warning" role="alert">Error al crear el proveedor '+dataClient.status+'</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		return;
	}

	var validation = true;
	for (var i = 0; i < client.address.length; i++) {
		if(client.address[i].inDB != true){
			client.address[i].inDB = saveAddressInServer(client.address[i].address, idClient, client.address[i].idCity);	
		}
		if(client.address[i].inDB != true){
			validation = false;
		}
	};

	for (var i = 0; i < client.contacts.length; i++) {
		if(client.contacts[i].inDB != true){
			client.contacts[i].inDB = saveContactInServer(client.contacts[i].name, client.contacts[i].email, client.contacts[i].phoneNumber, idClient);	
		}
		if(client.contacts[i].inDB != true){
			validation = false;
		}
	};

	if(validation){
		$('#msCreateClient').html('<div class="alert alert-success" role="alert">Se creo el cliente con exito!</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		closeModal();
		contacts = [];
		address = [];
		listAddress();
		listContacts();
		$('#NIT').val("");
		$('#name').val("");
		$('#description').val("");
		$( "#DV" ).val(0);
	}else{
		$('#msCreateClient').html('<div class="alert alert-danger" role="alert">Error al insertar datos del cliente</div>');
		ScreenUp("msCreateClient", "msCreateClient");
		contacts = client.contacts;
		address = client.address;
		listAddress();
		listContacts();
		listProductsServices();
		return;
	}
}

function saveClientInServer(nit, name, description, DV){
	//console.log("SAVE PROVIDER IN SERVER");
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"nit":nit,
			"name":name,
			"description":description,
			"DV":DV
		};
		var data = insertInServer(createclientService, dataAndAccount, "Create client");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return data;
			}else{
				$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No se pudo crear el cliente '+data.status+'</div>');		
				ScreenUp("msCreateClient","msCreateClient");
				return data;
			}
		}else{
			$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear clientes</div>');
			ScreenUp("msCreateClient","msCreateClient");
			return data;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function saveAddressInServer(address, idClient, idCity){
	//console.log("SAVE ADDRESS IN SERVER");
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"address":address,
			"idClient":idClient,
			"idCity":idCity
		};
		var data = insertInServer(createAddressService, dataAndAccount, "Create address");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return true;
			}else{
				$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No se pudo crear la direccion '+data.status+'</div>');		
				ScreenUp("msCreateClient","msCreateClient");
				return false;
			}
		}else{
			$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear Direcciones</div>');
			ScreenUp("msCreateClient","msCreateClient");
			return false;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function saveContactInServer(name, email, phoneNumber, idClient){
	//console.log("SAVE CONTACT IN SERVER: "+name);
	if(sessionStorage.username && sessionStorage.logincode){
		var dataAndAccount = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode,
			"name":name,
			"email":email,
			"phoneNumber":phoneNumber,
			"idClient":idClient
		};
		var data = insertInServer(createContactService, dataAndAccount, "Create Contact");
		if(data.validate == "true"){
			if(data.insert=="true"){
				return true;
			}else{
				$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No se pudo crear el contacto '+data.status+'</div>');		
				ScreenUp("msCreateClient","msCreateClient");
				return false;
			}
		}else{
			$('#msCreateClient').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear contactos</div>');
			ScreenUp("msCreateClient","msCreateClient");
			return false;
		}
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}
}

function insertInServer(link, dataAndAccount, type) {
	//console.log("INSERT IN SERVER");
	validateAccount();
	var returnData = false;
	$.ajax({
		url: link,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			console.log("WebService "+type+": "+JSON.stringify(data));
			returnData = data;
		},
		error: function(objXMLHttpRequest) {
		   	$('#msCreateClient').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
		    ScreenUp("msCreateClient", "msCreateClient");
		    console.log("error",objXMLHttpRequest);
		}
	});
	return returnData;
}

