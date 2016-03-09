 <?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

/* Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo.*/

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

// Consulta SQL para obtener los datos de los vehiculos
//$sql = "SELECT Matricula, NIF, Nombre, Telefono, Marca, Modelo FROM vehiculos V,marcas M ,modelos MO WHERE V.idmodelo = MO.idmodelo and M.idmarca = MO.idmarca ";
$sql=$_REQUEST['datos'];
$resultados = mysql_query($sql, $conexion) or die(mysql_error());
$contador=mysql_num_rows($resultados);

if($contador>0)
{
		while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
		    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
		    $datos[] = $fila;
		}
}else{

	$mensaje='NO HAY DATOS CON ESTOS REQUISITOS';
	$error = true;
	$datos = array($error,$mensaje);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysql_close($conexion);

?> 