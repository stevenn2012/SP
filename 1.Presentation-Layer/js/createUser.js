//http://www.danstools.com/javascript-obfuscate/index.php
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(K).J(8(){i(k.d!=1){$(\'#g\').f(\'<2 a="0 0-q" 9="0">v w l o p n h x</2>\');$(\'#6\').c(\'e\',4);$(\'#5\').c(\'e\',4);$(\'#b\').c(\'e\',4);$(\'.d\').c(\'e\',4);$(\'#L\').c(\'e\',4)}});8 I(){O();H t={"6":$(\'#6\').3(),"s":$(\'#5\').3(),"F":G($(\'#b\').3()),"d":$(\'y:z[6=d]:j\').3(),"5":k.s,"r":k.r};$.N({Z:P,Y:\'X\',7:t,12:4,11:\'W\',V:8(7){i(7.h==4){A();$(\'#g\').f(\'<2 a="0 0-R" 9="0">Q 5</2>\')}B{$(\'#b\').3("");i(7.C==\'u\'){$(\'#g\').f(\'<2 a="0 0-q" 9="0">v w l o p n h x</2>\')}B i(7.C==4){$(\'#g\').f(\'<2 a="0 0-E" 9="0">U l h 5</2>\')}}},m:8(D){$(\'#g\').f(\'<2 a="0 0-E" 9="0">T m</2>\');$(\'#b\').3("");S.10("m",D)}})}8 A(){$(\'#6\').3("");$(\'#5\').3("");$(\'#b\').3("");$(\'y:z[6=d]:j\').M(\'j\',u)}',62,65,'alert||div|val|true|user|name|data|function|role|class|pass|prop|rol|disabled|html|createUserInfo|create|if|checked|sessionStorage|not|error|to|have|permissions|warning|loginCode|username|account|false|You|do|users|input|radio|limpiarForm|else|permit|objXMLHttpRequest|danger|password|calcMD5|var|createUser|ready|document|createUserButton|attr|ajax|validateAccount|createuserService|Created|info|console|Connection|Could|success|JSON|GET|type|url|log|dataTipe|async'.split('|'),0,{}))

/*
$(document).ready(function(){
	if(sessionStorage.rol != 1){
		$('#createUserInfo').html('<div class="alert alert-warning" role="alert">You do not have permissions to create users</div>');
	 	$('#name').prop('disabled', true);
		$('#user').prop('disabled', true);
		$('#pass').prop('disabled', true);
		$('.rol').prop('disabled', true);
		$('#createUserButton').prop('disabled', true);
	}
});
function createUser() {
	validateAccount();
	var account = {
		"name":$('#name').val(),
		"username":$('#user').val(),
		"password":calcMD5($('#pass').val()),
		"rol":$('input:radio[name=rol]:checked').val(),
		"user":sessionStorage.username,
		"loginCode":sessionStorage.loginCode
	};
	$.ajax({
		url: createuserService,
		type: 'GET',
		data: account,
		async : true,
		dataTipe: 'JSON',
		success: function (data) {
			if(data.create == true){
				limpiarForm();
				$('#createUserInfo').html('<div class="alert alert-info" role="alert">Created user</div>');	
			}else{
				$('#pass').val("");
				if(data.permit == 'false'){
					$('#createUserInfo').html('<div class="alert alert-warning" role="alert">You do not have permissions to create users</div>');
				}else if(data.permit == true){
					$('#createUserInfo').html('<div class="alert alert-danger" role="alert">Could not create user</div>');
				}
			}
        },
        error: function(objXMLHttpRequest) {
        	$('#createUserInfo').html('<div class="alert alert-danger" role="alert">Connection error</div>');
        	$('#pass').val("");
        	console.log("error",objXMLHttpRequest);
		}
	});
}

function limpiarForm() {
	$('#name').val("");
	$('#user').val("");
	$('#pass').val("");
	$('input:radio[name=rol]:checked').attr('checked', false);
}
*/