//http://www.danstools.com/javascript-obfuscate/index.php
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(v).B(3(){$(".C").x(3(){9("4")})});3 9(c){$("#"+c).7("")}3 y(){z i={"e":$(\'#e\').1(),"2":u($(\'#2\').1())};$.p({o:n,q:\'r\',0:i,s:f,A:\'U\',D:3(0){h(0.O==f){9("4");h(T(l)!=="S"){$(\'#2\').1("");6.5("j",0.j);6.5("d",0.d);6.5("a",0.a);6.5("g",0.g);H.I.K(\'J/\')}k{$(\'#2\').1("");$(\'#4\').7(" P! E G l L")}}k{m();$(\'#2\').1("");$(\'#4\').7("M R Q N")}},8:3(b){m();$(\'#2\').1("");$(\'#4\').7("w 8");t.F("8",b)}})}',57,57,'data|val|pass|function|loginValidation|setItem|sessionStorage|html|error|cleanInfo|loginCode|objXMLHttpRequest|id|username|user|true|rol|if|account|nameEmployee|else|Storage|singOut|loginService|url|ajax|type|GET|async|console|calcMD5|document|connection|change|login|var|dataTipe|ready|clsInfo|success|No|log|Web|window|location|pages|assign|support|Username|incorrect|access|Sorry|password|or|undefined|typeof|JSON'.split('|'),0,{}))
/*
$(document).ready(function(){
 	$(".clsInfo").change(function(){ cleanInfo("loginValidation")});
});

function cleanInfo (id) {
	$("#"+id).html("");
}

function login () {
	var account = {
		"user":$('#user').val(),
		"pass":calcMD5($('#pass').val())
	};
	$.ajax({
		url: loginService,
		type: 'GET',
		data: account,
		async : true,
		dataTipe: 'JSON',
		success: function (data) {
			if(data.access == true){
				cleanInfo("loginValidation");
				if (typeof(Storage) !== "undefined") {
					$('#pass').val("");
				    sessionStorage.setItem("nameEmployee", data.nameEmployee);
				    sessionStorage.setItem("username", data.username);
				    sessionStorage.setItem("loginCode", data.loginCode);
				    sessionStorage.setItem("rol", data.rol);
				    window.location.assign('pages/');
				} else {
					$('#pass').val("");
					$('#loginValidation').html(" Sorry! No Web Storage support");
				}	
			}else{
				singOut();
				$('#pass').val("");
				$('#loginValidation').html("Username or password incorrect");
			}
        },
        error: function(objXMLHttpRequest) {
        	singOut();
        	$('#pass').val("");
        	$('#loginValidation').html("connection error");
			console.log("error",objXMLHttpRequest);
		}
	});
}
*/