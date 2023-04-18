<?php 

switch ($_REQUEST["accion"]) {

	case 'recaptcha':
		
		//Configurar clave en config
	  $secret = '';
	  //Envío el request a la api de Google
	  $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_REQUEST['response']);
	  //Convierto la respuesta en JSON
	  $respuesta = json_decode($verifyResponse);

	  /*

	  Me retorna:

		action: "home" // action especificada en la función del lado del cliente
		challenge_ts: "2019-08-21T00:08:11Z" 
		hostname: "localhost"
		score: 0.9 // con el score puedo especificar si el usuario es seguro o no
		success: true	

	  */

	break;

	case 'enviarcontacto':

		include_once("email.php");

		$emailadministracion = "info@parabrisas141.com.ar";

		if ($_REQUEST["nombre"] != "" && $_REQUEST["email"] != "" && $_REQUEST["telefono"] != "" && $_REQUEST["mensaje"] != "") {
			
			$mensaje = '';
			$mensaje .= '<p>Hemos recibido un nuevo mensaje desde nuestro sitio web</p><br>';
			$mensaje .= '<ul>';
			$mensaje .= '<li>Nombre: '.$_REQUEST["nombre"].'</li>';
			$mensaje .= '<li>Email: '.$_REQUEST["email"].'</li>';
			$mensaje .= '<li>Teléfono: '.$_REQUEST["telefono"].'</li>';
			$mensaje .= '<li>Mensaje: '.$_REQUEST["mensaje"].'</li>';
			$mensaje .= '</ul>';

			$asunto = "Nuevo mensaje desde nuestro sitio web";

			if (enviarMail($emailadministracion, $asunto, $mensaje, $emailEmisor = $emailadministracion, $emailResponderA = $_REQUEST["email"])) {
				$respuesta["resultado"] = TRUE;
			}else{
				$respuesta["resultado"] = FALSE;
			}

		}

	break;
	
	default:
		
	break;
}

echo json_encode($respuesta);	

 ?>
