<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idCliente = (isset($_POST['idCliente'])) ? $_POST['idCliente'] : '';
$razonSocial = (isset($_POST['razonSocial'])) ? $_POST['razonSocial'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$contacto1 = (isset($_POST['contacto1'])) ? $_POST['contacto1'] : '';
$contacto2 = (isset($_POST['contacto2'])) ? $_POST['contacto2'] : '';
$cuitCuil = (isset($_POST['cuitCuil'])) ? $_POST['cuitCuil'] : '';
$observaciones = (isset($_POST['observaciones'])) ? $_POST['observaciones'] : '';
$condicionLegalID = (isset($_POST['condicionLegalID'])) ? $_POST['condicionLegalID'] : '';
$idDomicilio = (isset($_POST['idDomicilio'])) ? $_POST['idDomicilio'] : '';
$calle = (isset($_POST['calle'])) ? $_POST['calle'] : '';
$piso = (isset($_POST['piso'])) ? $_POST['piso'] : '';
$depto = (isset($_POST['depto'])) ? $_POST['depto'] : '';
$referencia = (isset($_POST['referencia'])) ? $_POST['referencia'] : '';
$numero = (isset($_POST['numero'])) ? $_POST['numero'] : '';
$codPostal = (isset($_POST['codPostal'])) ? $_POST['codPostal'] : '';
$localidadID = (isset($_POST['localidadID'])) ? $_POST['localidadID'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "SELECT c.idCliente, c.razonSocial, c.telefono, c.email, c.contacto1, c.contacto2, 
        CONCAT_WS('\n', CONCAT('Contacto 1: ', c.contacto1), CONCAT('Contacto 2: ', c.contacto2)) AS contactos, 
        c.cuitCuil, DATE(c.fechaAlta) AS fechaAlta, c.observaciones, c.domicilioID, cl.tipo AS condicionLegal, c.estado, 
        d.calle, d.numero, d.piso, d.depto, d.codPostal, d.referencia,
        CONCAT_WS(', ', CONCAT(d.calle, ' ', d.numero), IF(d.piso IS NOT NULL OR d.depto IS NOT NULL, CONCAT('Piso ', d.piso, ' Dpto ', d.depto), NULL), 
        IF(d.codPostal IS NOT NULL, CONCAT('CP ', d.codPostal), NULL), l.nombre, d.referencia ) AS domicilio, l.idLocalidad, cl.idCondicionLegal
        FROM cliente c 
        INNER JOIN condicionlegal cl ON cl.idCondicionLegal = c.condicionLegalID
        INNER JOIN domicilio d ON d.idDomicilio = c.domicilioID
        INNER JOIN localidad l ON l.idLocalidad = d.localidadID
        GROUP BY c.idCliente
        ORDER BY c.idCliente DESC;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);    
        break;    
    case 2:
        /* -- Insertar Domicilio --- */
        $consulta = "INSERT INTO domicilio 
        (calle, piso, depto, referencia, numero, codPostal, localidadID) 
        VALUES('$calle', '$piso', '$depto', '$referencia', '$numero', '$codPostal', '$localidadID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $domicilioID=$conexion->lastInsertId();

        /* --- Insertar Cliente --- */
        $consulta = "INSERT INTO cliente 
        (razonSocial, telefono, email, contacto1, contacto2, cuitCuil, fechaAlta, observaciones, estado, condicionLegalID, domicilioID) 
        VALUES('$razonSocial', '$telefono', '$email', '$contacto1', '$contacto2', '$cuitCuil', CURDATE(), '$observaciones', 'Activo', '$condicionLegalID', '$domicilioID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:
        $consulta = "UPDATE cliente SET razonSocial='$razonSocial', telefono='$telefono', email='$email', contacto1='$contacto1', 
        contacto2='$contacto2', cuitCuil='$cuitCuil', observaciones='$observaciones', condicionLegalID='$condicionLegalID'
        WHERE idCliente='$idCliente'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);

        $consulta = "UPDATE domicilio SET calle= '$calle', piso= '$piso', depto='$depto', referencia= '$referencia', numero='$numero', 
        codPostal='$codPostal', localidadID= '$localidadID' 
        WHERE idDomicilio='$idDomicilio'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta = "SELECT * FROM condicionlegal";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "SELECT * FROM localidad ORDER BY nombre";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6:
        $consulta = "UPDATE cliente SET estado = 'Baja' WHERE idCliente='$idCliente'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;