//--------------------------------------------------------------------------------------------------------------------
//azizz
//--------------------------------------------------------------------------------------------------------------------
// Objeto Vehiculo
function Vehiculo(matricula,idSeguro,marca,modelo,tipoCombustible,tipo,idTarifa){
    this.Matricula=matricula;
    this.IdSeguro=idSeguro;
	this.Marca = marca;
	this.Modelo=modelo;
	this.TipoCombustible = tipoCombustible;
	this.Tipo = tipo;
	this.IdTarifa = idTarifa;
}

Vehiculo.prototype.constructor = Vehiculo;

//--------------------------------------------------------------------------------------------------
// Objeto seguro
function Seguro(idSeguro,descripcion,precio){
    this.IdSeguro=idSeguro;
	this.Descripcion = descripcion;
	this.Precio=precio;
	
}
Seguro.prototype.constructor = Seguro;

//--------------------------------------------------------------------------------------------------------------------
//daniel
//--------------------------------------------------------------------------------------------------------------------

//Prototype Cliente
function Cliente (idCliente, nombre, telefono, email, direccion) {
	this.idCliente = idCliente;
	this.nombre = nombre;
	this.telefono = telefono;
	this.email = email;
	this.direccion = direccion;
}

//Prototype Tarifa
function Tarifa (idTarifa, tipoVehiculo, importe) {
	this.idTarifa = idTarifa;
	this.tipoVehiculo = tipoVehiculo;
	this.importe = importe;
}

//Prototype Alquiler
function Alquiler (id,idCliente, matricula, fechaEntrada, fechaSalida, importe) {
	this.idAlquiler = id;
	this.idCliente = idCliente;
	this.matricula = matricula;
	this.fechaEntrada = fechaEntrada;
	this.fechaSalida = fechaSalida;
	this.kmsIniciales = kmsIniciales;
	this.importe = importe;
}


//Prototype CarRenting
function CarRenting () {
	this.vehiculos = new Array();
	this.clientes = new Array();
	this.alquileres = new Array();
	this.tarifas = new Array();
	this.seguros = new Array();
}

//Metodos CarRenting
CarRenting.prototype.buscarCliente = function(idCliente) {
	var aux = null;

	for (var i = 0; i < oCarRenting.clientes.length; i++) {
		if(oCarRenting.clientes[i].idCliente==idCliente){
			aux = oCarRenting.clientes[i];
		}
	}

	return aux;
}

CarRenting.prototype.altaCliente = function(oCliente) {
	var texto;

	if (oCarRenting.buscarCliente(oCliente.idCliente) == null) {

		oCarRenting.clientes.push(oCliente);
		texto = "Alta de cliente exitosa";
		console.log("Alta");

	} else {
		texto = "Ya existe un cliente con ese nif";
		console.log("Existe");
	}

	return texto;
}

CarRenting.prototype.modificarCliente = function (idCliente, nombre, telefono, email, direccion) {
	var cliente = oCarRenting.buscarCliente(idCliente);
	
	var flag = false; //flag para cortar el bucle
	var i = 0;
	while(!flag){
		if (oCarRenting.clientes[i].idCliente == idCliente) {

			oCarRenting.clientes[i].telefono = telefono;
			oCarRenting.clientes[i].email = email;
			oCarRenting.clientes[i].direccion = direccion;
			oCarRenting.clientes[i].nombre = nombre;

			flag = true;
		}
		i++;
	}
	var texto = "Modificacion exitosa";
	console.log("Modificacion cliente " + oCarRenting.clientes[i-1].idCliente);

	return texto;
}

CarRenting.prototype.altaAlquiler = function(oAlquiler) {
	var texto;

	oCarRenting.alquileres.push(oAlquiler);
	texto = "Alta de alquiler exitosa";
	console.log("Alta alquiler " + oAlquiler.idAlquiler);

	return texto;
};

CarRenting.prototype.buscarAlquiler = function(idAlquiler) {
	var aux = null;

	for (var i = 0; i < oCarRenting.alquileres.length; i++) {
		if(oCarRenting.alquileres[i].idAlquiler==idAlquiler){
			aux = oCarRenting.alquileres[i];
		}
	}

	return aux;		
};

//------------------------------------------------------------------------------------------------
  CarRenting.prototype.buscarVehiculo = function(sMatricula) {
	var aux = null;

	for (var i = 0; i < oCarRenting.vehiculos.length; i++) {
		if(oCarRenting.vehiculos[i].Matricula==sMatricula){
			aux = oCarRenting.vehiculos[i];
		}
	}

	return aux;
}

CarRenting.prototype.altaVehiculo = function(oVehiculo) {
	var texto;

	if (oCarRenting.buscarVehiculo(oVehiculo.matricula) == null) {

		oCarRenting.vehiculos.push(oVehiculo);
		texto = "Alta de vehiculo exitosa";
		console.log("Alta");
		alert(oCarRenting.vehiculos[0]);

	} else {
		texto = "Ya existe un vehiculo con ese matricula";
		console.log("Existe");
	}

	return texto;
}

CarRenting.prototype.modificacionVehiculo = function (matricula, idSeguro, marca,modelo,combustible,fadquisicion,numplaza) {
	var texto;

	var cliente = oCarRenting.buscarVehiculo(matricula);
	//if (cliente != null) {
		var flag = false; //flag para cortar el bucle
		var i = 0;
		while(!flag){
			if (oCarRenting.vehiculos[i].Matricula == matricula) {

				oCarRenting.vehiculos[i].IdSeguro =idSeguro;
				oCarRenting.vehiculos[i].Marca = marca;
				oCarRenting.vehiculos[i].Modelo = modelo;
				oCarRenting.vehiculos[i].TipoCombustible = combustible;
				oCarRenting.vehiculos[i].FechaAdquisicion = fadquisicion;
				oCarRenting.vehiculos[i].NumPlazas = numplaza;

				flag = true;
			}
			i++;
		}
		texto = "Modificacion exitosa";
		console.log("Modificacion Vehiculo" + oCarRenting.vehiculos[i-1].Matricula);

	

	return texto;
}
//------------------------------------------------------------------------------------------------
//vehiculo
  CarRenting.prototype.buscarSeguro = function(sIdSeguro) {
	var aux = null;

	for (var i = 0; i < oCarRenting.seguros.length; i++) {
		if(oCarRenting.seguros[i].IdSeguro==sIdSeguro){
			aux = oCarRenting.seguros[i];
		}
	}

	return aux;
}
//------------------------------------------------------------------------------------------------
