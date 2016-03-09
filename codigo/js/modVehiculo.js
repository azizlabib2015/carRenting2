
// Creacion del dialogo
var oVehiculos=Array();
$("#capaFrmModVehiculo").dialog({
         autoOpen: true,  // Es el valor por defecto
         modal:true,
         width:300,
         MinWidth:300,
         resize:false,
         open: anteDeAbrir,         
         close: function () { 
                     
                    $("#frmModVehiculo")[0].reset();
                     
                            },
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "blind",
             duration: 1000
         },
         show: "blind",
         buttons: [{
             text: "Aceptar",
             click: modVehiculo
         }, {
             text: "Cancelar",
             click: function() {            
                 $(this).dialog("close");
             }
         }]
     }); 




function anteDeAbrir(){
	// Cargar combo ubicaciones
	cargarComboVehiculos();
	 //cargar combo Seguros     
    cargarComboSeguros();
    //cargar combo Tarifas     
    cargarComboTarifas();
}

function cargarComboVehiculos(){
    // Ahora cargo el combo de Seguros
    $.get('php/getVehiculos.php',null,tratarGetVehiculos,'json');
}

//-------------------------------------------------------------------------------------------

function cargarComboSeguros(){
    
    //combo de Seguros
    $.get('php/getSeguros.php',null,tratarGetSeguros,'xml');

}
//-------------------------------------------------------------------------------------------
function cargarComboTarifas(){
    
    var oArrayTarifas = null;

    // Existe en almacenamiento local
    if(localStorage["tarifas"] != null){
        oArrayTarifas = JSON.parse(localStorage["tarifas"]);
        //relllenamos el combo
        rellenaCombo2(oArrayTarifas);
        
        
    } else {
    // Ahora cargo el combo de propietarios
            $.get('php/getTarifas.php',null,tratarGetTarifas,'json');
    }
}
//-------------------------------------------------------------------------------------------

