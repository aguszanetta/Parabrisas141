<?php
    include_once '../database/conexion.php';
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    $nombreHash = (isset($_POST['nombreHash'])) ? $_POST['nombreHash'] : '';
    $response = "";
    // Responder al cliente
    if(unlink("../files/".$nombreHash)){
        $consulta="DELETE FROM archivo WHERE `path`='$nombreHash'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        $response = "OK";
        echo json_encode($response);
    } else {
        $response = "ERROR";
        echo json_encode($response);
    }
    $conexion=null;
    exit;
?>