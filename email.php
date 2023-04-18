<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once __DIR__ . "/librerias/PHPMailer-6.8.0/src/PHPMailer.php";
require_once __DIR__ . "/librerias/PHPMailer-6.8.0/src/SMTP.php";
require_once __DIR__ . "/librerias/PHPMailer-6.8.0/src/Exception.php";

$GLOBALS["configuracion"]["email"] = array(
    "host" => "smtp.parabrisas141.com.ar",
    "usuario" => "info@parabrisas141.com.ar",
    "password" => "E6oJ6vrAvqM5",
    "puerto" => 465,
    "SMTPAuth" => true,
    "SMTPSecure" => "ssl",
    "SMTPDebug" => 0,
    "emailDesde" => "info@parabrisas141.com.ar",
    "nombreDesde" => "Parabrisas 141",
    "emailResponderA" => "noreply@parabrisas141.com.ar",
    "nombreResponderA" => "No Responder",
    "modoDebug" => true,
    "destinatarioDebug" => "pruebaparabrisas141@gmail.com"
);

// De momento no se registra si hubo errores en el envío del email
function enviarMail($destinatario, $asunto, $contenido, $emailEmisor = null, $emailResponderA = null) {
    $mail = new PHPMailer(false);
    $mail->Host = $GLOBALS["configuracion"]["email"]["host"];
    $mail->Username = $GLOBALS["configuracion"]["email"]["usuario"];
    $mail->Password = $GLOBALS["configuracion"]["email"]["password"];
    $mail->Port = $GLOBALS["configuracion"]["email"]["puerto"];
    $mail->SMTPDebug = $GLOBALS["configuracion"]["email"]["SMTPDebug"];
    $mail->isSMTP();
    $mail->SMTPAuth = $GLOBALS["configuracion"]["email"]["SMTPAuth"];
    $mail->SMTPSecure = $GLOBALS["configuracion"]["email"]["SMTPSecure"];
    if (!$emailEmisor || !emailValido($emailEmisor)) {
        $mail->setFrom($GLOBALS["configuracion"]["email"]["emailDesde"],
            $GLOBALS["configuracion"]["email"]["nombreDesde"]);
    } else {
        $mail->setFrom($emailEmisor);
    }
    if (!$emailResponderA || !emailValido($emailEmisor)) {
        $mail->addReplyTo($GLOBALS["configuracion"]["email"]["emailResponderA"],
            $GLOBALS["configuracion"]["email"]["nombreResponderA"]);
    } else {
        $mail->addReplyTo($emailResponderA);
    }
    if ($GLOBALS["configuracion"]["email"]["modoDebug"]) {
        $mail->addAddress($GLOBALS["configuracion"]["email"]["destinatarioDebug"]);
    } else {
        $mail->addAddress($destinatario);
    }
    $mail->isHTML(true);
    $mail->Subject = $asunto;
    $mail->Body = $contenido;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    ); 
    //TODO: Convertir a HTML a texto plano con una librería
    $mail->AltBody = "Placeholder de Alt-Text";

    if ($mail->send()) {
       return TRUE;    
    }else{
        return FALSE;
    }
}

function emailValido($email) {
    return preg_match("/.+@.+\..+/", $email);
}