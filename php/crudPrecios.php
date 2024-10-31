<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

if (isset($_FILES['archivoListaPrecio']) && $_FILES['archivoListaPrecio']['error'] == UPLOAD_ERR_OK) {

$idListaPrecio = (isset($_POST['listaPrecio'])) ? $_POST['listaPrecio'] : '';
//$listaPrecios = (isset($_FILES['listaPrecio']) && $_FILES['listaPrecio']['error'] == 0) ? $_FILES['listaPrecio']['tmp_name'] : '';
$listaPrecios =  fopen($_FILES['archivoListaPrecio']['tmp_name'], 'r');
$listaCristalesPrecio = [];
$arrayErrores = [];
$arrayArchivos = [];
$arrayArchivo = [];
$data = [[],[]];
$errores = $data[0];
$archivos = $data[1];

$consultaPrecio = "SELECT c.idCristal, c.codigo FROM precio p
INNER JOIN cristal c ON c.idCristal = p.cristalID
WHERE listaPrecioID = '$idListaPrecio';";
$resultadoPrecio = $conexion->prepare($consultaPrecio);
$resultadoPrecio->execute();
$dataPrecio=$resultadoPrecio->fetchAll(PDO::FETCH_ASSOC);

$consultaCristal = "SELECT idCristal, codigo FROM cristal;";
$resultadoCristal = $conexion->prepare($consultaCristal);
$resultadoCristal->execute();
$dataCristal=$resultadoCristal->fetchAll(PDO::FETCH_ASSOC);

$consultaMarca = "SELECT idMarca, nombre AS marca FROM marca; ";
$resultadoMarca = $conexion->prepare($consultaMarca);
$resultadoMarca->execute();
$dataMarca=$resultadoMarca->fetchAll(PDO::FETCH_ASSOC);

$consultaModelo = "SELECT mo.idModelo, mo.nombre AS modelo, ma.idMarca, ma.nombre AS marca FROM modelo mo 
    INNER JOIN marca ma ON ma.idMarca = mo.marcaID;";
$resultadoModelo = $conexion->prepare($consultaModelo);
$resultadoModelo->execute();
$dataModelo=$resultadoModelo->fetchAll(PDO::FETCH_ASSOC);

$arrayCristalesBD = array_map(function($dataCristal) {
    return [
        'idCristal' => $dataCristal['idCristal'],
        'codigo' => $dataCristal['codigo']
    ];
}, $dataCristal);

$arrayPreciosBD = array_map(function($dataPrecio) {
    return [
        'idCristal' => $dataPrecio['idCristal'],
        'codigo' => $dataPrecio['codigo']
    ];
}, $dataPrecio);

// Leer el archivo CSV
//["ROVER","789721VSTU","FREELANDER","C.I.FREELANDER 3P 97","Custodia\/Coleta","Delantera","Izquierdo","Verde","150540.38","29023.73","179564.11"]
//Marca, Codigo, Modelo, Descripcion, Tipo, Posicion, Lado, Color, Precio S/IVA, Instalacion S/IVA, Total S/IVA

while (($fila = fgetcsv($listaPrecios)) !== FALSE) {
    // Asumiendo que el CSV tiene columnas: [id_cristal, precio]
    $cristalPrecio = [
        'marca' => $fila[0],
        'codigo' => $fila[1],
        'modelo' => $fila[2],
        'descripcion' => $fila[3],
        'tipo' => $fila[4],
        'posicion' => $fila[5],
        'lado' => $fila[6],
        'color' => $fila[7],
        'precioSIVA' => $fila[8],
        'instalacionSIVA' => $fila[9],
        'totalSIVA' => $fila[10],
    ];
    array_push($listaCristalesPrecio, $cristalPrecio);
}

$arrayCristalesActuales = array_map(function($e) use ($arrayCristalesBD) {
    // Verificar si el código existe en el array de cristales de la BD
    foreach ($arrayCristalesBD as $obj) {
        if ($e['codigo'] == $obj['codigo']) {
            return [
                'codigo' => $e['codigo'],
                'precioSIVA' => $e['precioSIVA'],
                'instalacionSIVA' => $e['instalacionSIVA'],
                'totalSIVA' => $e['totalSIVA'],
                'totalCIVA' => $e['totalSIVA'] * 1.21
            ];
        }
    }
    return null; // Si no se encuentra, retornar null (será eliminado por array_filter)
}, $listaCristalesPrecio);

// Eliminar los elementos nulos del resultado
$arrayCristalesActuales = array_filter($arrayCristalesActuales);

$arrayCristalesDescontinuados = array_filter($arrayPreciosBD, function($object) use ($listaCristalesPrecio) {
    return !in_array($object['codigo'], array_column($listaCristalesPrecio, 'codigo'));
});

$arrayCristalesPreciosNuevos = array_map(function($e) {
    return [
        'codigo' => trim((string) $e['codigo']),
        'descripcion' => $e['descripcion'],
        'tipo' => $e['tipo'],
        'posicion' => $e['posicion'],
        'lado' => $e['lado'],
        'color' => $e['color'],
        'modelo' => trim((string) $e['modelo']),
        'marca' => trim((string) $e['marca']),
        'precioSIVA' => $e['precioSIVA'],
        'instalacionSIVA' => $e['instalacionSIVA'],        
        'totalSIVA' => $e['totalSIVA'],
        'totalCIVA' => $e['totalSIVA'] * 1.21
    ];
}, array_filter($listaCristalesPrecio, function($object) use ($arrayCristalesBD) {
    return !in_array($object['codigo'], array_column($arrayCristalesBD, 'codigo'));
}));

$arrayListaPreciosNuevos = array_map(function($e) {
    return [
        'codigo' => trim((string) $e['codigo']),
        'precioSIVA' => $e['precioSIVA'],
        'instalacionSIVA' => $e['instalacionSIVA'],        
        'totalSIVA' => $e['totalSIVA'],
        'totalCIVA' => $e['totalSIVA'] * 1.21
    ];
}, array_filter($listaCristalesPrecio, function($object) use ($arrayPreciosBD) {
    return !in_array($object['codigo'], array_column($arrayPreciosBD, 'codigo'));
}));

$arrayMarcasNuevas = array_map(function($e) {
    return $e['marca'];
}, array_filter($arrayCristalesPreciosNuevos, function($object) use ($dataMarca) {
    return !in_array($object['marca'], array_column($dataMarca, 'marca'));
}));

$arrayMarcasNuevasUnicas = array_map(function($e) {
    return [strval($e)];
}, array_values(array_unique($arrayMarcasNuevas)));

if (count($arrayMarcasNuevasUnicas) > 0) {
    $marcasTotales = cargarMarcas($arrayMarcasNuevasUnicas, $conexion);
} else {
    $marcasTotales = $dataMarca;
}

$arrayModelosNuevos = array_map(function($e) {
    return ['nombre' => $e['modelo'], 'marca' => $e['marca']];
}, array_filter($arrayCristalesPreciosNuevos, function($object) use ($dataModelo) {
    return !in_array($object['modelo'], array_column($dataModelo, 'modelo'));
}));

$arrayModelosNuevosUnicos = [];
$uniqueModels = [];

foreach ($arrayModelosNuevos as $modelo) {
    $key = $modelo['nombre'] . '-' . $modelo['marca']; // Crear una clave única para cada combinación
    if (!isset($uniqueModels[$key])) {
        $uniqueModels[$key] = true; // Marcar la combinación como vista
        $arrayModelosNuevosUnicos[] = $modelo; // Agregar el modelo único a la lista
    }
}

$arrayModelosMarcas = array_map(function($modelo) use ($marcasTotales) {
    $marca = current(array_filter($marcasTotales, function($m) use ($modelo) {
        return $m['marca'] === $modelo['marca'];
    }));
    return [$modelo['nombre'], $marca['idMarca']];
}, $arrayModelosNuevosUnicos);

if (count($arrayModelosMarcas) > 0) {
    $modelosTotales = cargarModelos($arrayModelosMarcas, $conexion);
} else {
    $modelosTotales = $dataModelo;
}

$arrayCristalesNuevos = array_map(function($e) {
    return [
        'codigo' => $e['codigo'],
        'descripcion' => $e['descripcion'],
        'tipo' => $e['tipo'],
        'posicion' => $e['posicion'],
        'lado' => $e['lado'],
        'color' => $e['color'],
        'modelo' => $e['modelo']
    ];
}, $arrayCristalesPreciosNuevos);

$arrayCristalesModelos = array_map(function($cristal) use ($modelosTotales) {
    $modelo = current(array_filter($modelosTotales, function($m) use ($cristal) {
        return $m['modelo'] === $cristal['modelo'];
    }));
    return [$cristal['codigo'], $cristal['descripcion'], $cristal['tipo'], $cristal['posicion'], $cristal['lado'], $cristal['color'], $modelo['idModelo']];
}, $arrayCristalesNuevos);

$arrayPreciosNuevos = [];
$arrayPreciosNuevosCristalesExistentes = [];
$cristalesTotales = [];

//CRISTALES NUEVOS TOTALMENTE EN LA BD Y POR ENDE NUEVOS PRECIOS
if (count($arrayCristalesModelos) > 0) {
    $cristalesTotales = cargarCristales($arrayCristalesModelos, $conexion);

    $arrayPreciosNuevos = array_map(function($e) {
        return [
            'codigo' => $e['codigo'],
            'precioSIVA' => $e['precioSIVA'],
            'instalacionSIVA' => $e['instalacionSIVA'],
            'totalSIVA' => $e['totalSIVA'],
            'totalCIVA' => $e['totalCIVA']
        ];
    }, $arrayCristalesPreciosNuevos);
} 

if(count($cristalesTotales) == 0){
    $cristalesTotales = $arrayCristalesBD;
}

//PRECIOS NUEVOS PARA LA LISTA DE PRECIOS SELECIONADA (QUE PUEDEN SER CRISTALES NUEVOS O NO)
if(count($arrayListaPreciosNuevos) > 0 ){
    $arrayPreciosNuevosCristalesExistentes = array_map(function($e) {
        return [
            'codigo' => $e['codigo'],
            'precioSIVA' => $e['precioSIVA'],
            'instalacionSIVA' => $e['instalacionSIVA'],
            'totalSIVA' => $e['totalSIVA'],
            'totalCIVA' => $e['totalCIVA']
        ];
    }, $arrayListaPreciosNuevos);
}

//JUTAMOS LOS DOS ARRAYS (USAMOS EL UNIQUE EN CASO DE QUE OCURRAN AMBOS ESCENARIOS)
$arrayPreciosNuevosFinal = array_unique(array_merge($arrayPreciosNuevos, $arrayPreciosNuevosCristalesExistentes), SORT_REGULAR);

$arrayPreciosCristales = array_map(function($precio) use ($cristalesTotales, $idListaPrecio) {
    $cristal = current(array_filter($cristalesTotales, function($c) use ($precio) {
        return $c['codigo'] === $precio['codigo'];
    }));
    return [$precio['precioSIVA'], $precio['instalacionSIVA'], $precio['totalSIVA'], $precio['totalCIVA'], 'Activo', $cristal['idCristal'], $idListaPrecio];
}, $arrayPreciosNuevosFinal);

$preciosTotales = cargarPrecios($arrayPreciosCristales, $conexion);

// Actualizar el precio
cristalesActualizar($arrayCristalesActuales, $idListaPrecio, $conexion);

// Cambiar el estado a Baja
cristalesBaja($arrayCristalesDescontinuados, $idListaPrecio, $conexion);

$info = [
    "marcasNuevas" => $arrayMarcasNuevasUnicas,
    "modelosNuevos" => $arrayModelosNuevosUnicos,
    "cristalesNuevos" => array_values($arrayCristalesNuevos),
    "cristalesBaja" => array_values($arrayCristalesDescontinuados)
];

print json_encode($info, JSON_UNESCAPED_UNICODE);

}


