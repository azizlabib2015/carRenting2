<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "carrenting";
$usuario   = "root";
$password  = "";

$cliente=$_REQUEST['selectClienteAlquiler'];
$matricula=$_REQUEST['selectVehiculoAlquiler'];
$fSal=$_REQUEST['fechaSalidaAlt'];
$fEntr=$_REQUEST['fechaEntradaAlt'];
$importe=floatval($_REQUEST['precio']);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$consulta = "INSERT into ALQUILER (idCliente, matricula, FechaSalida, FechaEntrada, importe) values('$cliente','$matricula','$fSal','$fEntr',$importe)";

/* ejecutar la consulta */
$resultado=mysql_query($consulta,$conexion);

/*Comprobacion OK insert*/
if ($resultado) {
	$mensaje='INSERTADO CON EXITO';
	$error = false;
} else {
	$mensaje= 'Error';
	$error = true;
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);
mysql_close($conexion);

?> 