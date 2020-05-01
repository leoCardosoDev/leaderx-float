leaderx_page = {

    init: function(){
        leaderx_page.handleEvents();
    },

    scrollToItemOfMenu: function(element){

        var scrollTopInPx = 0;

        if($(".navigation__link").hasClass("active")){
            $(".navigation__link").toggleClass("active");
        }
        
        if(element.hasClass("leaderx")){ 
            element.preventDefault();
            console.log('TESTE')
            scrollTopInPx += $("#section-about").offset().top;

        }else if(element.hasClass("estrutura")){

            scrollTopInPx += $("#estrutura").offset().top;

        }else if(element.hasClass("modalidades")){

            scrollTopInPx += $("#modalidades").offset().top;

        }else if(element.hasClass("matricule-se-ja")){

            scrollTopInPx += $("#matricule-se-ja").offset().top;
            
        }

        $("html,body")
        .animate({
            scrollTop: scrollTopInPx
        },1000,);

    },

    sendMatricula: function(){
        var participar = $("input[name=participar]").val();
        var nome = $("input[name=nome]").val();
        var email = $("input[name=email]").val();
        var celular = $("input[name=celular]").val().replace(/[' '()-]/g,"");
        

        $.ajax({
			url: "backend/insert_matricula.php",
			type: 'POST',
            data: {nome:nome, email:email, celular:celular},
            beforeSend: function(){
                leaderx_page.setWaitToBtnMatricula();
            },
			success: function(data) {
                setTimeout(function(){
                    if(data != "" && data != null && data != undefined){
                        data = JSON.parse(data);
                        console.log(data);
                        if(data.status){
                            leaderx_page.setSuccessToBtnMatricula();
                        }else{
                            leaderx_page.setErrorToBtnMatricula(dados.status.errorMessage);
                        }
                    }else{
                        leaderx_page.setErrorToBtnMatricula();
                    } 
                },1000);
			},
			error: function(e) {
                leaderx_page.setErrorToBtnMatricula();
			}
		});
    },

    sendNewsLetter: function(){

        var email = $("input[name=email-news-letter]").val();

        $.ajax({
			url: "backend/insert_news_letter.php",
			type: 'POST',
            data: {email:email},
            beforeSend: function(){
                leaderx_page.setWaitToBtnNewsLetter();
            },
			success: function(data) {
                setTimeout(function(){
                    if(data != "" && data != null && data != undefined){
                        data = JSON.parse(data);
                        console.log(data);
                        if(data.status){
                            leaderx_page.setSuccessToBtnNewsLetter();
                        }else{
                            leaderx_page.setErrorToBtnNewsLetter();
                            leaderx_page.error_news_letter($("input[name=email-news-letter]"),data.errorMessage);
                        }
                    }else{
                        leaderx_page.setErrorToBtnNewsLetter();
                        leaderx_page.error_news_letter($("input[name=email-news-letter]"),"Erro durante o envio, tente novamente");
                    } 
                },1000);
			},
			error: function(e) {
                leaderx_page.setErrorToBtnNewsLetter();                
                leaderx_page.error_news_letter($("input[name=email-news-letter]"),"Erro durante o envio, tente novamente");
			}
		});
    },

    setSuccessToBtnNewsLetter: function(){
        $(".btn-send-newsletter").html("ENVIADO");
        $(".btn-send-newsletter").parent().removeClass("wait");
        $(".btn-send-newsletter").parent().removeClass("error");
        $(".btn-send-newsletter").parent().addClass("success");
        $(".input-news-letter").attr("readonly","readonly");
    },

    setWaitToBtnNewsLetter: function(){
        $(".btn-send-newsletter").html("AGUARDE");
        $(".btn-send-newsletter").parent().removeClass("error");
        $(".btn-send-newsletter").parent().removeClass("success");
        $(".btn-send-newsletter").parent().addClass("wait");
        $(".input-news-letter").attr("readonly","readonly");
    },

    setErrorToBtnNewsLetter: function(){
        $(".btn-send-newsletter").html("TENTE NOVAMENTE");
        $(".btn-send-newsletter").parent().removeClass("wait");
        $(".btn-send-newsletter").parent().removeClass("success");
        $(".btn-send-newsletter").parent().addClass("error");
        $(".input-news-letter").removeAttr("readonly");
    },

    setSuccessToBtnMatricula: function(){
        $("#enviar").preventDefault();
        
        $("#enviar").html("SOLICITAÇÃO REALIZADA!<br>ENTRAREMOS EM CONTATO");
        $("#enviar").removeClass("wait");
        $("#enviar").removeClass("error");
        $("#enviar").addClass("success");

        $(".input-formulary").attr("readonly","readonly");
    },

    setWaitToBtnMatricula: function(){
        $("#enviar").html("AGUARDE...");
        $("#enviar").removeClass("error");
        $("#enviar").removeClass("success");
        $("#enviar").addClass("wait");
        $(".input-formulary").attr("readonly","readonly");
    },

    setErrorToBtnMatricula: function(message){
        message = message || "ERRO, TENTAR NOVAMENTE"; 
        $("#enviar").html(message);
        $("#enviar").removeClass("wait");
        $("#enviar").removeClass("success");
        $("#enviar").addClass("error");
        $(".input-formulary").removeAttr("readonly");
    },

    focus: function(element){
        element.parent().removeClass("error");
    },

    error: function(element, messageError){
        element.next().html(messageError);
        if(!element.parent().hasClass("error")){
            element.parent().addClass("error");
        }
    },

    error_news_letter: function(element, messageError){
        element.next().next().html(messageError);
        if(!element.parent().hasClass("error")){
            element.parent().addClass("error");
        }
    },


    validateField: function(element){

        var isValid = true;
        var nameElement = element.attr("name");

        switch (nameElement) {

            case "email-news-letter":
                if(leaderx_page.validateEmail(element, true)){
                    isValid = true;
                    return isValid;
                }else{
                    isValid = false;
                    return isValid;
                }
            break;
            
            case "email":
                if(leaderx_page.validateEmail(element)){
                    isValid = true;
                    return isValid;
                }else{
                    isValid = false;
                    return isValid;
                }
            break;

            case "nome":
                if(leaderx_page.validateName(element)){
                    isValid = true;
                    return isValid;
                }else{
                    isValid = false;
                    return isValid;
                }
            break;

            case "celular":
                if(leaderx_page.validatePhone(element)){
                    isValid = true;
                    return isValid;
                }else{
                    isValid = false;
                    return isValid;
                }
            break;
        }

        return isValid;
    },

    validateName: function(element){

        var isValid = true;

        var validate_result = leaderx_page.validator(
            element.val(), 
            [
                "isEmpty", 
                "hasNumber", 
                "hasEspecialCharacters",
                "noHasLastName"
            ]);
        
        if(validate_result != "OK"){
            if(validate_result == "isEmpty"){
                leaderx_page.error(element, "Informe o seu nome");
                isValid = false;
                return isValid;
            } else if(validate_result == "hasNumber" || validate_result == "hasEspecialCharacters"){
                leaderx_page.error(element, "Nome inválido");
                isValid = false;
                return isValid;
            } else if(validate_result == "noHasLastName"){
                leaderx_page.error(element, "O sobrenome é obrigatório");
                isValid = false;
                return isValid;
            }
        }

        leaderx_page.focus(element);
        return isValid;
    },

    validateEmail: function(element, isMailNewsLetter){

        isMailNewsLetter = isMailNewsLetter || false;

        var isValid = true;

        var validate_result = leaderx_page.validator(
            element.val(), 
            [
                "isEmpty",
                "isInvalidEmail"
            ]);
        
        if(validate_result != "OK"){
            if(validate_result == "isEmpty"){
                if(isMailNewsLetter){
                    leaderx_page.error_news_letter(element, "Informe um e-mail");
                }else{
                    leaderx_page.error(element, "Informe um e-mail");
                }
                isValid = false;
                return isValid;
            } else if(validate_result == "isInvalidEmail"){
                if(isMailNewsLetter){
                    leaderx_page.error_news_letter(element, "Informe um e-mail válido");
                }else{
                    leaderx_page.error(element, "Informe um e-mail válido");
                }
                isValid = false;
                return isValid;
            }
        }

        leaderx_page.focus(element);
        return isValid;
    },

    validatePhone: function(element){
        var isValid = true;
        var value = element.val().replace(/[' '()-]/g,"");

        var validate_result = leaderx_page.validator(
            value, 
            [
                "isEmpty", 
                "hasEspecialCharacters",
                "hasLetter",
                "isInvalidCellPhone"
            ]);

        if(validate_result != "OK"){
            if(validate_result == "isEmpty"){
                leaderx_page.error(element, "Informe um telefone");
                isValid = false;
                return isValid;
            } else if(validate_result == "isInvalidCellPhone"){
                leaderx_page.error(element, "Celular inválido");
                isValid = false;
                return isValid;
            } else if(validate_result == "isInvalidFixedPhone"){
                leaderx_page.error(element, "Telefone inválido");
                isValid = false;
                return isValid;
            }
        }

        leaderx_page.focus(element);
        return isValid;
    },

    validator: function(value, arrayFlags, options){

        options = options || {};

        _return = "OK";

        if(arrayFlags.indexOf("isEmpty") != -1){
            if(value == "" || value == null || value == undefined){
                _return = "isEmpty";
                return _return
            }
        }

        if(arrayFlags.indexOf("hasNumber") != -1){
            if(/\d/.test(value)){
                _return = "hasNumber";
                return _return;
            }
        }

        if(arrayFlags.indexOf("hasLetter") != -1){
            if(/.*[a-zA-Z].*/g.test(value)){
                _return = "hasLetter";
                return _return;
            }
        }

        if(arrayFlags.indexOf("hasEspecialCharacters") != -1){
            if( 
                (/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g.test(value)) || 
                (value.indexOf(' ', value.indexOf(' ') + 1) == value.length-1) ){
                _return = "hasEspecialCharacters";
                return _return;
            }
        }

        if(arrayFlags.indexOf("noHasLastName") != -1){
            if(
                (value.indexOf(' ', 0) == -1) ||
                (value.indexOf(' ', 0) == value.length-1)
                ){
                _return = "noHasLastName";
                return _return;
            }
        }

        if(arrayFlags.indexOf("isInvalidEmail") != -1){
            if( (value.indexOf('@', 0) == -1) ||
            (value.indexOf('.',value.indexOf('@')) == -1) ||
            (value.indexOf('.',value.indexOf('@')) + 1 == value.length)){
                _return = "isInvalidEmail";
                return _return;
            }
        }

        if(arrayFlags.indexOf("isInvalidCellPhone") != -1){
            /* Verificando se é celular e se possui somente números */ 
            if (value.substr(2,1) == "9"){
                if(value.length != "11" || isNaN(value)){
                    _return = "isInvalidCellPhone";
                    return _return;
                }
            /* Verificando se é telfone fixo e se possui somente números*/ 
            }else{
                _return = "isInvalidCellPhone";
                return _return;
            }
        }
        
        if(arrayFlags.indexOf("hasMoreThan") != -1){
            if(value.length != options.moreThan){
                if(value.length > options.moreThan){
                    _return = "hasMoreThan";
                    return _return;
                }
            }
        }

        if(arrayFlags.indexOf("hasLessThan") != -1){
            if(value.length != options.lessThan){
                if(value.length < options.lessThan){
                    _return = "hasLessThan";
                    return _return;
                }
            }
        }

        return _return;
    },

    handleEvents: function(){
        $(document).ready(function(){
            $(".jsBtnHamburgerMenu").on("click", function(){
                if(innerWidth < 768){
                    $(".box-list-menu").toggleClass("active");
                }
            });

            $("#btn-matricule-se-ja").on("click", function(){
                leaderx_page.scrollToItemOfMenu($(".matricule-se-ja"));
            });

            $(".box-item-menu, .box-item-site-map").on("click", function(){
                leaderx_page.scrollToItemOfMenu($(this));
            });

            $(".input-formulary").on("focus", function(){
                leaderx_page.validateField($(this));
            });

            $(".input-formulary, .input-news-letter").on("blur", function(){
                leaderx_page.validateField($(this));
            });

            $(".input-formulary, .input-news-letter").on("focus", function(){
                leaderx_page.focus($(this));
            });

            $("#enviar").on("click", function(){

                if(!$(this).hasClass("success") && !$(this).hasClass("wait")){
                    if(
                        leaderx_page.validateField($("input[name=email]")) &&
                        leaderx_page.validateField($("input[name=nome]")) &&
                        leaderx_page.validateField($("input[name=celular]"))
                    ){
                        leaderx_page.sendMatricula();
                    }
                }
                
            });

            $(".btn-send-newsletter").on("click", function(){
                if(!$(this).parent().hasClass("success") && !$(this).parent().hasClass("wait")){
                    if(
                        leaderx_page.validateField($("input[name=email-news-letter]"))
                    ){
                        leaderx_page.sendNewsLetter();
                    }
                }
            });

            $("input[name=celular]").mask('(NN) N NNNN-NNNN',{clearIfNotMatch:false});

            if(device.mobileSystem() == 'iOS' || (navigator.userAgent.toLowerCase().indexOf("safari") !== -1 && innerWidth <= 768) ){
                $(".image-hero-content").addClass("showBannerIosMobile");
            }
        });
    }
}

leaderx_page.init();