function cargarMarcas($arrayMarcasNuevasUnicas, $conexion){
    try {
        // Iniciar transacción
        $conexion->beginTransaction();
    
        // Preparar y ejecutar la inserción de nuevas marcas
        $stmtInsert = $conexion->prepare("INSERT INTO marca (nombre) VALUES (?)");
        foreach ($arrayMarcasNuevasUnicas as $marca) {
            $stmtInsert->execute($marca);
        }
    
        // Consultar las marcas insertadas y otras marcas de la tabla
        $stmtSelect = $conexion->query("SELECT idMarca, nombre AS marca FROM marca");
        $results = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);
    
        // Confirmar transacción
        $conexion->commit();
    
        return $results;
    } catch (Exception $error) {
        // Revertir transacción en caso de error
        $conexion->rollBack();
        error_log("Error: " . $error->getMessage());
    }
};

function cargarModelos($arrayModelosMarcas, $conexion){
    try {
        // Iniciar transacción
        $conexion->beginTransaction();
    
        // Preparar y ejecutar la inserción de nuevas marcas
        $stmtInsert = $conexion->prepare("INSERT INTO modelo (nombre, marcaID) VALUES (?, ?)");
        foreach ($arrayModelosMarcas as $modelo) {
            $stmtInsert->execute([$modelo[0], $modelo[1]]);
        }
    
        // Consultar las marcas insertadas y otras marcas de la tabla
        $stmtSelect = $conexion->query("SELECT idModelo, nombre AS modelo FROM modelo");
        $results = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);
    
        // Confirmar transacción
        $conexion->commit();
    
        return $results;
    } catch (Exception $error) {
        // Revertir transacción en caso de error
        $conexion->rollBack();
        error_log("Error: " . $error->getMessage());
    }
};

