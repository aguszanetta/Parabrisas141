<?php 
session_start();

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';

$consulta = "SELECT * FROM cuenta WHERE usuario = '$usuario' COLLATE utf8_bin ";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC); 

if ($data == null){
	$passHasheado = null;
}else{
	$passHasheado = $data[0]["password"];
}

if(password_verify($password, $passHasheado)){
	$_SESSION["s_usuario"] = $usuario;
}else{	
	$data=null;
}

print json_encode($data);
$conexion=null;

?>