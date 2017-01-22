$(document).ready(function(){
	loadValues();
	$(".filter").keyup(function(){listValues()});
	$('.filter').focus();
});

var values = {};
function loadValues() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var valuesObj = newDinamicOWS(false);
	var data = valuesObj.get(listValueService ,dataAndAccount, 'name','values');
	if(data.success == 'false'){
		valuesObj.showMessage('msCRUDValue', 'nameEmployed', 'No se pudo cargar las variables<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		values = valuesObj.dataArray;
		listValues();	
	}
}

function listValues() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Variable</th><th>Valor</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < values.length; i++) {
		var area = (values[i].name+values[i].value).toUpperCase();
		if(find == "" || area.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+values[i].name+'</td>';
			data+='<td>'+values[i].value+'</td>';
			data+='<td onclick="editValue('+values[i].idValue+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></td>';
			data+='<td onclick="deleteValue('+values[i].idValue+')"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron variables");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function createValue(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "name": $('#name').val(), "value": $('#value').val() };
	var value = newDinamicOWS(false);
	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		value.showMessage('msCRUDValue', 'nameEmployed', 'Ingrese un nombre para la variable', 'warning', 'modal', true);
		return;
	}
	if(notBlakSpaceValidation(dataAndAccount.value)==false){
		value.showMessage('msCRUDValue', 'nameEmployed', 'Ingrese un valor para la variable', 'warning', 'modal', true);
		return;
	}
	var data = value.add(createValueService ,dataAndAccount, '');
	if(data.success == 'false'){
		value.showMessage('msCRUDValue', 'nameEmployed', 'No se pudo crear la variable<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		value.showMessage('msCRUDValue', 'nameEmployed', 'Se creo la variable con exito!', 'success', 'default', true);
		$('#area').val("");
		loadValues();
	}
}

function editValue(idValue){
	var value = findElement(values, 'idValue', idValue);
	//console.log("Edit "+idValue+" - "+JSON.stringify(value));
	data = '';
	data += '<form action="javascript:approvedEditValue()">';
	data += '<div class="modal-body">';
	data += '<div id="msModalEdit"></div>';
	data += '<input type="hidden" class="form-control" id="idValueEdit" placeholder="idValue" required>';
	
	data += '<div class="form-group" id="inputValueEditName">';
	data += '<label for="inputForm">Nombre de la variable</label>';
	data += '<input type="text" class="form-control" id="valueNameEdit" placeholder="Nombre de la variable" required>';
	data += '</div>';
	
	data += '<div class="form-group" id="inputValueEditValue">';
	data += '<label for="inputForm">Valor</label>';
	data += '<input type="text" class="form-control" id="valueValueEdit" placeholder="Valor" required>';
	data += '</div>';

	data += '</div><div class="modal-footer">';
    data +=	'<button type="submit" class="btn btn-primary">Guardar</button>';
   	data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    data += '</div>';
	data += '</form>';

   	$('#bodyModalEdit').html(data);

   	$('#idValueEdit').val(value.idValue);
   	$('#valueNameEdit').val(value.name);
   	$('#valueValueEdit').val(value.value);
   	$('#myModalEdit').modal('show');
}

function approvedEditArea() {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idValue": $('#idValueEdit').val(), "name": $('#valueNameEdit').val(),"value": $('#valueValueEdit').val()};
	var value = newDinamicOWS(false);

	if(notBlakSpaceValidation(dataAndAccount.name)==false){
		value.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un nombre para la variable', 'warning', 'modal', true);
		return;
	}

	if(notBlakSpaceValidation(dataAndAccount.value)==false){
		value.showMessage('msModalEdit', 'msModalEdit', 'Ingrese un valor para la variable', 'warning', 'modal', true);
		return;
	}

	var data = value.set(editValueService ,dataAndAccount, '');
	if(data.success == 'false'){
		value.showMessage('msModalEdit', 'msModalEdit', 'No se pudo editar la variable<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		value.showMessage('msCRUDValue', 'nameEmployed', 'Se Editó la variable con exito!', 'success', 'default', true);
		$('#myModalEdit').modal('hide');
		loadValues();
	}
}

function deleteArea(idValue) {
	var value = findElement(values, 'idValue', idValue);
	//console.log("delete "+idValue+" - "+JSON.stringify(value));
	data = '';
	data += '<div class="modal-body">';
	data += '<div id="msDeleteValue"></div>';
	data += '<p>Está a punto de eliminar la variable con los siguientes datos: </p>';
	data += '<div class="panel panel-default"><div class="panel-heading">Variable</div>';
  	data += '<div class="panel-body">';
    data += '<strong>Nombre de la variable: </strong>'+value.name+"<br>";
  	data += '<strong>Valor de la variable: </strong>'+value.value;
  	data += '</div></div>';
  	data += '<p>está accion es irreversible, ¿desea continuar?</p>';		     
	data += '</div><div class="modal-footer">';
	data +=	'<button type="button" class="btn btn-primary" onclick="approvedDeleteValue('+idValue+')">Continuar, Eliminar la variable</button>';
    data +=	'<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
   	data += '</div>';
   	$('#bodyModalDelete').html(data);
   	$('#myModalDelete').modal('show');
}

function approvedDeleteValue(idValue) {
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "idValue": idValue};
	var value = newDinamicOWS(false);
	var data = value.remove(deleteValueService ,dataAndAccount, '');
	if(data.success == 'false'){
		value.showMessage('msDeleteValue', 'msDeleteValue', 'No se pudo eliminar la variable<br><strong>Motivo: </strong>'+data.status, 'warning', 'modal', true);	
	}else{
		value.showMessage('msCRUDValue', 'nameEmployed', 'Se elimino la variable con exito!', 'success', 'default', true);
		$('#myModalDelete').modal('hide');
		loadValues();
	}
}

function findElement(obj, attrib, idCompare) {
	for (var i = 0; i < obj.length; i++){ var element = obj[i]; if(idCompare == element[attrib]) return element;} return null;
}