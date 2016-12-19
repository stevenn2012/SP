//http://www.danstools.com/javascript-obfuscate/index.php
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(B).C(4(){$(".A").z(4(){9()})});k();4 k(){6(0.e&&0.5){m 8={"f":0.e,"5":0.5};$.n({v:y,w:\'t\',7:8,p:o,q:\'r\',u:4(7){6(7.D=="K"){6(3==1.2||3==1.2+"j.g"){1.2.c(3+\'E/\')}}l{6(3!=1.2&&3!=1.2+"j.g"){9();1.2.c(3)}}},a:4(d){9();h.i("a",d)}})}l{6(3!=1.2&&3!=1.2+"j.g"){1.2.c(3)}}}4 9(){6(0.e&&0.5){m 8={"f":0.e,"5":0.5};0.b("f");0.b("5");0.b("G");0.b("J");H{$.n({v:F,w:\'t\',7:8,p:o,q:\'r\',u:4(7){},a:4(d){h.i("a",d)}})}I(s){h.i(s.x)}1.2.c(3)}}',47,47,'sessionStorage|window|location|indexPage|function|loginCode|if|data|accountLogin|singOut|error|removeItem|assign|objXMLHttpRequest|username|user|html|console|log|index|validateAccount|else|var|ajax|false|async|dataTipe|JSON|err|GET|success|url|type|message|validateLogin|click|signout|document|ready|validate|pages|logoutService|nameEmployee|try|catch|rol|true'.split('|'),0,{}))
/*
$(document).ready(function(){
 	$(".signout").click(function(){singOut()});
});

validateAccount();
function validateAccount() {
	if(sessionStorage.username && sessionStorage.loginCode){
		var accountLogin = {
			"user":sessionStorage.username,
			"loginCode":sessionStorage.loginCode
		};
		$.ajax({
			url: validateLogin,
			type: 'GET',
			data: accountLogin,
			async : false,
			dataTipe: 'JSON',
			success: function (data) {
				if(data.validate == "true"){
					if(indexPage == window.location || indexPage == window.location+"index.html"){
						window.location.assign(indexPage+'pages/');
					}
				}else{
					if(indexPage != window.location && indexPage != window.location+"index.html"){
						singOut();
						window.location.assign(indexPage);
					}
				}
	        },
	        error: function(objXMLHttpRequest) {
	        	singOut();
	        	console.log("error",objXMLHttpRequest);
			}
		});
	}else{
		if(indexPage != window.location && indexPage != window.location+"index.html"){
			window.location.assign(indexPage);
		}
	}	
}

function singOut() {
	if(sessionStorage.username && sessionStorage.loginCode){
		var accountLogin = {
			"user":sessionStorage.username,
			"loginCode":sessionStorage.loginCode
		};
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("loginCode");
		sessionStorage.removeItem("nameEmployee");
		sessionStorage.removeItem("rol");
		try {
	    	$.ajax({
				url: logoutService,
				type: 'GET',
				data: accountLogin,
				async : false,
				dataTipe:'JSON',
				success: function (data) {
					
		        },
		        error: function(objXMLHttpRequest) {
		        	console.log("error",objXMLHttpRequest);
				}
			});
		}catch(err) {
			console.log(err.message);
		}
		window.location.assign(indexPage);		
	}
}
*/