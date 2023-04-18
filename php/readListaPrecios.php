<?php
include_once '../database/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
$modelo = str_replace("'", "\'", $modelo);
$cristal = (isset($_POST['cristal'])) ? $_POST['cristal'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
	/*--------------Cargar Tablas--------------*/
    case 1:
		/*$consulta = "SELECT * FROM laCaja";*/
		/* --- Sure / Nacion / Allianz / Mapfre ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 12 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 2:
		/*$consulta = "SELECT * FROM glasscom";*/
		/* --- Comun ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 2 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 3:
		/*$consulta = "SELECT * FROM fedPat";*/
		/* --- FedPat ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 3 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 4:
		/*$consulta = "SELECT * FROM comun";*/
		/* --- La Caja ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 5 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 5:
		/*$consulta = "SELECT * FROM allianzSuraNacionMapfre";*/
		/* --- Sancon - La Segunda ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 6 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 6:
		/*$consulta = "SELECT * FROM laSegundaSancor";*/
		/* --- San Cristobal ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 10 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 7:
		/*$consulta = "SELECT * FROM sanCristobal";*/
		/* --- Glasscom ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 4 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 8:
		/*$consulta = "SELECT * FROM particulares";*/
		/* --- Particulares ---  */
		$consulta = "SELECT m.nombre AS marca, mo.nombre AS modelo, c.*, p.* 
		FROM cristal c
		INNER JOIN modelo mo ON mo.idModelo = c.modeloID
		INNER JOIN marca m ON m.idMarca = mo.marcaID
		INNER JOIN precio p ON c.idCristal = p.cristalID
		INNER JOIN empresaprecio ep ON p.idPrecio = ep.precioID
		WHERE ep.empresaID = 9 AND c.estado = 'Activo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();        
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	/*--------------Cargar Desplegables--------------*/
	//___________La Caja___________//
	case 9:
		$consulta = "SELECT DISTINCT marca FROM laCaja";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 10:
		$consulta = "SELECT DISTINCT modelo FROM laCaja WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 11:
		$consulta = "SELECT DISTINCT cristal FROM laCaja WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________Glasscom___________//
	case 12:
		$consulta = "SELECT DISTINCT marca FROM glasscom";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 13:
		$consulta = "SELECT DISTINCT modelo FROM glasscom WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 14:
		$consulta = "SELECT DISTINCT cristal FROM glasscom WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________Fed Pat___________//
	case 15:
		$consulta = "SELECT DISTINCT marca FROM fedPat";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 16:
		$consulta = "SELECT DISTINCT modelo FROM fedPat WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 17:
		$consulta = "SELECT DISTINCT cristal FROM fedPat WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________Comun___________//
	case 18:
		$consulta = "SELECT DISTINCT marca FROM comun";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 19:
		$consulta = "SELECT DISTINCT modelo FROM comun WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 20:
		$consulta = "SELECT DISTINCT cristal FROM comun WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________ALLIANZ-SURA-NACION-MAPFRE___________//
	case 21:
		$consulta = "SELECT nombre FROM marca";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 22:
		$consulta = "SELECT DISTINCT modelo FROM allianzSuraNacionMapfre WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 23:
		$consulta = "SELECT DISTINCT cristal FROM allianzSuraNacionMapfre WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________LaSegunda-Sancor___________//
	case 24:
		$consulta = "SELECT DISTINCT marca FROM laSegundaSancor";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 25:
		$consulta = "SELECT DISTINCT modelo FROM laSegundaSancor WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 26:
		$consulta = "SELECT DISTINCT cristal FROM laSegundaSancor WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	//___________San Cristobal___________//
	case 27:
		$consulta = "SELECT DISTINCT marca FROM sanCristobal";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 28:
		$consulta = "SELECT DISTINCT modelo FROM sanCristobal WHERE marca='$marca'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	case 29:
		$consulta = "SELECT DISTINCT cristal FROM sanCristobal WHERE modelo='$modelo'";
		$resultado = $conexion->prepare($consulta);
		$resultado->execute();
		$data=$resultado->fetchAll(PDO::FETCH_ASSOC);
		break;
	/*--------------Filtrar Tablas--------------*/
	//___________La Caja___________//
	case 30:
        $consulta = "SELECT * FROM laCaja WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 31:
        $consulta = "SELECT * FROM laCaja WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 32:
        $consulta = "SELECT * FROM laCaja WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    //___________Glasscom___________//
	case 33:
        $consulta = "SELECT * FROM glasscom WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 34:
        $consulta = "SELECT * FROM glasscom WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 35:
        $consulta = "SELECT * FROM glasscom WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    //___________Fed Pat___________//
	case 36:
        $consulta = "SELECT * FROM fedPat WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 37:
        $consulta = "SELECT * FROM fedPat WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 38:
        $consulta = "SELECT * FROM fedPat WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break; 
    //___________Comun___________//
	case 39:
        $consulta = "SELECT * FROM comun WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 40:
        $consulta = "SELECT * FROM comun WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 41:
        $consulta = "SELECT * FROM comun WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    //___________ALLIANZ-SURA-NACION-MAPFRE___________//
	case 42:
        $consulta = "SELECT * FROM allianzSuraNacionMapfre WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 43:
        $consulta = "SELECT * FROM allianzSuraNacionMapfre WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 44:
        $consulta = "SELECT * FROM allianzSuraNacionMapfre WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break; 
    //___________LaSegunda-Sancor___________//
	case 45:
        $consulta = "SELECT * FROM laSegundaSancor WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 46:
        $consulta = "SELECT * FROM laSegundaSancor WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 47:
        $consulta = "SELECT * FROM laSegundaSancor WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    //___________San Cristobal___________//
	case 48:
        $consulta = "SELECT * FROM sanCristobal WHERE marca='$marca'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 49:
        $consulta = "SELECT * FROM sanCristobal WHERE marca='$marca' AND modelo='$modelo'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 50:
        $consulta = "SELECT * FROM sanCristobal WHERE marca='$marca' AND modelo='$modelo' AND cristal='$cristal'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion=null;
?>