<?php
    include_once '../database/conexion.php';
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    $turnoID = (isset($_POST['idTurno'])) ? $_POST['idTurno'] : '';
    //$nombreHash = array();
    $arrayNombres = array();
    $response = array(
        'status' => 0,
        'message' => ""
    );
    $valuesArchivos='';
    $conteo = count($_FILES["archivos"]["name"]);
    for ($i = 0; $i < $conteo; $i++) {
        $ubicacionTemporal = $_FILES["archivos"]["tmp_name"][$i];
        $nombreArchivo = $_FILES["archivos"]["name"][$i];
        $extension = pathinfo($nombreArchivo, PATHINFO_EXTENSION);
        // Renombrar archivo
        $nuevoNombre = sprintf("%s_%d.%s", uniqid(), $i, $extension);
        $location = "../files/".$nuevoNombre;
        // Mover del temporal al directorio actual
        // Valid extensions 
        $valid_extensions = array("pdf", "jpg","jpeg","png");
        if(in_array(strtolower($extension), $valid_extensions)) {
            if(move_uploaded_file($ubicacionTemporal, $location)){
                //array_push($nombreHash, $nuevoNombre);
                array_push($arrayNombres, [$nombreArchivo, $nuevoNombre, $extension]);
                $valuesArchivos = $valuesArchivos . '("' .  $nombreArchivo . '", "'. $nuevoNombre . '", ' . $turnoID . '),';
            }else {
                $response['status'] = 400;
                $response['message'] = "Error";
            }
        } else {
            $response['status'] = 400;
            $response['message'] = "Extension no permitida";
        }
    }

    // Responder al cliente
    if($response['status'] == 400){
        echo json_encode($response['message']);
    } else {
        $valuesArchivos = substr($valuesArchivos , 0, -1);
        $consulta="INSERT INTO archivo (nombre, `path`, turnoID) VALUES $valuesArchivos ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($arrayNombres);
    }
    $conexion=null;
    exit;
?>