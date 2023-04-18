<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$fecha = (isset($_POST['fecha'])) ? $_POST['fecha'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$mail = (isset($_POST['mail'])) ? $_POST['mail'] : '';
$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
$dominio = (isset($_POST['dominio'])) ? $_POST['dominio'] : '';
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';
$compania = (isset($_POST['compania'])) ? $_POST['compania'] : '';
$trabajo = (isset($_POST['trabajo'])) ? $_POST['trabajo'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$valor = (isset($_POST['valor'])) ? $_POST['valor'] : '';
$efectivo = (isset($_POST['efectivo'])) ? $_POST['efectivo'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';


switch($opcion){
    case 1:
        $consulta = "SELECT * FROM historico";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;