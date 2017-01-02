var contacts = [];
var address = [];
var productsServices = [];
var countrys = [];
var citys = [];
var pointerAddress = 0;
var pointerContacts = 0;
var pointerProductsServices = 0;

$(document).ready(function(){
	//**Pruebas****
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
	getCountrys();
	cityButton();
	countryButton();
	$('#cityButton').click(function(){cityButton()});
	$('#countryButton').click(function(){countryButton()});
	$('.closeModal').click(function(){closeModal()});
	$('#cancel').click(function(){cancel()});
});

function cancel() {
	closeModal();
	window.location.assign('../../');
}

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
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSeeAddress" onclick="seeAddress('+address[i].id+')">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditAddress" onclick="editAddress('+address[i].id+')">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeAddress('+address[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
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
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSeeContact" onclick="seeContact('+contacts[i].id+')">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditContact" onclick="editContact('+contacts[i].id+')">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeContact('+contacts[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
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
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalSeeProductService" onclick="seeProductService('+productsServices[i].id+')">Ver</button></td>';
			data += '<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalEditProductService" onclick="editProductService('+productsServices[i].id+')">Editar</button></td>';
			data += '<td><button class="btn btn-default" type="button" onclick="removeProductService('+productsServices[i].id+')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></button></td>';
			data += '</tr>';
		}
		data+='</table>';
	}
	$('#productsServicesTable').html(data);
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
	console.log("ADD ADDRESS ::::::::::::::::::::::::");
	var newAddres = {
		"id":pointerAddress++,
		"idCity":$("#cityList option:selected").val(),
		"idCountry":$("#countryList option:selected").val(),
		"country":$('#countryAddress').val(),
		"city":$('#cityAddress').val(),
		"address":$('#addressProvider').val(),
		"inDB":false,
		"idDB":-1
	};

	if(newAddres.idCountry!=0 || newAddres.country!=""){
		if($('#countryButton').prop('checked') == true && newAddres.idCountry==0){
			newAddres.idCountry = createCountry(newAddres.country);
			$("#countryList").val(newAddres.idCountry);
			$('#countryAddress').val("");
		}else{
			if($('#countryButton').prop('checked') != false && newAddres.idCountry != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Pais</div>');
				ScreenUp("modalAddAddress");
				return;
			}
		}	
		newAddres.country = $('#countryList option:selected').html();	
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione un pais</div>');
		ScreenUp("modalAddAddress");
		return;
	}

	if(newAddres.idCity!=0 || newAddres.city!=""){
		if($('#cityButton').prop('checked') == true && newAddres.idCity==0){
			newAddres.idCity = createCity(newAddres.city);
			$("#cityList").val(newAddres.idCity);
			$('#cityAddress').val("");
		}else{
			if($('#cityButton').prop('checked') != false && newAddres.idCity != 0){
				$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Error seleccionando Ciudad</div>');
				ScreenUp("modalAddAddress");
				return;
			}
		}	
		newAddres.city = $('#cityList option:selected').html();	
	}else{
		$('#msAddAddress').html('<div class="alert alert-warning" role="alert">Seleccione una ciudad</div>');
		ScreenUp("modalAddAddress");
		return;
	}
	console.log(JSON.stringify(newAddres));
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
			console.log("WebService get Countrys: "+JSON.stringify(data));
			if(data.validate == "true"){
				countrys = data.countries;
				listCountrys();
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar paises</div>');
				ScreenUp("modalAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msCreateProvider').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
}

function getCitys() {
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
			console.log("WebService get Citys: "+JSON.stringify(data));
			if(data.validate == "true"){
				citys = data.cities;
				listCitys();
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de listar ciudades</div>');
				ScreenUp("modalAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddres");
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

function listCitys() {
	var data = '<option value="0">-- Seleccione la ciudad --</option>';
	for (var i = 0; i < citys.length; i++) {
		data += '<option value="'+citys[i].idCity+'">'+citys[i].name+'</option>';
	};
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
			console.log("WebService Crear Country: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCountrys();
					idReturn = data.idCountry;
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear el pais'+data.status+'</div>');
					ScreenUp("modalAddAddress");
				}
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear paises</div>');
				ScreenUp("modalAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	return idReturn;
}

function createCity(cityName){
	var idReturn = -1;
	var dataAndAccount = {
		"username":sessionStorage.username,
		"logincode":sessionStorage.logincode,
		"cname":cityName
	};
	$.ajax({
		url: createCityService,
		type: 'GET',
		data: dataAndAccount,
		async : false,
		dataTipe: 'JSON',
		success: function (data) {
			console.log("WebService Crear City: "+JSON.stringify(data));
			if(data.validate == "true"){
				if(data.insert=="true"){
					getCitys();
					idReturn = data.idCity;
				}else{
					$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No se pudo crear la ciudad'+data.status+'</div>');
					ScreenUp("modalAddAddress");
				}
			}else{
				$('#msAddAddress').html('<div class="alert alert-danger" role="alert">No tiene permisos de crear ciudades</div>');
				ScreenUp("modalAddAddress");
			}
	    },
	    error: function(objXMLHttpRequest) {
	       	$('#msAddAddress').html('<div class="alert alert-danger" role="alert">Error de conexion</div>');
	       	ScreenUp("modalAddAddress");
	       	console.log("error",objXMLHttpRequest);
		}
	});
	return idReturn;
}

function ScreenUp (id) {
	console.log("SCREEN UP "+id);
	if(id != "msCreateProvider"){
		$('#'+id).scrollTop(0);
	}else{
		$('html,body').animate({
		    scrollTop: $("#"+id).offset().top
		}, 500);
	}

	setTimeout(function() {
		$('#'+id).html("");
	},10000);
}

function addContact() {
	console.log("ADD CONTACT");
	
}

function addProductService() {
	console.log("ADD PRODUCT SERVICE");
	
}

//See
function seeAddress(idAddress) {
	console.log("SEE ADDRESS: "+idAddress);
	var thisAddress;
	for (var i = 0; i < address.length; i++) {
		if(idAddress == address[i].id){
			thisAddress = address[i];
			break;
		}	
	}
	console.log("\tAddress: "+JSON.stringify(thisAddress));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisAddress.address+'</div><div class="panel-body">';
	data += '<strong>Pais: </strong>'+thisAddress.country+'<br>';
	data += '<strong>Ciudad: </strong>'+thisAddress.city+'<br>';
	data += '<strong>Direccion: </strong>'+thisAddress.address+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeAddress').html(data);
}

function seeContact(idContact) {
	console.log("SEE CONTACT: "+idContact);
	var thisContact;
	for (var i = 0; i < contacts.length; i++) {
		if(idContact == contacts[i].id){
			thisContact = contacts[i];
			break;
		}	
	}
	console.log("\tContact: "+JSON.stringify(thisContact));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisContact.name+'</div><div class="panel-body">';
	data += '<strong>Nombre: </strong>'+thisContact.name+'<br>';
	data += '<strong>Correo electronico: </strong>'+thisContact.email+'<br>';
	data += '<strong>Telefono: </strong>'+thisContact.phoneNumber+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeContact').html(data);
}

function seeProductService(idProductService) {
	console.log("SEE PRODUCT SERVICE: "+idProductService);
	var thisProductService;
	for (var i = 0; i < productsServices.length; i++) {
		if(idProductService == productsServices[i].id){
			thisProductService = productsServices[i];
			break;
		}	
	}
	console.log("\tContact: "+JSON.stringify(thisProductService));
	var data = '<div class="panel panel-info"><div class="panel-heading">'+thisProductService.name+'</div><div class="panel-body">';
	data += '<strong>Producto o servicio: </strong>'+thisProductService.name+'<br>';
	data += '<strong>Descripcion: </strong>'+thisProductService.description+'<br>';
	data += '<strong>Precio: </strong>'+formatNumber.new(parseFloat(thisProductService.price), "$")+'<br>';
	data += '</div></div>';
  	$('#bodyModalSeeProductService').html(data);
}

var formatNumber = {
	separador: ".", // separador para los miles
	sepDecimal: ',', // separador para los decimales
	formatear:function (num){
		num +='';
	  	var splitStr = num.split('.');
	  	var splitLeft = splitStr[0];
	  	var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
	  	var regx = /(\d+)(\d{3})/;
	  	while (regx.test(splitLeft)) {
	  		splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
	  	}
	  	return this.simbol + splitLeft  +splitRight;
	},
	new:function(num, simbol){
	  	this.simbol = simbol ||'';
	  	return this.formatear(num);
	}
}

//Edit
function editAddress(idAddress) {
	console.log("EDIT ADDRESS: "+idAddress);
}

function editContact(idContact) {
	console.log("EDIT CONTACT: "+idContact);
}

function editProductService(idProductService) {
	console.log("EDIT PRODUCT SERVICE: "+idProductService);
}

//Remove
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

function removeProductService (idProductService) {
	console.log("REMOVE PRODUCT SERVICE: "+idProductService);
	for (var i = 0; i < productsServices.length; i++) {
		if(idProductService == productsServices[i].id){
			productsServices.splice(i,1);
			break;
		}	
	}
	listProductsServices();
}

function closeModal() {
	console.log("CLOSE MODAL");
	$('#bodyModalSeeContact').html("");
	$('#bodyModalSeeAddress').html("");
	$("#cityList").val(0);
	$("#countryList").val(0);
	$('#countryAddress').val("");
	$('#cityAddress').val("");
	$('#addressProvider').val("");
	if($('#countryButton').prop('checked')){$('#countryButton').click();}
	if($('#cityButton').prop('checked')){$('#cityButton').click();}
}