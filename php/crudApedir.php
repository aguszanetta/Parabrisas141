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
        //$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, s.idStock, s.cantidad, s.cristalID 
        $consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, s.idStock, s.aPedir, s.cristalID
        FROM stock s
        INNER JOIN cristal c ON c.idCristal = s.cristalID
        INNER JOIN modelo mo ON mo.idModelo = c.modeloID
        INNER JOIN marca m ON m.idMarca = mo.marcaID
        WHERE s.aPedir > 0";
        /*WHERE s.cantidad < 0";*/
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
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;