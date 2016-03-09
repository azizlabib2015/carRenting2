<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "carrenting";
$usuario   = "root";
$password  = "";


$oMatricula =$_REQUEST['selectVehiculo2'];
$oMarca =$_REQUEST['txtMarca2'];
$oModelo =$_REQUEST['txtModelo2'];
$oCombustible =$_REQUEST['combustible2'];
$oTipo =$_REQUEST['tipo2'];
$oSeguro =$_REQUEST['seguro2'];
$oTarifa =$_REQUEST['tarifa2'];

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);
// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

$sql = "select Matricula from vehiculo where Matricula = '".$oMatricula."' ";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());


$contador=mysql_num_rows($resultados);

if($contador>0)
{

	$mensaje='MODIFICADO CON EXITO';
	$error = false;

	$sql="UPDATE vehiculo SET Marca='$oMarca',Modelo='$oModelo',TipoCombustible='$oCombustible',Tipo='$oTipo',IdSeguro='$oSeguro',IdTarifa='$oTarifa'
	 WHERE Matricula = '$oMatricula'";

	

}
else
{
$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	$mensaje= 'NO EXISTE ESE VEHICULO';
	$error = true;	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 