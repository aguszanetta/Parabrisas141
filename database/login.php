<?php 
session_start();

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';

$consulta = "SELECT * FROM cuenta c
	INNER JOIN permiso p ON p.idPermiso = c.permisoID
	WHERE c.usuario = '$usuario' COLLATE utf8_bin ";
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
	$_SESSION["s_rol"] = $data[0]["rol"];
}else{	
	$data=null;
}

print json_encode($data);
$conexion=null;

?>