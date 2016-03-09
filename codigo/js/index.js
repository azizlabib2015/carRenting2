// Manejo al inicio
$(document).ready(function(){

	$("#menu").menu();
	$("#capaMensajes").dialog( {autoOpen:false,
		                        modal:true,
		                        width:400
		                        }
		                      );	
	
	$('#mnuAltaCliente').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#capaFrmAltaCliente').size() == 0 ){
		
			$('<div title="Alta cliente" id="capaFrmAltaCliente"></div>').appendTo('#formularios').load("html/frmCliente.html", function(){ $.getScript("js/altaCliente.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmAltaCliente').dialog("open");
		}
		
	});

	$('#mnuModificarCliente').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#capaFrmModCliente').size() == 0 ){
		
			$('<div id="capaFrmModCliente"></div>').appendTo('#formularios').load("html/frmModCliente.html", function(){ $.getScript("js/modificarCliente.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmModCliente').dialog("open");
		}
		
	});

	$('#mnuAltaAlquiler').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#capaFrmAltaAlquiler').size() == 0 ){
		
			$('<div title="Alta alquiler" id="capaFrmAltaAlquiler"></div>').appendTo('#formularios').load("html/frmAlquiler1.html", function(){ $.getScript("js/altaAlquiler.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmAltaAlquiler').dialog("open");
		}
		
	});



//------------------------------------------------------------------------------------------------------
//Aziz---->Vehiculo


	$('#mnuAltaVehiculo').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaVehiculo').size() == 0 ){
		
			$('<div title="Alta Vehiculo" id="capaFrmAltaVehiculo"></div>').appendTo('#formularios').load("html/frmVehiculo.html", function(){ $.getScript("js/altaVehiculo.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmAltaVehiculo').dialog("open");
		}
		
	});

	$('#mnuModificarVehiculo').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmModVehiculo').size() == 0 ){
		
			$('<div title="Modificar Vehiculo" id="capaFrmModVehiculo"></div>').appendTo('#formularios').load("html/frmVehiculo2.html", function(){ $.getScript("js/modVehiculo.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmModVehiculo').dialog("open");
		}
		
	});

		$('#mnuListado').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmListado').size() == 0 ){
		
			$('<div title="Listados" id="capaListados"></div>').appendTo('#formularios').load("html/frmlistado.html", function(){ $.getScript("js/listados.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaListados').dialog("open");
		}
		
	});
});