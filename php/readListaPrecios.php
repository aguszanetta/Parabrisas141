<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
$modelo = str_replace("'", "\'", $modelo);
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
	/*--------------Cargar Tablas--------------*/
    case "asnm":
		/*$consulta = "SELECT * FROM laCaja";*/
		/* --- Allianz / Sure / Nacion / Mapfre ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 12 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "comun":
		/*$consulta = "SELECT * FROM glasscom";*/
		/* --- Comun ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 2 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "fedPat":
		/*$consulta = "SELECT * FROM fedPat";*/
		/* --- FedPat ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 3 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "laCaja":
		/*$consulta = "SELECT * FROM comun";*/
		/* --- La Caja ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 5 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "lss":
		/*$consulta = "SELECT * FROM allianzSuraNacionMapfre";*/
		/* --- La Segunda - Sancor ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 6 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "sanCristobal":
		/*$consulta = "SELECT * FROM laSegundaSancor";*/
		/* --- San Cristobal ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 10 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "glasscom":
		/*$consulta = "SELECT * FROM sanCristobal";*/
		/* --- Glasscom ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 4 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "particulares":
		/*$consulta = "SELECT * FROM particulares";*/
		/* --- Particulares ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 9 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;
?>