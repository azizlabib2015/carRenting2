// Creacion del dialogo
	
 $("#capaFrmAltaCliente").dialog({
 	title: "Alta cliente",
     autoOpen: true,  // Es el valor por defecto
     modal:true,
     close: function () { 
     			$("#formAltaCliente")[0].reset();
     					},
     closeOnEscape: false, // No se cierra con ESCAPE
     hide: {
         effect: "blind",
         duration: 1000
     },
     show: "blind",
     buttons: [{
         text: "Aceptar",
         click: procesoAltaCliente
     }, {
         text: "Cancelar",
         click: function() {
             $(this).dialog("close");
         }
     }]
 });  


function procesoAltaCliente(){

	// Validacion del formulario
	if (validarAltaCliente()){	
		//Creo un objeto
		var oCli = new Cliente(formAltaCliente.txtDNI.value,formAltaCliente.txtNombre.value,formAltaCliente.txtTelefono.value, formAltaCliente.txtEmail.value, formAltaCliente.txtDireccion.value );
		
		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oCli);
		
		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);
		
		// Script de envio
		var sURL = encodeURI("php/altaCliente.php");
		
		llamadaAjaxAltaCliente(sURL,sParametroPOST);
	}
}

	
/* LLAMADAS AJAX */
function llamadaAjaxAltaCliente(sURL,sParametroPOST){

	oAjaxAltaCliente = objetoXHR();
	
	oAjaxAltaCliente.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaCliente.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	oAjaxAltaCliente.onreadystatechange = respuestaAltaCliente;

	oAjaxAltaCliente.send(sParametroPOST);
}

function respuestaAltaCliente(){

	if(oAjaxAltaCliente.readyState == 4 && oAjaxAltaCliente.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaCliente.responseText);

		$("#capaMensajes").dialog("open");
		
		if (oArrayRespuesta[0] == true){
			$("#capaMensajes").dialog("option","title","Error");
			$("#mensaje").text(oArrayRespuesta[1]);
			
		} else {							
			$("#capaMensajes").dialog("option","title","OK");
			$("#mensaje").text(oArrayRespuesta[1]);

			$("#capaFrmAltaCliente").dialog('close');
		}
	}
}


function validarAltaCliente() {
	var bValido = true;
	//dni
	var sDni = formAltaCliente.txtDNI.value.trim();
	formAltaCliente.txtDNI.value = formAltaCliente.txtDNI.value.trim();

	var oExpReg =/^\d{8}[a-zA-Z]{1}$/;
	var oExpReg2 = /^[a-zA-Z]{1}[0-9]{7}[0-9a-zA-Z]{1}$/;
	
	if (oExpReg.test(sDni) == false && oExpReg2.test(sDni) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtDNI.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtDNI.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaCliente.txtDNI.classList.remove("error");
	}

	//Nombre
	var sNombre = formAltaCliente.txtNombre.value.trim();
	formAltaCliente.txtNombre.value = formAltaCliente.txtNombre.value.trim();

	var oExpReg =/^[a-zA-Z]+\s*/;
	
	if (oExpReg.test(sNombre) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtNombre.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtNombre.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaCliente.txtNombre.classList.remove("error");
	}

	//Direccion
	var sDireccion = formAltaCliente.txtDireccion.value.trim();
	formAltaCliente.txtDireccion.value = formAltaCliente.txtDireccion.value.trim();
	if (oExpReg.test(sDireccion) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtNombre.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtDireccion.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaCliente.txtDireccion.classList.remove("error");
	}

	//telefono
	var sTelefono = formAltaCliente.txtTelefono.value.trim();
	formAltaCliente.txtTelefono.value = formAltaCliente.txtTelefono.value.trim();

	var oExpReg =/^\d{9}$/;
	
	if (oExpReg.test(sTelefono) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtTelefono.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtTelefono.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaCliente.txtTelefono.classList.remove("error");
	}

	//emails
	var sEmail = formAltaCliente.txtEmail.value.trim();
	formAltaCliente.txtEmail.value = formAltaCliente.txtEmail.value.trim();

	var oExpReg =/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
	
	if (oExpReg.test(sEmail) == false){
	
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtEmail.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtEmail.classList.add("error");
	
	}
	else {
		//Desmarcar error
		formAltaCliente.txtEmail.classList.remove("error");
	}

	return bValido;
}