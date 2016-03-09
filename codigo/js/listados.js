$("#capaListados").dialog({
         autoOpen: true,  // Es el valor por defecto
         modal:true,
         width:300,
         MinWidth:300,
         resize:false,         
         close: function () { 
                     
                    $("#frmListado")[0].reset();
                    $("#fFiltradoV").hide();
                     
                            },
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "blind",
             duration: 1000
         },
         show: "blind",
         buttons: [{
             text: "Aceptar",
             click: listado
         }, {
             text: "Cancelar",
             click: function() {
                 $(this).dialog("close");
             }
         }]
     }); 

function listado(){
	var oListado=$("#fTipoListado input:checked").val();
	var orden=$("#fTipoOrden input:checked").val();
    var sql="";
	if (oListado=="c") {
        sql="select * from cliente where 1 ORDER BY IdCliente "+orden+"";
	} else if (oListado=="a") {
        sql="select * from alquiler where 1 ORDER BY FechaSalida "+orden+"";
	} else if (oListado=="v") {
		var oFiltroV=$("#fFiltradoV input:radio:checked").val();
		var ctipo2=frmListado.cTipo.checked;

		if (ctipo2==true) {
            var t=frmListado.sTipoV.value;
            if (oFiltroV=="todos") {
		          sql="select * from vehiculo where Tipo='"+t+"' ORDER BY Marca "+orden+"";
		        } else if (oFiltroV=="vA") {
		          sql="select v.* from vehiculo v,alquiler a where Tipo='"+t+"' and v.Matricula=a.Matricula ORDER BY Marca "+orden+"";
		        } else if (oFiltroV=="vNA") {
		          sql="select v.* from vehiculo v,alquiler a where Tipo='"+t+"' and v.Matricula!=a.Matricula ORDER BY Marca "+orden+"";
		        }
		} else{
				//si el checkbox del tipo disactivado
				if (oFiltroV=="todos") {
		          sql="select * from vehiculo where 1 ORDER BY Marca "+orden+"";
		        } else if (oFiltroV=="vA") {
		          sql="select v.* from vehiculo v,alquiler a where v.Matricula=a.Matricula ORDER BY Marca "+orden+"";
		        } else if (oFiltroV=="vNA") {
		          sql="select v.* from vehiculo v,alquiler a where v.Matricula!=a.Matricula ORDER BY Marca "+orden+"";
		        }
        };


	};
//aqui hacemos la consulta
var sParametro="datos="+sql+"";
  $.get('php/listado.php',sParametro,generarListado,'json');

}
function generarListado(oArrayListado, sEstado, oXHR){

	if (oArrayListado[0]==true) {
         $("#capaMensajes").dialog("open");
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayListado[1]);

	} else{		
		        $('#listado').remove();
                 $('#titulo').show("fold");
		        var cTabla=$('#capaTabla').append("<table  class='table table-hover' id='listado'></table>");
				var oListado=$("#fTipoListado input:checked").val();
			if (oListado=="c") {
				oCeldas="<thead><th>IdCliente</th><th>Nombre</th><th>Direccion</th><th>Telefono</th><th>Email</th></thead>";
		         oTabla = $('#listado').append(oCeldas);
		        $.each(oArrayListado, function( i , elemento){
				
					$("<tbody><tr><td>" + elemento.IdCliente + "</td><td>" + elemento.Nombre + "</td><td>" + elemento.Direccion + "</td><td>" + elemento.Telefono + "</td></td><td>" + elemento.Email + "</td></tr></tbody>").appendTo(oTabla);
				
				});
			}else if (oListado=="v") {
				oCeldas="<thead><th>Matricula</th><th>Marca</th><th>Modelo</th><th>TipoCombustible</th><th>TipoVehiculo</th><th>Seguro</th><th>Tarifa</th></thead>";
		         oTabla = $('#listado').append(oCeldas);
		        $.each(oArrayListado, function( i , elemento){
				
					$("<tbody><tr><td>" + elemento.Matricula + "</td><td>" + elemento.Marca + "</td><td>" + elemento.Modelo + "</td><td>" + elemento.TipoCombustible + "</td></td><td>" + elemento.Tipo + "</td><td>" + elemento.IdSeguro + "</td><td>" + elemento.IdTarifa + "</td></tr></tbody>").appendTo(oTabla);
				
				});
			}else if (oListado=="a") {
				oCeldas="<thead><th>IdAlquiler</th><th>IdCliente</th><th>Matricula</th><th>FechaSalida</th><th>FechaEntrada</th><th>Importe</th></thead>";
		        oTabla = $('#listado').append(oCeldas);
		        $.each(oArrayListado, function( i , elemento){
				
					$("<tbody><tr><td>" + elemento.IdAlquiler + "</td><td>" + elemento.IdCliente + "</td><td>" + elemento.Matricula + "</td><td>" + elemento.FechaSalida + "</td><td>" + elemento.FechaEntrada + "</td><td>" + elemento.Importe + "</td></tr></tbody>").appendTo(oTabla);
				
				});
			}
			};
			$("#capaListados").dialog('close');
}



$("#fTipoListado input:radio").change(function(){
   var tipoListado=$("#fTipoListado input:checked").val();

   if (tipoListado=="v") {
   	$("#fFiltradoV").show("fold");
   }else{
   	$("#fFiltradoV").hide("explode");
   }
});


$("#fFiltradoV #cTipo").change(function(){
   var ctipo=frmListado.cTipo.checked;

   if (ctipo==true) {
   	frmListado.sTipoV.disabled=false;
   }else{
   	frmListado.sTipoV.disabled=true;
   }
});