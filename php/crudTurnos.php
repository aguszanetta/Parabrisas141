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
$modelo = str_replace("'", "\'", $modelo);
$dominio = (isset($_POST['dominio'])) ? $_POST['dominio'] : '';
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';
$codCristal = (isset($_POST['codCristal'])) ? $_POST['codCristal'] : '';
$compania = (isset($_POST['compania'])) ? $_POST['compania'] : '';
$trabajo = (isset($_POST['trabajo'])) ? $_POST['trabajo'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$valor = (isset($_POST['valor'])) ? $_POST['valor'] : '';
$efectivo = (isset($_POST['efectivo'])) ? $_POST['efectivo'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO turnos (fecha, nombre, telefono, mail, marca, modelo, dominio, cristal, codCristal, compania, trabajo, descripcion, valor, efectivo ) VALUES('$fecha', '$nombre', '$telefono', '$mail', '$marca', '$modelo', '$dominio', 
            '$cristal', '$codCristal', '$compania', '$trabajo', '$descripcion', '$valor', '$efectivo') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM turnos ORDER BY numero DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        $consulta = "UPDATE turnos SET fecha='$fecha', nombre='$nombre', telefono='$telefono', mail='$mail', marca='$marca',
            modelo='$modelo', dominio='$dominio', cristal='$cristal', codCristal='$codCristal', compania='$compania', trabajo='$trabajo', 
            descripcion='$descripcion', valor='$valor', efectivo='$efectivo'  WHERE numero='$numero' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM turnos WHERE numero='$numero' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM turnos WHERE numero='$numero' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:
        $consulta = "SELECT * FROM turnos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "INSERT INTO historico SELECT * FROM turnos WHERE numero='$numero';DELETE FROM turnos WHERE numero='$numero' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6:
        $consulta = "INSERT INTO total (precio) VALUES ('$valor') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "SELECT SUM(precio) FROM total";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8:
        $consulta = "DELETE FROM total ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Cargar Desplegables--------------*/
    case 9: 
        $consulta = "SELECT DISTINCT marca FROM stock";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 10:
        $consulta = "SELECT DISTINCT modelo FROM stock WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "SELECT DISTINCT cristal FROM stock WHERE modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 12:
        $consulta = "SELECT DISTINCT cantidad FROM stock WHERE codigo='$codCristal' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 13:
        $consulta = "SELECT cantidad FROM stock WHERE codigo='$codCristal' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 14:
        $consulta = "UPDATE stock SET cantidad='$cantidad' WHERE codigo='$codCristal' ";        
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 15:
        $consulta = "SELECT DISTINCT codigo, posicion, lado, color FROM stock WHERE marca='$marca' and modelo='$modelo' and cristal='$cristal' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
    break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;