function cargarCristales($arrayCristalesModelos, $conexion){
    try {
        // Iniciar transacción
        $conexion->beginTransaction();
    
        // Preparar y ejecutar la inserción de nuevas marcas
        $stmtInsert = $conexion->prepare("INSERT INTO cristal (codigo, descripcion, tipo, posicion, lado, color, modeloID) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($arrayCristalesModelos as $cristal) {
            $stmtInsert->execute([$cristal[0], $cristal[1], $cristal[2], $cristal[3], $cristal[4], $cristal[5], $cristal[6]]);
        }
    
        // Consultar las marcas insertadas y otras marcas de la tabla
        $stmtSelect = $conexion->query("SELECT idCristal, codigo FROM cristal");
        $results = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);
    
        // Confirmar transacción
        $conexion->commit();
    
        return $results;
    } catch (Exception $error) {
        // Revertir transacción en caso de error
        $conexion->rollBack();
        error_log("Error: " . $error->getMessage());
    }
};

function cargarPrecios($arrayPreciosCristales, $conexion){
    try {
        // Iniciar transacción
        $conexion->beginTransaction();
    
        // Preparar y ejecutar la inserción de nuevas marcas
        $stmtInsert = $conexion->prepare("INSERT INTO precio (precioSinIva, instalacionSinIva, totalSinIva, totalConIva, estado, cristalID, listaPrecioID) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($arrayPreciosCristales as $precio) {
            $stmtInsert->execute([$precio[0], $precio[1], $precio[2], $precio[3], $precio[4], $precio[5], $precio[6]]);
        }
    
        // Confirmar transacción
        $conexion->commit();
    
        return 200;
    } catch (Exception $error) {
        // Revertir transacción en caso de error
        $conexion->rollBack();
        error_log("Error: " . $error->getMessage());
    }
};

