<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "carrenting";
$usuario   = "root";
$password  = "";

$datos=$_POST['datos'];

$oCliente = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select idCliente from cliente where idCliente = '".$oCliente->idCliente."' ";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());


$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE CLIENTE';
	$error = true;

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = false;

	$sql = "insert into cliente (idCliente,Nombre,Direccion,Telefono, Email) VALUES ('$oCliente->idCliente','$oCliente->nombre','$oCliente->direccion',$oCliente->telefono,'$oCliente->email')";

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 