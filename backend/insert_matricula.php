<?php

// if submitted check response
if ($_REQUEST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_REQUEST["g-recaptcha-response"]
    );
}

if(isset($_REQUEST["email"])){
    include 'helpers/helpers.php';
    include 'helpers/mail/send_mail.php';

    $email = $_REQUEST["email"];
    $nome = $_REQUEST["nome"];
    $celular = $_REQUEST["celular"];

    $lista = array();

    $sql = "insert into tbl_matricula (email, nome, celular, data_cadastro) values ('$nome', '$email', '$celular', now());";
    $conexao = conexao();
    $insert = mysqli_query($conexao, $sql);

    if($insert){
        if(sendMail($nome, $email, $celular)){
            $lista[0] = array(
                "status" => true,
            );
        }else{
            $lista[0] = array(
                "status" => false,
                "errorMessage" => "Erro, por favor entre em contato por telefone."
            );
        }   
    }else{
        $lista[0] = array(
            "status" => false,
            "errorMessage" => "Erro ao gravar dados, tente novamente."
        );
    }

    
    echo json_encode($lista[0]);
    mysqli_close($conexao);
}

	
?>