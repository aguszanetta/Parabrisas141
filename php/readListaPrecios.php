<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$marcaID = (isset($_POST['marcaID'])) ? $_POST['marcaID'] : '';
$modeloID = (isset($_POST['modeloID'])) ? $_POST['modeloID'] : '';
//$modelo = str_replace("'", "\'", $modelo);
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';
$idEmpresa = (isset($_POST['idEmpresa'])) ? $_POST['idEmpresa'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
	/*--------------Cargar Tablas--------------*/
	case "empresas":
		$consulta = "SELECT idEmpresa, nombre AS empresa 
			FROM empresa
			WHERE estado = 'Activo'
			ORDER BY nombre";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "modelos":
		$consulta = "SELECT DISTINCT mo.idModelo, mo.nombre AS modelo
		FROM modelo mo
		INNER JOIN cristal c ON mo.idModelo = c.modeloID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN listaprecio lp ON p.listaPrecioID = lp.idListaPrecio
		INNER JOIN empresa e ON e.listaPrecioID = lp.idListaPrecio
		WHERE mo.marcaID = $marcaID AND e.idEmpresa = '$idEmpresa' AND p.estado = 'Activo'
		ORDER BY mo.nombre";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "cristales":
		$consulta = "SELECT DISTINCT c.tipo 
		FROM cristal c
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN listaprecio lp ON p.listaPrecioID = lp.idListaPrecio
		INNER JOIN empresa e ON e.listaPrecioID = lp.idListaPrecio
		WHERE modeloID = $modeloID AND e.idEmpresa = '$idEmpresa' AND p.estado = 'Activo'
		ORDER BY c.tipo";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case "listaDePrecio":
		$consulta = "SELECT m.idMarca, m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN listaprecio lp ON p.listaPrecioID = lp.idListaPrecio
		INNER JOIN empresa e ON e.listaPrecioID = lp.idListaPrecio
		WHERE e.idEmpresa = '$idEmpresa' AND p.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;
?>