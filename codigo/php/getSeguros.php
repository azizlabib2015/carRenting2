<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
#header('Content-Type: application/json');
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "carrenting";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los seguros
$sql = "SELECT * FROM seguro ORDER BY `IdSeguro` ASC ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$documento = "<seguros>";
while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
   $documento.="<seguro>";
	   $documento.="<idseguro>";
	   		$documento.= $fila['IdSeguro'] ;
	   $documento.="</idseguro>";
	   $documento.="<descripcion>";
	   		$documento.= $fila['Descripcion'] ;
	   $documento.="</descripcion>";
	   $documento.="<precio>";
	   		$documento.= $fila['Precio'] ;
	   $documento.="</precio>";
   $documento.="</seguro>";
}
$documento .= "</seguros>";
 
echo $documento;
mysql_close($conexion);
?> 