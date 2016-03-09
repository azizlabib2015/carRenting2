$('#clientesModificar').change(cargarElementoSeleccionado);

// Creacion del dialogo	
$("#capaFrmModCliente").dialog({
	title: "Modificacion cliente",
     autoOpen: true,  // Es el valor por defecto
     modal:true,
     close: function () { 
     	$("#frmModCliente")[0].reset();
     },
     open: anteDeAbrir,
     closeOnEscape: false, // No se cierra con ESCAPE
     hide: {
     	effect: "blind",
     	duration: 1000
     },
     show: "blind",
     buttons: [{
     	text: "Aceptar",
     	click: procesoModificarCliente
     }, {
     	text: "Cancelar",
     	click: function() {
     		$(this).dialog("close");
     	}
     }]
 });


function procesoModificarCliente(){

	// Aqui habría que hacer la validacion del formulario
	if (validarModCliente()){
		
		//Creo un objeto propietario
		var oProp = new Cliente(frmModCliente.txtDNIMod.value,frmModCliente.txtNombreMod.value,frmModCliente.txtTelefonoMod.value, frmModCliente.txtEmailMod.value, frmModCliente.txtDireccionMod.value );
		
		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oProp);

		$.post('php/modificarCliente.php', sParametroPOST,respuestaModificarCliente,'json');
	}
	
}

function respuestaModificarCliente(oArrayProp, sStatus, oXHR){

	$("#capaMensajes").dialog("open");
	
	if (oArrayProp[0] == true){
		$("#capaMensajes").dialog("option","title","Error");
		$("#mensaje").text(oArrayProp[1]);
		
	} else {							
		$("#capaMensajes").dialog("option","title","OK");
		$("#mensaje").text(oArrayProp[1]);

		$("#capaFrmModCliente").dialog('close');
	}	
}

function respuestaDesplegableClientes(oArrayProp, sStatus, oXHR) {
	$("#clientesModificar").empty();
	$('<option value="">-----Seleccionar-----</option>').appendTo("#clientesModificar");
	jQuery.each(oArrayProp, function( i , elemento){
		$('<option value="' + elemento.IdCliente + '" >' +  elemento.IdCliente + ' - ' + elemento.Nombre + '</option>').appendTo("#clientesModificar");		
	});

	cargarElementoSeleccionado();
}

function cargarElementoSeleccionado() {
	$.post('php/cargarClientes.php', "id="+$('#clientesModificar').val(),respuestaClienteSelect,'json');
}

function respuestaClienteSelect(oArrayProp, sStatus, oXHR) {
	frmModCliente.txtDNIMod.value = oArrayProp[0].IdCliente;
	frmModCliente.txtNombreMod.value = oArrayProp[0].Nombre;
	frmModCliente.txtDireccionMod.value = oArrayProp[0].Direccion;
	frmModCliente.txtTelefonoMod.value = oArrayProp[0].Telefono;
	frmModCliente.txtEmailMod.value = oArrayProp[0].Email;
	
}

function anteDeAbrir() {
	frmModCliente.txtDNIMod.disabled = true;
	$.post('php/cargarClientes.php', null,respuestaDesplegableClientes,'json');
	cargarElementoSeleccionado();
}

function validarModCliente() {
	var bValido = true;
	//Nombre
	var sNombre = frmModCliente.txtNombreMod.value.trim();
	frmModCliente.txtNombreMod.value = frmModCliente.txtNombreMod.value.trim();

	var oExpReg =/^[a-zA-Z]+\s*/;
	
	if (oExpReg.test(sNombre) == false){
		
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			frmModCliente.txtNombreMod.focus();		
		}		
		
		//Marcar error
		frmModCliente.txtNombreMod.classList.add("error");
		
	}
	else {
		//Desmarcar error
		frmModCliente.txtNombreMod.classList.remove("error");
	}

	//Direccion
	var sDireccion = frmModCliente.txtDireccionMod.value.trim();
	frmModCliente.txtDireccionMod.value = frmModCliente.txtDireccionMod.value.trim();
	if (oExpReg.test(sDireccion) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			frmModCliente.txtNombreMod.focus();		
		}		
		
		//Marcar error
		frmModCliente.txtDireccionMod.classList.add("error");
		
	}
	else {
		//Desmarcar error
		frmModCliente.txtDireccionMod.classList.remove("error");
	}

	//telefono
	var sTelefono = frmModCliente.txtTelefonoMod.value.trim();
	frmModCliente.txtTelefonoMod.value = frmModCliente.txtTelefonoMod.value.trim();

	var oExpReg =/^\d{9}$/;
	
	if (oExpReg.test(sTelefono) == false){
		
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			frmModCliente.txtTelefonoMod.focus();		
		}		
		
		//Marcar error
		frmModCliente.txtTelefonoMod.classList.add("error");
		
	}
	else {
		//Desmarcar error
		frmModCliente.txtTelefonoMod.classList.remove("error");
	}

	//emails
	var sEmail = frmModCliente.txtEmailMod.value.trim();
	frmModCliente.txtEmailMod.value = frmModCliente.txtEmailMod.value.trim();

	var oExpReg =/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
	
	if (oExpReg.test(sEmail) == false){
		
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			frmModCliente.txtEmailMod.focus();		
		}		
		
		//Marcar error
		frmModCliente.txtEmailMod.classList.add("error");
		
	}
	else {
		//Desmarcar error
		frmModCliente.txtEmailMod.classList.remove("error");
	}

	return bValido;
}