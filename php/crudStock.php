<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$idStock = (isset($_POST['idStock'])) ? $_POST['idStock'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){   
    case 1:      
        $consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, s.* 
        FROM stock s
        INNER JOIN cristal c ON c.idCristal = s.cristalID
        INNER JOIN modelo mo ON mo.idModelo = c.modeloID
        INNER JOIN marca m ON m.idMarca = mo.marcaID";
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