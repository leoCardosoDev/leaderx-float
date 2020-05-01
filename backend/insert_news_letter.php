<?php 

if(isset($_REQUEST["email"])){
    include 'helpers/helpers.php';

    $email = $_REQUEST["email"];

    $lista = array();

    $sql = "insert into tbl_news_letter (email, data_cadastro) values ('$email', now());";
    $conexao = conexao();
    $insert = mysqli_query($conexao, $sql);

    if($insert){
        $lista[0] = array(
            "status" => true,
        );
    }else{
        $lista[0] = array(
            "status" => false,
            "errorMessage" => "Esse e-mail já está cadastrado."
        );
    }

    
    echo json_encode($lista[0]);
    mysqli_close($conexao);
}

	
?>