/*
$(document).ready(function(){
	loadCitys();
	$(".filter").keyup(function(){listCitys()});
	$('.filter').focus();
});

var citys = {};
function loadCitys() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var city = newDinamicOWS(false);
	var data = city.get(citysListService ,dataAndAccount, 'name','cities');
	if(data.success == 'false'){
		city.showMessage('msCRUDCity', 'nameEmployed', 'No se pudo cargar las ciudades<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		citys = city.dataArray;
		listCitys();	
	}
}

//**agregar pais
function listCitys() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Ciudad</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < citys.length; i++) {
		var city = (citys[i].name).toUpperCase();
		if(find == "" || city.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+citys[i].name+'</td>';
			data+='<td onclick="editCity('+citys[i].idCity+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td onclick="deleteCity('+citys[i].idCity+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron ciudades");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}


//****terminar de aqui para abajo
function createCity(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "nombreArea": $('#area').val()};
	var area = newDinamicOWS(false);
	if(notBlakSpaceValidation(dataAndAccount.nombreArea)==false){
		area.showMessage('msCRUDArea', 'nameEmployed', 'Ingrese un nombre para el area', 'warning', 'modal', true);
		return;
	}
	var data = area.add(createAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msCRUDArea', 'nameEmployed', 'No se pudo crear el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se creo el area con exito!', 'success', 'default', true);
		$('#area').val("");
		loadCitys();
	}
}

function editArea(idArea){
	var area = findElement(citys, 'idArea', idArea);
	//console.log("Edit "+idArea+" - "+JSON.stringify(area));
	data = '';
	data += '<form action="javascript:approvedEditArea()">';
	data += '<div class="modal-body">';
	data += '<div id="msModalEdit"></div>';
	data += '<input type="hidden" class="form-control" id="idAdreaEdit" placeholder="idArea" required>';
	data += '<div class="form-group" id="inputAreaEdit">';
	data += '<label for="inputForm">Area</label>';
	data += '<input type="text" class="form-control" id="areaEdit" placeholder="Area" required>';
	data += '</div>';
	data += '</div><div class="modal-footer">';
    data +=	'<button type="submit" class="btn btn-primary">Guardar</button>';
   	data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
	data += '</form>';
   	$('#bodyModalEdit').html(data);
   	$('#idAdreaEdit').val(area.idArea);
   	$('#areaEdit').val(area.name);
   	$('#myModalEdit').modal('show');
}

function approvedEditArea() {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idArea": $('#idAdreaEdit').val(), "name": $('#areaEdit').val()};
	var area = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		area.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un nombre para el area', 'warning', 'modal', true);
		return;
	}

	var data = area.set(editAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msModalEdit', 'msModalEdit', 'No se pudo editar el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se Editó el area con exito!', 'success', 'default', true);
		$('#myModalEdit').modal('hide');
		loadCitys();
	}
}

function deleteArea(idArea) {
	var area = findElement(citys, 'idArea', idArea);
	//console.log("delete "+idArea+" - "+JSON.stringify(area));
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteArea"></div>';
	data += '<p>Está a punto de eliminar el area con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Area</div>';
  	data += '<div class="panel-body">';
    data += '<strong>Nombre de la area: </strong>'+area.name;
  	data += '</div></div>';
  	data += '<p>está accion es irreversible, ¿desea continuar?</p>';		     
	data += '</div><div class="modal-footer">';
	data +=	'<button type="button" class="btn btn-primary" onclick="approvedDeleteArea('+idArea+')">Continuar, Eliminar la area</button>';
    data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
   	data += '</div>';
   	$('#bodyModalDelete').html(data);
   	$('#myModalDelete').modal('show');
}

function approvedDeleteArea(idArea) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idArea": idArea};
	var area = newDinamicOWS(false);
	var data = area.remove(deleteAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msDeleteArea', 'msDeleteArea', 'No se pudo eliminar el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se elimino el area con exito!', 'success', 'default', true);
		$('#myModalDelete').modal('hide');
		loadCitys();
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}

*/