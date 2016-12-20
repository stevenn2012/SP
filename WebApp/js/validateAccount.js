//http://www.danstools.com/javascript-obfuscate/index.php
$(document).ready(function(){
 	$(".signout").click(function(){singOut()});
});

validateAccount();
function validateAccount() {
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
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
					singOut();
					if(indexPage != window.location && indexPage != window.location+"index.html"){
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
	if(sessionStorage.username && sessionStorage.logincode){
		var accountLogin = {
			"username":sessionStorage.username,
			"logincode":sessionStorage.logincode
		};
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("logincode");
		sessionStorage.removeItem("namel");
		sessionStorage.removeItem("roll");
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