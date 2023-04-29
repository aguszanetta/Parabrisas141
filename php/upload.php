<?php
    $nombreHash = array();
    $conteo = count($_FILES["archivos"]["name"]);
    for ($i = 0; $i < $conteo; $i++) {
        $ubicacionTemporal = $_FILES["archivos"]["tmp_name"][$i];
        $nombreArchivo = $_FILES["archivos"]["name"][$i];
        $extension = pathinfo($nombreArchivo, PATHINFO_EXTENSION);
        // Renombrar archivo
        $nuevoNombre = sprintf("%s_%d.%s", uniqid(), $i, $extension);
        $location = "../files/".$nuevoNombre;
        // Mover del temporal al directorio actual
        move_uploaded_file($ubicacionTemporal, $location);
        array_push($nombreHash, $nuevoNombre);
    }
    // Responder al cliente
    echo json_encode($nombreHash);
    exit;
?>