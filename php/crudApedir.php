<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
$modelo = str_replace("'", "\'", $modelo); /*Contempla las comillas simples dentro de la consulta, por ejemplo Modelo: A3 '02 */
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:        
        $consulta = "DELETE FROM pedidos WHERE codigo='$codigo' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 2:    
        $consulta = "SELECT * FROM pedidos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Cargar Desplegables--------------*/
    case 3: 
        $consulta = "SELECT DISTINCT marca FROM pedidos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "SELECT DISTINCT modelo FROM pedidos WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "SELECT DISTINCT cristal FROM pedidos WHERE modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Filtrar Tabla--------------*/
    case 6:
        $consulta = "SELECT * FROM pedidos WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "SELECT * FROM pedidos WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8:
        $consulta = "SELECT * FROM pedidos WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 9:
        $consulta = "SELECT COUNT(1) FROM pedidos WHERE codigo = '$codigo' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 10:
        $consulta = "SELECT cantidad FROM pedidos WHERE codigo='$codigo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "UPDATE pedidos SET cantidad='$cantidad' WHERE codigo='$codigo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 12:
        $consulta = "UPDATE pedidos SET cantidad='$cantidad' WHERE codigo='$codigo' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM pedidos WHERE codigo='$codigo' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;