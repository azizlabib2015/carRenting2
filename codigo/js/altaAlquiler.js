// Creacion del dialogo

var alquileres;
	
 $("#capaFrmAltaAlquiler").dialog({
 	title: "Alta alquiler",
     autoOpen: true,  // Es el valor por defecto
     modal:true,
     open: antesDeAbrir,
     close: function () { 
     			$("#formAltaAlquiler")[0].reset();
     					},
     closeOnEscape: false, // No se cierra con ESCAPE
     hide: {
         effect: "blind",
         duration: 1000
     },
     show: "blind",
     buttons: [{
         text: "Aceptar",
         click: procesoAltaAlquiler
     }, {
         text: "Cancelar",
         click: function() {
             $(this).dialog("close");
         }
     }]
 });

 $('#fechaSalida').datepicker({
 					minDate: "0d",
 					onSelect: cambiarFechaMinima,
			 		altField : "#fechaSalidaAlt",
  			 		altFormat : $.datepicker.ATOM
  			 		
  				});
 $('#fechaEntrada').datepicker({
			 		altField : "#fechaEntradaAlt",
  			 		altFormat : $.datepicker.ATOM
  				});

function procesoAltaAlquiler(){

	//Validacion del formulario
	if (validarAlquiler()){
		if (!cocheAlquilado($('#selectVehiculoAlquiler').val())) {
			calcularPrecioTotal($('#selectVehiculoAlquiler').val());
			$.ajax({ url : "php/altaAlquiler.php",
					 data: $("#formAltaAlquiler").serialize(),
					 async: true, // Valor por defecto
					 dataType :'json',
					 method: "POST",
					 cache: false, // ya por defecto es false para POST
					 success: tratarRespuestaAltaAlquiler,
					 error :tratarErrorAltaAlquiler
					 });
		} else{
			//mostrar dialog
			$("#capaMensajes").dialog("option","title","Error");
			$("#mensaje").text("Coche Alquilado");
		}
	}
	
}

function tratarRespuestaAltaAlquiler(oArrayRespuesta,sStatus,oXHR){
	if (oArrayRespuesta[0] == true){
		$("#capaMensajes").dialog("option","title","Error");
		$("#mensaje").text(oArrayRespuesta[1]);
	} else {
		$("#capaMensajes").dialog("option","title","OK");
		$("#mensaje").text(oArrayRespuesta[1]);

		$("#capaFrmAltaAlquiler").dialog('close');
	}
}

function tratarErrorAltaAlquiler(oXHR,sStatus,sError){
	alert("sStatus : " + sStatus);
	alert("sError : " + sError);
}

function cambiarFechaMinima(){
  	
	var dtFechaSel = $('#fechaSalida').datepicker('getDate');

	// Cambio de formato a milisegundos
	var iFechaSel =  dtFechaSel.getTime();

	var iFechaMin = iFechaSel + 24 * 60 * 60 * 1000;
	
	var dtFechaMin = new Date(iFechaMin);
	
	$("#fechaEntrada").datepicker("option","minDate",dtFechaMin);
	formAltaAlquiler.fechaEntrada.disabled = false;	
  	
}

function antesDeAbrir(){
	formAltaAlquiler.fechaEntrada.disabled = true;
	formAltaAlquiler.fechaEntrada.readOnly = "readonly";
	formAltaAlquiler.fechaSalida.readOnly = "readonly";
	// Cargar combo ubicaciones
	 $.get('php/getVehiculos.php',null,tratarGetVehiculos,'json');
	 //cargar combo Clientes
	 $.post('php/cargarClientes.php', null,respuestaDesplegableClientes,'json');
	 //cargar alquileres
	 $.get('php/cargarAlquileres.php',null,tratarCargarAlquileres,'json');   
   
}

function tratarCargarAlquileres(oArrayAquileres, sStatus, oXHR) {
	alquileres = oArrayAquileres;
}

