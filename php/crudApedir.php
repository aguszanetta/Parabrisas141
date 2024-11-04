<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$idStock = (isset($_POST['idStock'])) ? $_POST['idStock'] : '';
$codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
$aPedir = (isset($_POST['aPedir'])) ? $_POST['aPedir'] : '';
$cristalID = (isset($_POST['cristalID'])) ? $_POST['cristalID'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, s.idStock, s.aPedir, s.cristalID,
        IFNULL((SELECT p.totalSinIva * s.aPedir
        FROM precio p
        WHERE p.listaPrecioID = 8 AND p.cristalID = c.idCristal),'Sin Precio Prop.') 
        AS precioFinal
        FROM stock s
        INNER JOIN cristal c ON c.idCristal = s.cristalID
        INNER JOIN modelo mo ON mo.idModelo = c.modeloID
        INNER JOIN marca m ON m.idMarca = mo.marcaID
        WHERE s.aPedir > 0;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2:    
        $consulta = "UPDATE stock SET aPedir='$aPedir' WHERE idStock='$idStock' ";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();    
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:    
        $consulta = "UPDATE stock SET aPedir='$aPedir' WHERE cristalID='$cristalID'";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();    
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:    
        $consulta = "SELECT * FROM `marca` ORDER BY nombre;";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();    
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:    
        $consulta = "UPDATE stock SET aPedir=0 WHERE idStock='$idStock'";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();    
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;