<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idTurno = (isset($_POST['idTurno'])) ? $_POST['idTurno'] : '';
$fechaHora = (isset($_POST['fechaHora'])) ? $_POST['fechaHora'] : '';
$contacto = (isset($_POST['contacto'])) ? $_POST['contacto'] : '';
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
$marcaID = (isset($_POST['marcaID'])) ? $_POST['marcaID'] : '';
$modeloID = (isset($_POST['modeloID'])) ? $_POST['modeloID'] : '';
$cristalID = (isset($_POST['cristalID'])) ? $_POST['cristalID'] : '';
$empresaID = (isset($_POST['empresaID'])) ? $_POST['empresaID'] : '';
$idCristales = (isset($_POST['idCristales'])) ? $_POST['idCristales'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';


switch($opcion){
    case 1:
        $consulta = "SELECT * FROM turno";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        $consulta = "INSERT INTO turno 
        (fechaHora, contacto, telefono, mail, dominio, siniestro, observacion, efectivo, estado, modeloID, empresaID) 
        VALUES('$fechaHora', '$contacto', '2215485663', 'mav@gmail.com', 'FGH456', '111', '', 'No', 'Activo', 3, 3) ";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        /*$data=$resultado->fetchAll(PDO::FETCH_ASSOC);*/
        /*$data = array_push($data, $last_insert_id);*/
        $data=$conexion->lastInsertId();
        break;
    case 3:        
        $consulta = "UPDATE turno SET contacto='$contacto', fechaHora='$fechaHora' WHERE idTurno='$idTurno'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);                           
        break;
    case 4:
        $consulta = "DELETE FROM turnodetalle WHERE turnoID='$idTurno';
        DELETE FROM trabajoturno WHERE turnoID='$idTurno';
        DELETE FROM turno WHERE idTurno='$idTurno' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "UPDATE turno SET estado='Finalizado' WHERE idTurno='$idTurno'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Cargar Desplegables--------------*/
    case 6:
        $consulta = "SELECT * FROM empresa;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "SELECT * FROM marca;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8:
        $consulta = "SELECT * FROM modelo WHERE marcaID='$marcaID';";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 9:
        $consulta = "SELECT * FROM cristal WHERE modeloID='$modeloID';";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    /*--------------Precio--------------*/
    case 10: 
        $consulta = "SELECT p.totalSinIva, p.totalConIva FROM precio p 
        INNER JOIN empresaprecio ep ON ep.precioID = p.idPrecio
        WHERE (p.cristalID = '$cristalID') AND (ep.empresaID = '$empresaID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "SELECT p.totalSinIva, p.totalConIva, p.cristalID FROM precio p 
        INNER JOIN empresaprecio ep ON ep.precioID = p.idPrecio
        WHERE p.cristalID IN ($idCristales) AND (ep.empresaID = '$empresaID');";
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