function respuestaDesplegableClientes(oArrayProp, sStatus, oXHR) {
	$("#selectClienteAlquiler").empty();
	$('<option value="">-----Seleccionar-----</option>').appendTo("#selectClienteAlquiler");	
		jQuery.each(oArrayProp, function( i , elemento){
			$('<option value="' + elemento.IdCliente + '" >' +  elemento.IdCliente + ' - ' + elemento.Nombre + '</option>').appendTo("#selectClienteAlquiler");		
		});
}

function tratarGetVehiculos(oArrayVehiculos, sStatus, oXHR){
	rellenaComboVehiculos(oArrayVehiculos);	
}

function rellenaComboVehiculos(oArrayVehiculos){
    oVehiculos=oArrayVehiculos;
	$("#selectVehiculoAlquiler").empty();
		 
	$('<option value="" >Seleccione un Vehiculo</option>').appendTo("#selectVehiculoAlquiler");		
	$.each(oArrayVehiculos, function( i , elemento){
		$('<option value="' + elemento.Matricula + '" >' +  elemento.Marca+" "+ elemento.Modelo + '</option>').appendTo("#selectVehiculoAlquiler");
	});

}

function cocheAlquilado (matricula) {
	var alquilado = false;
	for (var i = 0; i < alquileres.length; i++) {		
		if(alquileres[i].Matricula == matricula){
			var aFecha = alquileres[i].FechaEntrada.split("-");
			var dFecha = new Date(aFecha[0], aFecha[1]-1, aFecha[2]);
			if(dFecha > new Date()){
				alquilado = true;
			}
		}
	}
	return alquilado;
}

function calcularPrecioTotal(matricula){

	$.ajax({ url : "php/getPrecioVehiculo.php",
					 data: "matricula="+matricula,
					 async: false, // Valor por defecto
					 dataType :'json',
					 method: "POST",
					 cache: false, // ya por defecto es false para POST
					 success: respuestaPrecio,
					 });

}

function respuestaPrecio(oArray, sStatus, oXHR) {
	//calcular diferencia de dias
	var dtFechaSal = $('#fechaSalida').datepicker('getDate');
	var dtFechaEnt = $('#fechaEntrada').datepicker('getDate');

	// Cambio de formato a milisegundos
	var iFechaSel =  dtFechaSal.getTime();
	var iFechaEnt =  dtFechaEnt.getTime();

	var diasMili = iFechaEnt - iFechaSel;

	var iFechaMin = iFechaSel + 24 * 60 * 60 * 1000;
	var diferencia = diasMili / (1000 * 3600 * 24);
	
	formAltaAlquiler.precio.value = diferencia*parseInt(oArray[0].importe);
}

function validarAlquiler() {
	var bValido = true;

	//cliente
	var cliente = formAltaAlquiler.selectClienteAlquiler.value;
	
	if (cliente == ""){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.selectClienteAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.selectClienteAlquiler.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaAlquiler.selectClienteAlquiler.classList.remove("error");
	}

	//vehiculo
	var vehiculo = formAltaAlquiler.selectVehiculoAlquiler.value;
	
	if (vehiculo == ""){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.selectVehiculoAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.selectVehiculoAlquiler.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaAlquiler.selectVehiculoAlquiler.classList.remove("error");
	}

	if (formAltaAlquiler.fechaSalida.value.length == 0) {
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.fechaSalida.focus();		
		}
		formAltaAlquiler.fechaSalida.classList.add("error");
	}else {
		//Desmarcar error
		formAltaAlquiler.fechaSalida.classList.remove("error");
	}

	if (formAltaAlquiler.fechaEntrada.value.length == 0) {
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.fechaEntrada.focus();		
		}
		formAltaAlquiler.fechaEntrada.classList.add("error");
	}else {
		//Desmarcar error
		formAltaAlquiler.fechaEntrada.classList.remove("error");
	}

	return bValido;
}