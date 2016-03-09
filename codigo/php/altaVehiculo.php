<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "carrenting";
$usuario   = "root";
$password  = "";


$oMatricula =$_REQUEST['txtMatricula'];
$oMarca =$_REQUEST['txtMarca'];
$oModelo =$_REQUEST['txtModelo'];
$oCombustible =$_REQUEST['combustible'];
$oTipo =$_REQUEST['tipo'];
$oSeguro =$_REQUEST['seguro'];
$oTarifa =$_REQUEST['tarifa'];

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
	$mensaje= 'YA EXISTE ESE VEHICULO';
	$error = true;

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = false;

	$sql = "insert into vehiculo (Matricula,Marca,Modelo,TipoCombustible, Tipo, IdSeguro, IdTarifa) VALUES 
	('$oMatricula','$oMarca','$oModelo','$oCombustible','$oTipo','$oSeguro','$oTarifa')";

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 