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
		console.log(JSON.stringify(clients));
		listClients();	
	}
}

function listClients() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>NIT</th><th>Nombre</th><th>Descripcion</th><th>Digito de Verificacion</th><th>Direcciones</th><th>Contactos</th></tr>';
	
	var data = "";
	for (var i = 0; i < clients.length; i++) {
		var pais = (clients[i].name).toUpperCase();
		if(find == "" || pais.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+clients[i].NIT+'</td>';
			data+='<td>'+clients[i].name+'</td>';
			data+='<td>'+clients[i].description+'</td>';
			data+='<td>'+clients[i].DV+'</td>';
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalAddress" onclick="seeAddress('+clients[i].idClient+')">Direcciones</button></td>'; 
			data+='<td><button class="btn btn-default" type="button" data-toggle="modal" data-target="#modalContacts" onclick="seeContacts('+clients[i].idClient+')">Contactos</button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron clientes");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}


//*****************

function seeAddress(idClient) {
	//console.log("SEE ADDRESS: "+idClient);
	var client = getClient(idClient);
	//console.log(JSON.stringify(client));
	var address = client.direcciones;
	var number = 1;	
	var data = '<div class="scroll panel panel-info"><div class="panel-heading"> Direcciones de '+client.name+'</div><div class="panel-body">';
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
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeAddress').html(data);
}

function seeContacts(idClient) {
	//console.log("SEE CONTACTS: "+idClient);
	var client = getClient(idClient);
	//console.log(JSON.stringify(client));
	var contacts = client.contactos;
	var number = 2;
	var data = '<div class="scroll panel panel-info"><div class="panel-heading"> Contactos de '+client.name+'</div><div class="panel-body">';
	data += '<p>Acontinuacion se muestran los contactos del proveedor seleccionado, de click sobre el contacto para ver mas informacion.</p>';
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
	    data += '</div></div></div>';	
	}
    data += '</div></div></div>';		
	$('#bodyModalSeeContacts').html(data);
}


function getClient(idClient) {
	for (var i = 0; i <clients.length; i++) {
		if(idClient == clients[i].idClient){
			return clients[i];
		}
	};
}



