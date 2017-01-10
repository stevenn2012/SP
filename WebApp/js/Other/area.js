$(document).ready(function(){
	loadAreas();
	$(".filter").keyup(function(){listAreas()});
	$('.filter').focus();
});

var areas = {};
function loadAreas() {
	var dataAndAccount = {"username":sessionStorage.username, "logincode":sessionStorage.logincode};
	var areasObj = newDinamicOWS(false);
	var data = areasObj.get(areaList ,dataAndAccount, 'name','areas');
	if(data.success == 'false'){
		areasObj.showMessage('msCRUDArea', 'nameEmployed', 'No se pudo cargar las areas<br><strong>Motivo: </strong>'+data.status, 'danger', 'default', true);	
	}else{
		areas = areasObj.dataArray;
		listAreas();	
	}
}

function listAreas() {
	var find = ($('.filter').val()).toUpperCase();
	var content = '<table class="table table-bordered">';
	content+='<tr><th>Area</th><th>Editar</th><th>Borrar</th></tr>';
	var data = "";
	for (var i = 0; i < areas.length; i++) {
		var area = (areas[i].name).toUpperCase();
		if(find == "" || area.indexOf(find)!=-1){
			data+='<tr>';
			data+='<td>'+areas[i].name+'</td>';
			data+='<td><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true" onclick="editArea('+areas[i].idArea+')"></span></button></td>';
			data+='<td><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true" onclick="deleteArea('+areas[i].idArea+')"></span></button></td>';
		  	data+='</tr>';
		}
	};
	if(data == ""){ $('#msfind').html("No se encontraron areas");
	}else{ $('#msfind').html("");}
	content += data+'</table>';
	$('#lista').html(content);
}

function createArea(){
	var dataAndAccount = { "username":sessionStorage.username, "logincode":sessionStorage.logincode, "nombreArea": $('#area').val()};
	var area = newDinamicOWS(false);
	var data = area.add(createAreaService ,dataAndAccount, '');
	if(data.success == 'false'){
		area.showMessage('msCRUDArea', 'nameEmployed', 'No se pudo crear el area<br><strong>Motivo: </strong>'+data.status, 'warning', 'default', true);	
	}else{
		area.showMessage('msCRUDArea', 'nameEmployed', 'Se creo el area con exito!', 'success', 'default', true);
		$('#area').val("");
		loadAreas();
	}
}

function editArea(idArea){
	console.log("Edit "+idArea);
}

function deleteArea(idArea) {
	console.log("delete "+idArea);
}