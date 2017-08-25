
setTimeout(function sunrise () {
  document.getElementsByClassName('header')[0].style.backgroundColor = '#c5dfb4';
}, 0);

/*----------------------------------------
Fn Gestion des cookies
----------------------------------------*/
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toUTCString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	// alert(name+"="+value+expires+"; path=/");
}

function readCookie(name) {
	var nameEQ = name + "=";
	// alert (nameEQ);
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}



// 2.  test cookie =====================================================	
var visiteur = readCookie("visiteur");
console.log('cookie : ' + visiteur);

if(visiteur == null){
	console.log('cookie null');
	visiteur = new Date().valueOf();
	createCookie('visiteur',visiteur,360);
}



