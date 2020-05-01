var device = {
	isMobile: function (){return window.innerWidth < 768 ? true : false},
	/**
	 * retorna o sistema mobile do dispositivo. Atualmente reconhece Android, iOS e windows phone. Caso Não
	 * seja nenhum dos 3, retorna 'unknown'
	 */
	mobileSystem: function(){
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    	// Windows Phone must come first because its UA also contains 'Android'
		if (/windows phone/i.test(userAgent)) {
			return 'Windows Phone';
		}

		if (/android/i.test(userAgent)) {
			return 'Android';
		}

		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 'iOS';
		}

		return 'unknown';
	}
}

var isCPF = function(val) {
    if (!val) return false;
    
    var strCPF = this.getNumberOfString(val);
    
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;
    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;
    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    
    return true;
    
}

var isCEP = function(val) {
    
    var strCEP = this.getNumberOfString(val);
    
    if(!strCEP) {
        return false;
    }

    if(strCEP.length < 8) {
        return false;
    }
    
    return true;
}


function getNumberOfString(str) {
    
    if (!str) return;
    
    return str.replace(/[^0-9]/g, '');
    
}


function getDateYear() {
    
    var date = new Date();
    
    return date.getFullYear()
    
}

function isEmail (email) {
    
    if (!email) return false;
    
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    
    if (filtro.test(email)) {
        return true;
    } else {
        return false;
    }
    
}

function findClosestAround(element,className) {
    // searching
    var firstTry = $(element).parent().children(className);
    // deeper search  
    var secondTry = $(element).parent().parent().children(className);
    // deepest search
    var thirdTry = $(element).parent().parent().parent().children(className);
    
    if (firstTry.length > 0) {
        return firstTry;
    }
    if (secondTry.length > 0) {
        return secondTry;
    }
    if (thirdTry.length > 0) {
        return thirdTry;
    }
}

function isPhone(number) {
    number = number.replace("(","");
    number = number.replace(")", "");
    number = number.replace("-", "");
    number = number.replace(" ", "").trim();
    
    var pattern = new RegExp("[(\d{2})]9[0-9]{4}\-[0-9]{4}");
    var pattern2 = new RegExp("[0-9]{2}9[0-9]{4}[0-9]{4}");
    return pattern.test(number) || pattern2.test(number);
}

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));