function cristalesActualizar($arrayCristalesActuales, $idListaPrecio, $conexion){
    try {
        // Iniciar una transacción
        $conexion->beginTransaction();
    
        foreach ($arrayCristalesActuales as $cristal) {
            // Actualizar `precio` y `cristal` con el `idAseguradoraZona`
            $stmtUpdate = $conexion->prepare("
                UPDATE precio p 
                INNER JOIN cristal c ON c.idCristal = p.cristalID 
                SET p.precioSinIva = ?, p.instalacionSinIva = ?, p.totalSinIva = ?, p.totalConIva = ?, p.estado = 'Activo' 
                WHERE c.codigo = ? AND p.listaPrecioID = ?
            ");
            $stmtUpdate->execute([$cristal['precioSIVA'], $cristal['instalacionSIVA'], $cristal['totalSIVA'], $cristal['totalCIVA'], $cristal['codigo'], $idListaPrecio]);
        }
    
        // Confirmar la transacción
        $conexion->commit();
        return 200;
    
    } catch (Exception $error) {
        // Revertir transacción en caso de error
        $conexion->rollBack();
        error_log("Error: " . $error->getMessage());
        return "error";
    }
    
};

function cristalesBaja($arrayCristalesDescontinuados, $idListaPrecio, $conexion){
    $array = [];
    foreach ($arrayCristalesDescontinuados as $element) {
        $array[] = $element['idCristal'];
    }

    try {
        // Preparar consulta con placeholders para la cláusula IN
        $idCristales = implode(',', array_fill(0, count($array), '?'));
        $stmt = $conexion->prepare("UPDATE precio SET estado = 'Baja' WHERE cristalID IN ($idCristales) AND listaPrecioID = '$idListaPrecio'");
        
        // Ejecutar consulta con los valores del array
        $stmt->execute($array);

        // Devolver éxito
        return 200;
    } catch (Exception $error) {
        error_log("Error: " . $error->getMessage());
        return "error";
    }

};

fclose($listaPrecios);
$conexion=null;
?>


