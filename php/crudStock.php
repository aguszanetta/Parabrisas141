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
        $consulta = "UPDATE stock SET cantidad='$cantidad' WHERE codigo='$codigo' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM stock WHERE codigo='$codigo' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2:    
        $consulta = "SELECT * FROM stock";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Cargar Desplegables--------------*/
    case 3: 
        $consulta = "SELECT DISTINCT marca FROM stock";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "SELECT DISTINCT modelo FROM stock WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "SELECT DISTINCT cristal FROM stock WHERE modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Filtrar Tabla--------------*/
    case 6:
        $consulta = "SELECT * FROM stock WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
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
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;