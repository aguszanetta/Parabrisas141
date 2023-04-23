<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$idAPedir = (isset($_POST['idAPedir'])) ? $_POST['idAPedir'] : '';
$codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:      
        $consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, s.idStock, s.cantidad, s.cristalID 
        FROM stock s
        INNER JOIN cristal c ON c.idCristal = s.cristalID
        INNER JOIN modelo mo ON mo.idModelo = c.modeloID
        INNER JOIN marca m ON m.idMarca = mo.marcaID
        WHERE s.cantidad < 0";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2:    
        $consulta = "UPDATE stock SET cantidad='$cantidad' WHERE idStock='$idStock' ";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();    
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;