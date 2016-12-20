displaytable(1);

var obj = [{}];

var n1 = 1;
var n2 = 1;

function agregarcampo(tabla) {
	var data = $('#tabla'+tabla).html()+"<tr>";
	if(tabla == 1){
		var values = ["nombre", "apellido"];
		for (var i = 0; i < values.length; i++) {
			var v = "'"+n1+values[i]+"'";
			data += '<td><input id='+v+' onchange="addChange(1, '+n1+')" type="text"></td>';	
		};
		n1 = n1+1;
	}else if(tabla == 2){
		var values = ["celular", "direccion"];
		for (var i = 0; i < values.length; i++) {
			var v = "'"+n2+values[i]+"'";
			data += '<td><input id='+v+' onchange="addChange(2, '+n2+')" type="text"></td>';	
		};
		n2 = n2+1;
	}
	$('#tabla'+tabla).html(data);
	cargarDatos();
}

function displaytable(display) {
	if(display==2){
		$('#1').css("display","none");
		$('#2').css("display","table");
	}else if (display==1){
		$('#2').css("display","none");
		$('#1').css("display","table");
	}
}

function addChange(table, num) {
	console.log(table+" - "+num);
	console.log("Entra: "+JSON.stringify(obj));
	if(table==1){
		if(obj[num]){
			console.log("exist");
			obj[num].nombre = $('#'+num+"nombre").val();
			obj[num].apellido = $('#'+num+"apellido").val();
		}else{
			var newObj = {};
			newObj[num] = ({
				"id":num,
				"nombre": $('#'+num+"nombre").val(), 
				"apellido": $('#'+num+"apellido").val()
			});
			obj.push(newObj);	
		}
	}
	console.log("Sale: "+JSON.stringify(obj));
}

function cargarDatos() {
	
}