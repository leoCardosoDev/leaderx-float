<?php   

function sendMail($nome, $email, $celular){
	// Inclui o arquivo class.phpmailer.php localizado na mesma pasta do arquivo php 
	include "PHPMailerAutoload.php"; 
	// include '../helpers.php';

	// Inicia a classe PHPMailer 
	$mail = new PHPMailer(); 

	$email->SMTPDebug = 1;

	// Método de envio 
	$mail->IsSMTP(); 

	// Enviar por SMTP 
	$mail->Host = "in-v3.mailjet.com"; 

	// Você pode alterar este parametro para o endereço de SMTP do seu provedor 

	// Usar autenticação SMTP (obrigatório) 
	$mail->SMTPAuth = true; 

	$mail->Port = 2525;
	$email->SMTPSecure = 'tsl';

	// Usuário do servidor SMTP (endereço de email) 
	// obs: Use a mesma senha da sua conta de email 
	$mail->Username = "4cd5b22caa7d35b17add24f21219a42f";
	$mail->Password = 'd7a6f9c38a0d66cb38dfaa7579db7b3e'; 

	// Configurações de compatibilidade para autenticação em TLS 
	$mail->SMTPOptions = array( 'ssl' => array( 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true )); 

	// Você pode habilitar esta opção caso tenha problemas. Assim pode identificar mensagens de erro. 
	// $mail->SMTPDebug = 2; 

	// Define o remetente 
	// Seu e-mail 
	$mail->From = "leadex@devprojeto.com.br";

	// Seu nome 
	$mail->FromName = "LeaderX | Exponential Leadership"; 


	// ************************************************************************
	// $sql = "select * from cbeyound_users where email = '".$_REQUEST["email"]."';";
	// $conexao = conexao();
	// $select = mysqli_query($conexao,$sql);
	// $array = mysqli_fetch_array($select);


	// Define o(s) destinatário(s) 
	$mail->AddAddress('leonardo@pillbiz.com.br'); 
	$mail->AddBCC('arthur@pillbiz.com.br', 'Arthur Melo');
	$mail->AddBCC('leocardosodev@gmail.com', 'Leonardo Silva');

	// Opcional: mais de um destinatário
	// $mail->AddAddress('fernando@email.com'); 

	// Opcionais: CC e BCC
	// $mail->AddCC('joana@provedor.com', 'Joana'); 
	// $mail->AddBCC('roberto@gmail.com', 'Roberto'); 

	// Definir se o e-mail é em formato HTML ou texto plano 
	// Formato HTML . Use "false" para enviar em formato texto simples ou "true" para HTML.
	$mail->IsHTML(true); 

	// Charset (opcional) 
	$mail->CharSet = 'UTF-8'; 

	// Assunto da mensagem 
	$mail->Subject = "Você recebeu um novo cadastro - [".$nome."]"; 

	// Corpo do email 
	$mail->Body = '<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Notificação de nova matrícula</title>
		<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,700&display=swap" rel="stylesheet"/>
	</head>
	<body style="margin: 0; padding: 0;">
		<table bgcolor="ffffff" align="center" cellpadding="0" cellspacing="0" width="600" style="color: #333333;font-family: \'Ubuntu\', sans-serif;font-weight: 300">

			<tr cellpadding="0" cellspacing="0">
				<td cellpadding="0" cellspacing="0" style="background-color:#000000; padding: 30px 0 30px 0; text-align: center">
					<img width="150" src="https://demianmaiaalphaville.com.br/assets/img/demian-logo.png" style="display:inline-block" alt="Logo Connect Beyound" />
					<img width="150" src="https://demianmaiaalphaville.com.br/assets/img/alpha-logo.png" style="padding-left:30px;display:inline-block" alt="Logo Connect Beyound" />
				</td>
			</tr>
			<tr cellpadding="0" cellspacing="0">
				<td cellpadding="0" cellspacing="0" style="padding: 100px 0 30px 0;text-align: center;font-size: 18pt;">
					Olá!<br/><br/>
					<b>Um novo lead se cadastrou na landing page!</b><br/><br/>
					
					Abaixo, os dados cadastrados:
				</td>
			</tr>
			<tr cellpadding="0" cellspacing="0">
				<td cellpadding="0" cellspacing="0" style="padding: 0px 0px 100px 100px;text-align: left;font-size: 18pt;">
					<strong>Nome do interessado: </strong><span>'.$nome.'</span><br/><br/>
					<strong>Email: </strong><span>'.$email.'</span><br/><br/>
					<strong>Celular: </strong><span>'.mask($celular, "(##) # ####-####").'</span><br/><br/>
				</td>
			</tr>
			<tr cellpadding="0" cellspacing="0">
				<td cellpadding="0" cellspacing="0" style="background-color:#000000; padding: 30px 0 30px 0; text-align: center">
					<strong style="color:#ffffff">© 2019, AlphaTeam - Demian Maia Jiu-Jitsu Alphaville.</strong><br/><br/>
					<span style="color:#ffffff">Todos os direitos reservados. Desenvolvido por <a href="http://www.pilulacriativa.marketing" title="New Pilula Criativa" style="text-decoration:none; color:#ffffff">New Pilula Criativa</a></span>
				</td>
			</tr>
		</table>
		<!--  -->
	</body>
	</html>';

	// Opcional: Anexos 
	// $mail->AddAttachment("/home/usuario/public_html/documento.pdf", "documento.pdf"); 

	// Envia o e-mail 
	$enviado = $mail->Send();// or die('erro'); 

	// Exibe uma mensagem de resultado 
	if ($enviado) 
	{ 
		return true;
	} else { 
		return false; 
	}
}

function mask($val, $mask)
{
	$maskared = '';
	$k = 0;
	
	for($i = 0; $i<=strlen($mask)-1; $i++)
	{
		if($mask[$i] == '#')
		{
			if(isset($val[$k]))
				$maskared .= $val[$k++];
		}
		else
		{
			if(isset($mask[$i]))
				$maskared .= $mask[$i];
		}
	}
	return $maskared;
}

?>