<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$idTurno = (isset($_POST['idTurno'])) ? $_POST['idTurno'] : '';
$fechaHora = (isset($_POST['fechaHora'])) ? $_POST['fechaHora'] : '';
$franjaHoraria = (isset($_POST['franjaHoraria'])) ? $_POST['franjaHoraria'] : '';
$contacto = (isset($_POST['contacto'])) ? $_POST['contacto'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$dominio = (isset($_POST['dominio'])) ? $_POST['dominio'] : '';
$empresaID = (isset($_POST['empresaID'])) ? $_POST['empresaID'] : '';
$trabajos = (isset($_POST['trabajo'])) ? $_POST['trabajo'] : '';
$importeTrabajo = (isset($_POST['importeTrabajo'])) ? $_POST['importeTrabajo'] : '';
$siniestro = (isset($_POST['siniestro'])) ? $_POST['siniestro'] : '';
$observacion = (isset($_POST['observacion'])) ? $_POST['observacion'] : '';
$esPago = (isset($_POST['esPago'])) ? $_POST['esPago'] : '';
$tipoPago = (isset($_POST['tipoPago'])) ? $_POST['tipoPago'] : '';
$fechaPago = (isset($_POST['fechaPago'])) ? $_POST['fechaPago'] : '';
$numFactura = (isset($_POST['numFactura'])) ? $_POST['numFactura'] : '';
$fechaEntrega = (isset($_POST['fechaEntrega'])) ? $_POST['fechaEntrega'] : '';
$empleadoID = (isset($_POST['empleadoID'])) ? $_POST['empleadoID'] : '';
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
$arrayIdTurnos = (isset($_POST['arrayIdTurnos'])) ? $_POST['arrayIdTurnos'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1:
        $consulta = "SELECT t.idTurno, DATE(t.fechaHora) AS fecha, t.franjaHoraria, DATE_FORMAT(t.fechaHora, '%H:%i') AS hora, t.contacto, 
            t.telefono, t.dominio, CONCAT(ma.nombre, ' - ', mo.nombre) AS vehiculo, GROUP_CONCAT(tr.nombre) AS trabajos, 
            e.nombre AS empresa, t.esPago, t.tipoPago, t.siniestro, t.numFactura, t.estado, em.nombre AS empleado
            FROM turno t 
            INNER JOIN modelo mo ON mo.idModelo = t.modeloID 
            INNER JOIN marca ma ON ma.idMarca = mo.marcaID 
            INNER JOIN trabajoturno trt ON trt.turnoID = t.idTurno 
            INNER JOIN trabajo tr ON trt.trabajoID = tr.idTrabajo 
            INNER JOIN empresa e ON e.idEmpresa = t.empresaID 
            INNER JOIN empleado em ON em.idEmpleado = t.empleadoID
            WHERE t.estado = 'Activo' OR t.estado = 'Finalizado'
            GROUP BY t.idTurno 
            ORDER BY t.fechaHora DESC;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $turno=$resultado->fetchAll(PDO::FETCH_ASSOC); 
        $consulta = "SELECT t.idTurno, GROUP_CONCAT(td.esAPedir) AS esAPedir
            FROM turno t 
            INNER JOIN turnodetalle td ON t.idTurno = td.turnoID
            GROUP BY t.idTurno 
            ORDER BY t.fechaHora DESC;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $aPedir=$resultado->fetchAll(PDO::FETCH_ASSOC);
        
        /* --- Matchear Turno con APedir --- */
        foreach ($turno as &$t) {
            foreach ($aPedir as $a) {
                if ($t['idTurno'] === $a['idTurno']) {
                    $t['esAPedir'] = $a['esAPedir'];
                    break; // Opcional, si asumes que no habrá duplicados
                }else {
                    $t['esAPedir'] = '';
                }
            }
        }
        $data=$turno;      
        break;    
    case 2:
        /* --- Insertar Turno --- */
        $consulta = "INSERT INTO turno 
        (fechaHora, franjaHoraria, contacto, telefono, dominio, siniestro, observacion, esPago, tipoPago, fechaPago, numFactura, importeTrabajo, fechaEntrega, estado, modeloID, empresaID, empleadoID) 
        VALUES('$fechaHora', '$franjaHoraria', '$contacto', '$telefono', '$dominio', '$siniestro', '$observacion', '$esPago', '$tipoPago', '$fechaPago', '$numFactura', '$importeTrabajo', '$fechaEntrega', 'Activo', '$modeloID', '$empresaID', '$empleadoID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $turnoID=$conexion->lastInsertId();

        /* --- Insertar Cristales --- */
        if($cristales){
            $valuesCristales='';
            foreach ($cristales as $cristal){
                $valuesCristales = $valuesCristales . '(' .  implode(", ", $cristal) . ', ' . $turnoID . '),';
            }
            $valuesCristales = substr($valuesCristales , 0, -1);
            $consulta="INSERT INTO turnodetalle (otro, importeSinIva, importeConIva, cantidad, cristalID, esAPedir, turnoID) VALUES $valuesCristales ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        }

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
        $consulta = "SELECT estado FROM turno WHERE idTurno ='$idTurno'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $estadoTurno=$resultado->fetchAll(PDO::FETCH_ASSOC);
        
        if ($estadoTurno[0]["estado"] == "Finalizado"){
            $consulta = "UPDATE turno SET siniestro='$siniestro', observacion='$observacion', esPago='$esPago', tipoPago='$tipoPago', 
            fechaPago='$fechaPago', numFactura='$numFactura', importeTrabajo='$importeTrabajo', fechaEntrega='$fechaEntrega', empleadoID='$empleadoID'
            WHERE idTurno='$idTurno'";
            
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        } elseif ($estadoTurno[0]["estado"] == "Activo") {
            $consulta = "UPDATE turno SET contacto='$contacto', fechaHora='$fechaHora', franjaHoraria='$franjaHoraria', telefono='$telefono', dominio='$dominio',
            siniestro='$siniestro', observacion='$observacion', esPago='$esPago', tipoPago='$tipoPago', fechaPago='$fechaPago', numFactura='$numFactura', importeTrabajo='$importeTrabajo', fechaEntrega='$fechaEntrega', modeloID='$modeloID',
            empresaID='$empresaID', empleadoID='$empleadoID'
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

            /* --- Insertar / Actualizar aPedir --- */
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
        }

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
        $consulta = "UPDATE turno SET estado = 'Eliminado' WHERE idTurno='$idTurno'";
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
        $consulta = "UPDATE turno SET estado='Finalizado' WHERE idTurno='$idTurno';";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT cantidad, cristalID FROM turnodetalle WHERE turnoID='$idTurno';";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        if($data){
            $consulta= "";
            foreach ($data as $cristal){
                $consulta=$consulta."UPDATE stock SET cantidad = GREATEST(cantidad - ". $cristal['cantidad'] . ", 0) WHERE cristalID = ". $cristal['cristalID']. "; ";
            }
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        }
        break;
    case 6:
        /* --- Turno + Marca + Cristales --- */
        $consulta="SELECT DISTINCT m.marcaID, m.idModelo, m.nombre, t.*, GROUP_CONCAT(c.idCristal) AS idCristales, GROUP_CONCAT(c.codigo) AS codigos, GROUP_CONCAT(c.descripcion) AS descripciones, GROUP_CONCAT(td.esApedir) AS aPedir
        FROM turno t
        LEFT JOIN turnodetalle td ON t.idTurno = td.turnoID
        INNER JOIN modelo m ON m.idModelo = t.modeloID
        INNER JOIN cristal c ON m.idModelo = c.modeloID
        WHERE t.idTurno = $idTurno";
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
        /*$consulta = "SELECT SUM(td.importeConIva) AS total FROM turno t 
        INNER JOIN turnodetalle td ON t.idTurno = td.turnoID 
        WHERE t.tipoPago = 'Efectivo' AND t.esPago = 'Si' AND t.estado = 'Finalizado' AND MONTH(t.fecha) = $mes";*/
        $consulta = "SELECT (SUM(td.importeConIva) + SUM(t.importeTrabajo)) AS total FROM turno t 
        LEFT JOIN turnodetalle td ON t.idTurno = td.turnoID 
        WHERE t.tipoPago = 'Efectivo' AND t.esPago = 'Si' AND t.estado = 'Finalizado' AND MONTH(t.fechaHora) = $mes;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 8:
        $consulta = "SELECT * FROM modelo WHERE marcaID='$marcaID' ORDER BY nombre;";
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
        INNER JOIN listaprecio lp ON lp.idListaPrecio = p.listaPrecioID
        INNER JOIN empresa e ON lp.idListaPrecio = e.listaPrecioID
        WHERE (p.cristalID = '$cristalID') AND (e.idEmpresa = '$empresaID');";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11:
        $consulta = "SELECT p.totalSinIva, p.totalConIva, p.cristalID FROM precio p 
        INNER JOIN listaprecio lp ON lp.idListaPrecio = p.listaPrecioID
        INNER JOIN empresa e ON lp.idListaPrecio = e.listaPrecioID
        WHERE p.cristalID IN ($idCristales) AND (e.idEmpresa = '$empresaID');";
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
    case 15:
        $consulta = "SELECT t.idTurno, t.fechaHora, t.franjaHoraria, t.contacto, t.telefono, t.dominio, e.nombre AS empresa, 
        GROUP_CONCAT(tr.nombre SEPARATOR '\n') AS trabajos
        FROM turno t
        INNER JOIN empresa e ON e.idEmpresa = t.empresaID
        INNER JOIN trabajoturno tt ON t.idTurno = tt.turnoID
        INNER JOIN trabajo tr ON tr.idTrabajo = tt.trabajoID
        WHERE idTurno IN ($arrayIdTurnos) AND t.estado != 'Finalizado'
        GROUP BY t.idTurno
        ORDER BY t.fechaHora";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        if(!$data){
            $data=[];
        }

        $consulta = "SELECT t.idTurno, GROUP_CONCAT(c.codigo SEPARATOR '\n') AS codigos,
        GROUP_CONCAT(c.descripcion SEPARATOR '\n') AS descripciones, GROUP_CONCAT(c.lado SEPARATOR '\n') AS posiciones,
        GROUP_CONCAT(c.lado SEPARATOR '\n') AS lados, GROUP_CONCAT(c.color SEPARATOR '\n') AS colores
        FROM turno t
        LEFT JOIN turnodetalle td ON t.idTurno = td.turnoID
        LEFT JOIN cristal c ON c.idCristal = td.cristalID
        WHERE idTurno IN ($arrayIdTurnos) AND t.estado != 'Finalizado'
        GROUP BY t.idTurno
        ORDER BY t.fechaHora";
        $resultado2 = $conexion->prepare($consulta);
        $resultado2->execute();
        $data2=$resultado2->fetchAll(PDO::FETCH_ASSOC);
        if(!$data2){
            $data2=[];
        }
        $data=array_merge([$data], [$data2]);
        break;
    case 16:
        $consulta = "SELECT * FROM marca ORDER BY nombre;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 17:
        $consulta = "SELECT * FROM empresa ORDER BY nombre;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 18:
        $consulta = "SELECT * FROM listaprecio";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 19:
        $consulta = "SELECT * FROM empleado";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;