function tratarGetVehiculos(oArrayVehiculos, sStatus, oXHR){

		rellenaCombo3(oArrayVehiculos);
		
}
//-------------------------------------------------------------------------------------------
function tratarGetSeguros(oArraySeguros, sStatus, oXHR){

        rellenaCombo(oArraySeguros);
        
        // Guardar en localStorage
        localStorage["seguros"] = JSON.stringify(oArraySeguros);
}
//-------------------------------------------------------------------------------------------
function tratarGetTarifas(oArrayTarifas, sStatus, oXHR){

        rellenaCombo2(oArrayTarifas);
        
        // Guardar en localStorage
        localStorage["tarifas"] = JSON.stringify(oArrayTarifas);
}
//--------------------------------------------------------------------------------------------------------------------------------------------------
function rellenaCombo(oArraySeguros){

    $("#selectSeguro2").empty();
     $('<option value="">-----Seleccionar-----</option>').appendTo("#selectSeguro2");
    $(oArraySeguros).find('seguro').each(function(){

        $('<option value="' + $(this).find('idseguro').text() + '" >' +  $(this).find('descripcion').text() + '</option>').appendTo("#selectSeguro2");
    }); 
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function rellenaCombo2(oArrayTarifas){
    $("#selectTarifa2").empty();

        $('<option value="">-----Seleccionar-----</option>').appendTo("#selectTarifa2");        
        jQuery.each(oArrayTarifas, function( i , elemento){
            $('<option value="' + elemento.IdTarifa + '" >' +  elemento.Tipo + '</option>').appendTo("#selectTarifa2");        
        });
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------
function rellenaCombo3(oArrayVehiculos){
    oVehiculos=oArrayVehiculos;
		$("#selectVehiculo2").empty();
		 
$('<option value="" >Seleccione un Vehiculo</option>').appendTo("#selectVehiculo2");		
		$.each(oArrayVehiculos, function( i , elemento){
		
			$('<option value="' + elemento.Matricula + '" >' +  elemento.Marca+" "+ elemento.Modelo + '</option>').appendTo("#selectVehiculo2");
		
		});

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------

function modVehiculo(){

	var res=false;
     
	if (frmModVehiculo.selectVehiculo2.selectedIndex > 0) {
        res=validar();
	};
        if (res==true) {
	// Formateo de parametro POST
	var sParametroPOST = $('#frmModVehiculo').serialize();
	
	// Llamada POST con Jquery	
	$.post("php/modVehiculo.php",sParametroPOST,respuestaModVehiculo);
	
}	

function respuestaModVehiculo(oRespuesta,sEstado,oXHR){

	   $("#capaMensajes").dialog("open");

         if (oRespuesta[0] == false){
            $("#capaMensajes").dialog("option","title","Correcto");
            $("#mensaje").text(oRespuesta[1]);

            $("#capaFrmModVehiculo").dialog('close');
        }else{
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oRespuesta[1]);
        }
	
}

function validar()
  {
   
    var bValido = true;
    var sErrores = Array();
    //--------------------------------------------------------------------------------------------  
    // Validaciones
   //Campo matricula
    var sMatricula = frmModVehiculo.txtMatricula2.value.trim();

    var oExpReg = /[0-9]{4}[a-zA-Z]{3}/;
    
    if (oExpReg.test(sMatricula) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmModVehiculo.txtMatricula2.focus();     
        }
    
        sErrores[0]= "campo 'Matricula' es incorrecto (Ej:1234ABC )";
        
        //Marcar error
        $('#txtMatricula2').addClass("error");
    
    }
    else {
        //Desmarcar error
         $('#txtMatricula2').removeClass("error");  
    }

//--------------------------------------------------------------------------------------------  
    //Campo marca
    var sMarca = frmModVehiculo.txtMarca2.value.trim();

    var oExpReg = /[a-zA-Z\s]{3,15}/;
    
    if (oExpReg.test(sMarca) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmModVehiculo.txtMarca2.focus();     
        }
    
        sErrores[1]= " campo 'Marca' es incorrecto (se puede escribir Letras entre 3 y 15 caracteres";
        
        //Marcar error
         $('#txtMarca2').addClass("error");
    
    }
    else {
        //Desmarcar error
         $('#txtMarca2').removeClass("error");  
    }
        //--------------------------------------------------------------------------------------------  
    // Validaciones
   //Campo modelo
    var sModelo = frmModVehiculo.txtModelo2.value.trim();

    var oExpReg = /[a-zA-Z\s]{3,15}/;
    
    if (oExpReg.test(sModelo) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmModVehiculo.txtModelo2.focus();     
        }
    
        sErrores[2]= " campo 'Modelo' es incorrecto (se puede escribir Letras entre 3 y 15 caracteres";
        
        //Marcar error
        $('#txtModelo2').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#txtModelo2').removeClass("error");  
    }

 
    //--------------------------------------------------------------------------------------------  
    //Combo Combustible
    var sCombustible = frmModVehiculo.combustible2;
    
    
    if (sCombustible.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[3]= " Atencion Debe seleccionar un  Combustible";
        
        //Marcar error
        $('#selectcombustible2').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectcombustible2').removeClass("error");  
    }
    
     //--------------------------------------------------------------------------------------------  
    //Combo Tipo
    var sTipo = frmModVehiculo.tipo2;
    
    
    if (sTipo.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[4]= " Atencion Debe seleccionar un Tipo de Vehiculo";
        
        //Marcar error
        $('#selectTipo2').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectTipo2').removeClass("error");  
    }
     //--------------------------------------------------------------------------------------------  
    //Combo Seguro
    var sSeguro = frmModVehiculo.seguro2;
    
    
    if (sSeguro.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[5]= " Atencion Debe seleccionar un Seguro";
        
        //Marcar error
        $('#selectSeguro2').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectSeguro2').removeClass("error");  
    }
       //--------------------------------------------------------------------------------------------  
    //Combo Tarifa
    var sTarifa = frmModVehiculo.tarifa2;
    
    
    if (sTarifa.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[6]= " Atencion Debe seleccionar un Tarifa";
        
        //Marcar error
        $('#selectTarifa2').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectTarifa2').removeClass("error");  
    }
  



//Resultado
    if (bValido==true) {
      

    }


    if (bValido == false){
         //abrimos el dialogo de  mensajes
         $('#mensaje').remove("");
         $('#capaMensajes').append("<p id='mensaje'></p>");
         $("#capaMensajes").dialog("open");

            $("#capaMensajes").dialog("option","title","Error");
            $("#capaMensajes").dialog("option","width","700");

            

            
for (var i = 0; i < sErrores.length; i++) {
    if (sErrores[i]!=null) {
        var jqTexto = $('<span>');
    
        jqTexto.text("- "+sErrores[i]);
    
        jqTexto.appendTo("#mensaje");
        $('<br>').appendTo("#mensaje");
    }
     
};
           
    }
    
    return bValido;

}
}


$("#selectVehiculo2").change(function(){
   var cod=$('#selectVehiculo2').val();

   $.each(oVehiculos, function( i , elemento){
		
		if (elemento.Matricula==cod) {
			frmModVehiculo.txtMatricula2.value=elemento.Matricula;
			frmModVehiculo.txtMarca2.value=elemento.Marca;
			frmModVehiculo.txtModelo2.value=elemento.Modelo;
			frmModVehiculo.combustible2.value=elemento.TipoCombustible;
			frmModVehiculo.tipo2.value=elemento.Tipo;
			frmModVehiculo.seguro2.value=elemento.IdSeguro;
			frmModVehiculo.tarifa2.value=elemento.IdTarifa;

            //habilitamos los campos y combos para editar
            frmModVehiculo.txtMarca2.disabled=false;
            frmModVehiculo.txtModelo2.disabled=false;
            frmModVehiculo.combustible2.disabled=false;
            frmModVehiculo.tipo2.disabled=false;
            frmModVehiculo.seguro2.disabled=false;
            frmModVehiculo.tarifa2.disabled=false;

		};

		});
});