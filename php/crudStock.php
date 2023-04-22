<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$idStock = (isset($_POST['idStock'])) ? $_POST['idStock'] : '';
//$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
//$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
//$modelo = str_replace("'", "\'", $modelo); /*Contempla las comillas simples dentro de la consulta, por ejemplo Modelo: A3 '02 */
//$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';
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
    /*--------------Filtrar Tabla--------------
    case 7:
        $consulta = "SELECT * FROM stock WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8:
        $consulta = "SELECT * FROM stock WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 9:
        $consulta = "INSERT INTO pedidos SELECT codigo, marca, modelo, descripcion, cristal, posicion, lado, color, cantidad FROM stock WHERE codigo='$codigo'; UPDATE pedidos SET cantidad=1 WHERE codigo='$codigo' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;*/
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;