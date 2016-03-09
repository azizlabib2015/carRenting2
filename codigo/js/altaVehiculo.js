
// Creacion del dialogo
    
     $("#capaFrmAltaVehiculo").dialog({
         autoOpen: true,  // Es el valor por defecto
         modal:true,
         width:300,
         MinWidth:300,
         resize:false,
         open: anteDeAbrir,         
         close: function () {                     
                $("#frmAltaVehiculo")[0].reset();                     
                },
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "blind",
             duration: 1000
         },
         show: "blind",
         buttons: [{
             text: "Aceptar",
             click: altaVehiculo
         }, {
             text: "Cancelar",
             click: function() {          
                 $(this).dialog("close");
             }
         }]
     }); 


 function anteDeAbrir(){    
    //cargar combo Seguros     
    cargarComboSeguros();
    //cargar combo Tarifas     
    cargarComboTarifas();
}
function cargarComboSeguros(){
    //combo de Seguros
     $.get('php/getSeguros.php',null,tratarGetSeguros,'xml');
}
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

function tratarGetSeguros(oArraySeguros, sStatus, oXHR){        
    rellenaCombo(oArraySeguros);
    
    // Guardar en localStorage
    localStorage["seguros"] = JSON.stringify(oArraySeguros);
}
function tratarGetTarifas(oArrayTarifas, sStatus, oXHR){
    rellenaCombo2(oArrayTarifas);
    
    // Guardar en localStorage
    localStorage["tarifas"] = JSON.stringify(oArrayTarifas);
}

function rellenaCombo(oArraySeguros){
    $("#selectSeguro").empty();
    $('<option value="">-----Seleccionar-----</option>').appendTo("#selectSeguro");
    $(oArraySeguros).find('seguro').each(function(){

        $('<option value="' + $(this).find('idseguro').text() + '" >' +  $(this).find('descripcion').text() + '</option>').appendTo("#selectSeguro");
    });    
}
function rellenaCombo2(oArrayTarifas){
    $("#selectTarifa").empty();

        $('<option value="">-----Seleccionar-----</option>').appendTo("#selectTarifa");        
        jQuery.each(oArrayTarifas, function( i , elemento){
            $('<option value="' + elemento.IdTarifa + '" >' +  elemento.Tipo + '</option>').appendTo("#selectTarifa");        
        });
}

function altaVehiculo(){
    var res=validar();
    if (res==true) {
        $.ajax({ url : "php/altaVehiculo.php",
                 data: $("#frmAltaVehiculo").serialize(),
                 async: true, // Valor por defecto
                 dataType :'json',
                 method: "POST",
                 cache: false, // ya por defecto es false para POST
                 success: tratarRespuestaAltaVehiculo,
                 error :tratarErrorAltaVehiculo
                 });   
        
    }
    
}   


     function tratarRespuestaAltaVehiculo(oArrayRespuesta,sStatus,oXHR){
         //aqui tratamos la respuesta ,esto cuando esta en success

         //abrimos el dialogo de  mensajes
         $("#capaMensajes").dialog("open");

         if (oArrayRespuesta[0] == true){
            $("#capaMensajes").dialog("option","title","Correcto");
            $("#mensaje").text(oArrayRespuesta[1]);
            $("#capaFrmAltaVehiculo").dialog('close');

        }else{
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayRespuesta[1]);
        }
       

        
     }

     function tratarErrorAltaVehiculo(oXHR,sStatus,sError){
         //aqui tratamos la respuesta ,esto cuando esta en error
          //abrimos el dialogo de  mensajes
         $("#capaMensajes").dialog("open");

         
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text("sStatus : " + sStatus);
            $("#mensaje").text("sError : " + sError);
        

        
        
     }

  function validar()
  {
   
    var bValido = true;
    var sErrores = Array();
    //--------------------------------------------------------------------------------------------  
    // Validaciones
   //Campo matricula
    var sMatricula = frmAltaVehiculo.txtMatricula.value.trim();

    var oExpReg = /[0-9]{4}[a-zA-Z]{3}/;
    
    if (oExpReg.test(sMatricula) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmAltaVehiculo.txtMatricula.focus();     
        }
    
        sErrores[0]= "campo 'Matricula' es incorrecto (Ej:1234ABC )";
        
        //Marcar error
        $('#txtMatricula').addClass("error");
    
    }
    else {
        //Desmarcar error
         $('#txtMatricula').removeClass("error");  
    }

//--------------------------------------------------------------------------------------------  
    //Campo marca
    var sMarca = frmAltaVehiculo.txtMarca.value.trim();

    var oExpReg = /[a-zA-Z\s]{3,15}/;
    
    if (oExpReg.test(sMarca) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmAltaVehiculo.txtMarca.focus();     
        }
    
        sErrores[1]= " campo 'Marca' es incorrecto (se puede escribir Letras entre 3 y 15 caracteres";
        
        //Marcar error
         $('#txtMarca').addClass("error");
    
    }
    else {
        //Desmarcar error
         $('#txtMarca').removeClass("error");  
    }
        //--------------------------------------------------------------------------------------------  
    // Validaciones
   //Campo modelo
    var sModelo = frmAltaVehiculo.txtModelo.value.trim();

    var oExpReg = /[a-zA-Z\s]{3,15}/;
    
    if (oExpReg.test(sModelo) == false){
    
        if(bValido == true){
            bValido = false;        
            //Este campo obtiene el foco
            frmAltaVehiculo.txtModelo.focus();     
        }
    
        sErrores[2]= " campo 'Modelo' es incorrecto (se puede escribir Letras entre 3 y 15 caracteres";
        
        //Marcar error
        $('#txtModelo').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#txtModelo').removeClass("error");  
    }

 
    //--------------------------------------------------------------------------------------------  
    //Combo Combustible
    var sCombustible = frmAltaVehiculo.combustible;
    
    
    if (sCombustible.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[3]= " Atencion Debe seleccionar un  Combustible";
        
        //Marcar error
        $('#selectcombustible').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectcombustible').removeClass("error");  
    }
    
     //--------------------------------------------------------------------------------------------  
    //Combo Tipo
    var sTipo = frmAltaVehiculo.tipo;
    
    
    if (sTipo.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[4]= " Atencion Debe seleccionar un Tipo de Vehiculo";
        
        //Marcar error
        $('#selectTipo').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectTipo').removeClass("error");  
    }
     //--------------------------------------------------------------------------------------------  
    //Combo Seguro
    var sSeguro = frmAltaVehiculo.seguro;
    
    
    if (sSeguro.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[5]= " Atencion Debe seleccionar un Seguro";
        
        //Marcar error
        $('#selectSeguro').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectSeguro').removeClass("error");  
    }
       //--------------------------------------------------------------------------------------------  
    //Combo Tarifa
    var sTarifa = frmAltaVehiculo.tarifa;
    
    
    if (sTarifa.selectedIndex==0){
    
        if(bValido == true){
            bValido = false;        
                
        }
    
        sErrores[6]= " Atencion Debe seleccionar un Tarifa";
        
        //Marcar error
        $('#selectTarifa').addClass("error");
    
    }
    else {
        //Desmarcar error
        $('#selectTarifa').removeClass("error");  
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