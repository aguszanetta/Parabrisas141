<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idTurno = (isset($_POST['idTurno'])) ? $_POST['idTurno'] : '';
$fechaHora = (isset($_POST['fechaHora'])) ? $_POST['fechaHora'] : '';
$contacto = (isset($_POST['contacto'])) ? $_POST['contacto'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$dominio = (isset($_POST['dominio'])) ? $_POST['dominio'] : '';
$empresaID = (isset($_POST['empresaID'])) ? $_POST['empresaID'] : '';
$trabajos = (isset($_POST['trabajo'])) ? $_POST['trabajo'] : '';
$siniestro = (isset($_POST['siniestro'])) ? $_POST['siniestro'] : '';
$observacion = (isset($_POST['observacion'])) ? $_POST['observacion'] : '';
$esPago = (isset($_POST['esPago'])) ? $_POST['esPago'] : '';
$tipoPago = (isset($_POST['tipoPago'])) ? $_POST['tipoPago'] : '';
$numFactura = (isset($_POST['numFactura'])) ? $_POST['numFactura'] : '';
$modeloID = (isset($_POST['modeloID'])) ? $_POST['modeloID'] : '';
$marcaID = (isset($_POST['marcaID'])) ? $_POST['marcaID'] : '';
$cristalID = (isset($_POST['cristalID'])) ? $_POST['cristalID'] : '';
$cristales = (isset($_POST['cristales'])) ? $_POST['cristales'] : '';
$banderaCristales = (isset($_POST['banderaCristales'])) ? $_POST['banderaCristales'] : '';
$banderaTrabajos = (isset($_POST['banderaTrabajos'])) ? $_POST['banderaTrabajos'] : '';
$idCristales = (isset($_POST['idCristales'])) ? $_POST['idCristales'] : '';
$mes = (isset($_POST['mes'])) ? $_POST['mes'] : '';
$cristalesAPedir = (isset($_POST['cristalesAPedir'])) ? $_POST['cristalesAPedir'] : '';
$cristalesEliminar = (isset($_POST['cristalesEliminar'])) ? $_POST['cristalesEliminar'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "SELECT idTurno, fechaHora, contacto, estado FROM turno";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:
        /* --- Insertar Turno --- */
        $consulta = "INSERT INTO turno 
        (fechaHora, contacto, telefono, dominio, siniestro, observacion, esPago, tipoPago, numFactura, estado, modeloID, empresaID) 
        VALUES('$fechaHora', '$contacto', '$telefono', '$dominio', '$siniestro', '$observacion', '$esPago', '$tipoPago', '$numFactura', 'Activo', '$modeloID', '$empresaID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $turnoID=$conexion->lastInsertId();
        
        /* --- Insertar Cristales --- */
        $valuesCristales='';
        foreach ($cristales as $cristal){
            $valuesCristales = $valuesCristales . '(' .  implode(", ", $cristal) . ', ' . $turnoID . '),';
        }
        $valuesCristales = substr($valuesCristales , 0, -1);
        $consulta="INSERT INTO turnodetalle (otro, importeSinIva, importeConIva, cantidad, cristalID, esAPedir, turnoID) VALUES $valuesCristales ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);

        /* --- Insertar aPedir --- */
        $cantidadAPedir = is_array($cristalesAPedir) ? count($cristalesAPedir) : 0 ;
        if($cantidadAPedir){
            $consulta= "";
            foreach ($cristalesAPedir as $cristal){
                $consulta=$consulta."UPDATE stock SET aPedir = aPedir + $cristal[1] WHERE cristalID = $cristal[0];";
            }
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC); 
        }

        /* --- Insertar Trabajos --- */
        $valuesTrabajos='';
        foreach ($trabajos as $trabajo){
            $valuesTrabajos = $valuesTrabajos . '(' .  $trabajo . ', ' . $turnoID . '),';
        }
        $valuesTrabajos = substr($valuesTrabajos , 0, -1);
        $consulta="INSERT INTO trabajoturno (trabajoID, turnoID) VALUES $valuesTrabajos ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        $data=$turnoID;
        break;
    case 3:
        $consulta = "UPDATE turno SET contacto='$contacto', fechaHora='$fechaHora', telefono='$telefono', dominio='$dominio',
        siniestro='$siniestro', observacion='$observacion', esPago='$esPago', tipoPago='$tipoPago', numFactura='$numFactura', modeloID='$modeloID',
        empresaID='$empresaID'
        WHERE idTurno='$idTurno'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        
        if($banderaCristales){
            /* --- Actulizar Cristales --- */
            $valuesCristales='';
            foreach ($cristales as $cristal){
                $valuesCristales = $valuesCristales . '(' .  implode(", ", $cristal) . ', ' . $idTurno . '),';
            }
            $valuesCristales = substr($valuesCristales , 0, -1);
            $consulta = "DELETE FROM turnodetalle WHERE turnoID='$idTurno';
            INSERT INTO turnodetalle (otro, importeSinIva, importeConIva, cantidad, cristalID, esAPedir, turnoID) VALUES $valuesCristales";		
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        };

        if($banderaTrabajos){
            /* --- Actulizar Trabajos --- */
            $valuesTrabajos='';
            foreach ($trabajos as $trabajo){
                $valuesTrabajos = $valuesTrabajos . '(' .  $trabajo . ', ' . $idTurno . '),';
            }
            $valuesTrabajos = substr($valuesTrabajos , 0, -1);
            $consulta = "DELETE FROM trabajoturno WHERE turnoID='$idTurno';
            INSERT INTO trabajoturno (trabajoID, turnoID) VALUES $valuesTrabajos ";		
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        };
        break;
    case 4:
        $consulta = "DELETE FROM turnodetalle WHERE turnoID='$idTurno';
        DELETE FROM trabajoturno WHERE turnoID='$idTurno';
        DELETE FROM archivo WHERE turnoID='$idTurno';
        DELETE FROM turno WHERE idTurno='$idTurno'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);  
        
        /* --- Eliminar aPedir --- */
        $cantidadEliminar = is_array($cristalesEliminar) ? count($cristalesEliminar) : 0 ;
        if($cantidadEliminar){
            $consulta= "";
            foreach ($cristalesEliminar as $cristal){
                $consulta=$consulta."UPDATE stock SET aPedir = aPedir - $cristal[0] WHERE cristalID = $cristal[1];";
            }
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC); 
        }

        break;
    case 5:
        $consulta = "UPDATE turno SET estado='Finalizado' WHERE idTurno='$idTurno'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 6:
        /* --- Turno + Marca + Cristales --- */
        $consulta="SELECT m.marcaID, m.idModelo, m.nombre, t.*, GROUP_CONCAT(c.idCristal) AS idCristales, GROUP_CONCAT(c.codigo) AS codigos, GROUP_CONCAT(c.descripcion) AS descripciones
        FROM turno t
        INNER JOIN modelo m ON m.idModelo = t.modeloID
        INNER JOIN cristal c ON m.idModelo = c.modeloID
        WHERE t.idTurno = $idTurno;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        if(!$data){
            $data=[];
        }

        /* --- Trabajos --- */
        $consulta = "SELECT trabajoID
        FROM trabajoturno 
        WHERE turnoID = $idTurno";
        $resultado2 = $conexion->prepare($consulta);
        $resultado2->execute();
        $data2=$resultado2->fetchAll(PDO::FETCH_ASSOC);
        if(!$data2){
            $data2=[];
        }

        /* --- Turno Detalle --- */
        $consulta="SELECT td.*, c.codigo, c.descripcion FROM turnodetalle td
        INNER JOIN cristal c ON td.cristalID = c.idCristal
        WHERE turnoID = $idTurno";
        $resultado3 = $conexion->prepare($consulta);
        $resultado3->execute();
        $data3=$resultado3->fetchAll(PDO::FETCH_ASSOC);
        if(!$data3){
            $data3=[];
        }

        /* --- Archivos --- */
        $consulta="SELECT *, substring_index(path,'.',-1) AS ext
        FROM archivo a
        WHERE turnoID = $idTurno
        ORDER BY ext='pdf', ext;";
        $resultado4 = $conexion->prepare($consulta);
        $resultado4->execute();
        $data4=$resultado4->fetchAll(PDO::FETCH_ASSOC);
        if(!$data4){
            $data4=[];
        }

        /* --- Modelos --- */
        $consulta="SELECT idModelo, nombre FROM modelo WHERE marcaID =" . $data[0]['marcaID'];
        $resultado5 = $conexion->prepare($consulta);
        $resultado5->execute();
        $data5=$resultado5->fetchAll(PDO::FETCH_ASSOC);
        if(!$data5){
            $data5=[];
        }

        $data=array_merge([$data], [$data2], [$data3], [$data4] , [$data5]);
        break;
    case 7:
        $consulta = "SELECT SUM(td.importeConIva) AS total FROM turno t 
        INNER JOIN turnodetalle td ON t.idTurno = td.turnoID 
        WHERE t.tipoPago = 'Efectivo' AND t.esPago = 'Si' AND t.estado = 'Finalizado' AND MONTH(t.fechaHora) = $mes";
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
        $consulta = "SELECT t.idTurno, t.fechaHora, t.contacto, CONCAT(m.nombre, ' - ', mo.nombre) AS vehiculo, 
        e.nombre AS empresa, GREATEST((DATEDIFF(NOW(),fechaHora) - e.plazoPago)*-1, 0) AS diasRestantes, 
        GREATEST(DATEDIFF(NOW(),fechaHora) - e.plazoPago, 0) AS diasMora, 
        IF(DATEDIFF(NOW(),fechaHora) - e.plazoPago>0, 'En Mora', 'En Proceso') AS estado
        FROM turno t 
        INNER JOIN modelo mo ON mo.idModelo = t.modeloID
        INNER JOIN marca m ON m.idMarca = mo.marcaID
        INNER JOIN empresa e ON e.idEmpresa = t.empresaID
        WHERE t.estado = 'Finalizado' AND t.esPago = 'No';";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 13:
        $consulta = "UPDATE turno SET esPago = 'Si' WHERE idTurno = '$idTurno'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 14:
        $consulta = "SELECT cantidad FROM stock WHERE cristalID = '$cristalID'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;
