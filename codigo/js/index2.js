// Manejo al inicio
$(document).ready(function(){
	$("#tabs").tabs({
		collapsible:true, // Permite recoger la pestaña
		// active:false // Todas las pestañas recogidas
	 	active : 0, // Tercera pestaña activa
	 	heightStyle: "fill", // "auto" o "content"
		hide: { effect: "shake", duration: 500 },
		show: { effect: "fold", duration: 500 },
	});

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
			$('#capaFrmAltaCliente').dialog("open");
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
		
	
	
	
	
	/*$('#mnuAltaCliente').click(function(){
			
		// Oculto todos los formularios menos este
		$("form:not('#frmAltaCliente')").hide("normal");	
		$("#listadoUbicaciones").remove();

		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaCliente').size() == 0 ){
			$("<div>").appendTo('#formularios').load("html/frmAltaCliente.html");
		} else {
			// Lo muestro si está oculto
			$('#frmAltaCliente').show("normal");
		}
		
	});
	
	$('#mnuAltaUbicacion').click(function(){
			
		// Oculto todos los formularios menos este
		$("form:not('#frmAltaUbicacion')").hide("normal");	
		$("#listadoUbicaciones").remove();

		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaUbicacion').size() == 0 ){
			$("<div>").appendTo('#formularios').load("html/frmAltaUbicacion.html", function(){ $.getScript("js/altaUbicacion.js");});
		} else {
			// Lo muestro si está oculto
			$('#frmAltaUbicacion').show("normal");
		}
		
	});
	
	$('#mnuAltaCasa').click(function(){
			
		// Oculto todos los formularios menos este
		$("form:not('#frmAltaCasa')").hide("normal");	
		$("#listadoUbicaciones").remove();

		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaCasa').size() == 0 ){
			$("<div>").appendTo('#formularios').load("html/frmAltaCasa.html", function(){ $.getScript("js/altaCasa.js");});
		} else {
			// Lo muestro si está oculto
			$('#frmAltaCasa').show("normal");
		}
		
		
	});
	
	
	$("#mnuListadoUbicaciones").click(function(){
		$.get('php/getUbicaciones.php',null,generarListadoUbicaciones,'json');	

	});*/



/*function generarListadoUbicaciones(oArrayUbic, sEstado, oXHR){

	// Oculto todos los formularios 
	$("form").hide("normal");
	$("#listadoUbicaciones").remove();
	
	var oTabla = $('<table id="listadoUbicaciones">').css("border","black thin solid").append("<tr><td>Nombre ubicación<tr><td>");
	
	$(oArrayUbic).each(function(){		
			$("<tr><td>" + this.Nombre + "</td></tr>").appendTo(oTabla);
	});
	
	$(oTabla).appendTo("#formularios");


	


}




function altaCliente(){

	// Aqui habría que hacer la validacion del formulario
	// if (validarAltaCliente()){
	
	//Creo un objeto cliente
	var oCliente = new Cliente(frmAltaCliente.txtCodCliente.value,frmAltaCliente.txtNombreCliente.value,frmAltaCliente.txtApellidosCliente.value,frmAltaCliente.txtTelefonoCliente.value);
	
	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oCliente);
	
	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);
	
	// Script de envio
	var sURL = encodeURI("php/altaCliente.php");
	
	llamadaAjaxAltaCliente(sURL,sParametroPOST);
}
function llamadaAjaxAltaCliente(sURL,sParametroPOST){

	oAjaxAltaCliente = objetoXHR();
	
	oAjaxAltaCliente.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaCliente.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	oAjaxAltaCliente.onreadystatechange = respuestaAltaCliente;
//	oAjaxAltaCliente.addEventListener("readystatechange",respuestaAltaCliente,false);

	oAjaxAltaCliente.send(sParametroPOST);
}

function respuestaAltaCliente(){

	if(oAjaxAltaCliente.readyState == 4 && oAjaxAltaCliente.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaCliente.responseText);
		
		if (oArrayRespuesta[0] == true){
			alert("Error : " + oArrayRespuesta[1]);
		} else {
			alert("OK : " + oArrayRespuesta[1]);
		}
	}
}*/